import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";
import Scorers, { SCORERS_QUERY } from "../Scorers";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

const mocks = [
	{
		request: {
			query: SCORERS_QUERY,
			variables: {
				competition_id: 1,
			},
		},
		result: {
      data:{
				scorers: [
          {
            player: {
              id: 1,
              name: 'Player 1'
            },
            team: {
              id: 1,
              name: 'Team 1'
            },
            numberOfGoals: 1
          },
          {
            player: {
              id: 2,
              name: 'Player 2'
            },
            team: {
              id: 2,
              name: 'Team 2'
            },
            numberOfGoals: 2
          },
      ]
      }
		}
	}
];

const wait = async (ms = 0) => {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
};

const id = 1;

describe("Testing loading states", () => {
	it("should render loading spinner initially", () => {
		const component = render(
			<MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
				  <Scorers id={id} />
        </MemoryRouter>
			</MockedProvider>
		);

		expect(component.getByTestId("spinner")).toBeInTheDocument();
	});
});

describe("Testing final state", () => {
  
	it("renders the scorers player name", async () => {
		const component = render(
			<MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
				  <Scorers id={id} />
        </MemoryRouter>
			</MockedProvider>
		);

		await wait();

		expect(component.getByText("Player 1")).toBeInTheDocument();
  });

	it('renders the scorers player goals number', async () => {
		const component = render(
			<MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
				  <Scorers id={id} />
        </MemoryRouter>
			</MockedProvider>
		);

		await wait();

		expect(component.getByText("1")).toBeInTheDocument();
  });

	it('renders the scorers team name', async () => {
		const component = render(
			<MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
				  <Scorers id={id} />
        </MemoryRouter>
			</MockedProvider>
		);

		await wait();

		expect(component.getByText("Player 1")).toBeInTheDocument();
  });

});

describe('Testing links to PlayerDetails component', () => {
  it("redirects to correct PlayerDetails component", async () => {
    const history = createMemoryHistory();
    history.push("/player/2");
		const component = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Router history={history}>
					<Scorers id={id} />
				</Router>
			</MockedProvider>
		);

		await wait();

		expect(component.getByText("Player 2")).toBeInTheDocument();
  });
})
