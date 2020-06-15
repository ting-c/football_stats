import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { render, getByTestId } from "@testing-library/react";
import { PlayerDetails, PLAYER_QUERY } from '../PlayerDetails';
import wait from 'waait';
import { act } from 'react-dom/test-utils';

const mocks = [
	{
		request: {
			query: PLAYER_QUERY,
			variables: {
				player_id: 1,
			},
		},
		result: {
			data: {
				player: {
					id: 1,
					name: 'Player Name',
					dateOfBirth: '01/01/2000',
					countryOfBirth: 'Brazil',
					nationality: 'Brazil',
					position: 'Attacker',
					shirtNumber: 9,
					lastUpdated: new Date(),
				},
			},
		},
	},
];

const match = { params : { id : 1 } };

describe('Testing loading states', () => {
  it('should render loading spinner initially', () => {
    const component = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<PlayerDetails match={match} />
			</MockedProvider>
    );
    
    expect(component.getByTestId('spinner')).toBeInTheDocument();
  });
})

describe('Testing final state', () => {

  const wait = async (ms = 0) => {
    await act(() => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    });
  }

  it('renders withour errors', async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PlayerDetails match={match} />
      </MockedProvider>
    );

    await wait();

    expect(component.getByText('Player Name')).toBeInTheDocument();
  });
})

