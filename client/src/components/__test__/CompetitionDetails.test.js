import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { render, fireEvent } from "@testing-library/react";
import CompetitionDetails, { COMPETITION_QUERY } from "../CompetitionDetails";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const mocks = [
	{
		request: {
			query: COMPETITION_QUERY,
			variables: {
				id: 1,
			},
		},
		result: {
			data: {
				competition: {
					name: "Premier League",
					emblemUrl: "",
					plan: "TIER_ONE",
					currentSeason: {
						id: 1,
						startDate: new Date().toString(),
						endDate: new Date().toString(),
						currentMatchday: 1,
						winner: {
							id: 1,
							name: "N/A",
							crestUrl: "",
						},
					},
					lastUpdated: new Date()
				},
			},
		},
	},
];

const wait = async (ms = 0) => {
	await act(() => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	});
};

const match = { params: { id: 1 } };

describe("Testing loading states", () => {
	it("should render loading spinner initially", () => {
		const component = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CompetitionDetails match={match} />
			</MockedProvider>
		);

		expect(component.getByTestId("spinner")).toBeInTheDocument();
	});
});

describe("Testing final state", () => {
	it("renders withour errors", async () => {
		const component = render(
			<MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
				  <CompetitionDetails match={match} />
        </MemoryRouter>
			</MockedProvider>
		);

		await wait();

		expect(component.getByText("Premier League")).toBeInTheDocument();
  });
});