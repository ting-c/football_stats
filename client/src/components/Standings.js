import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Table from './Table';

const STANDINGS_QUERY = gql`
	query StandingsQuery($competition_id: Int!) {
		standings(competition_id: $competition_id) {
      stage,
      type,
      group,
      table {
        position,
        team {
          id,
          name,
          crestUrl
        }
        group,
        playedGames,
        won,
        draw,
        lost,
        points,
        goalsFor,
        goalsAgainst,
        goalDifference
      }
		}
	}
`;

export default function Standings({ id }) {
	const { loading, error, data } = useQuery(STANDINGS_QUERY, {
		variables: { competition_id: id }
	});

	if (loading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		return <p>Error</p>;
  }

	return (
		<>
			<div className="display-2 mt-3 mb-2 p-2 bg-primary text-white text-center" style={{ fontSize: "2rem" }}>
				Standings
			</div>
			<div className="bg-light mb-4 p-2 shadow-sm">
        KEY
				<table className='table table-sm table-striped table-borderless table-responsive'>
          <tbody>
            <tr>
              <th>#</th>
              <td>Position</td>
            </tr>
            <tr>
              <th>P</th>
              <td>Games Played</td>
            </tr>
            <tr>
              <th>W</th>
              <td>Win</td>
            </tr>
            <tr>
              <th>D</th>
              <td>Draw</td>
            </tr>
            <tr>
              <th>L</th>
              <td>Lost</td>
            </tr>
            <tr>
              <th>Pt</th>
              <td>Points</td>
            </tr>
            <tr>
              <th>GF</th>
              <td>Goals For</td>
            </tr>
            <tr>
              <th>GA</th>
              <td>Goals Against</td>
            </tr>
            <tr>
              <th>GD</th>
              <td>Goals Difference</td>
            </tr>
          </tbody>
				</table>
			</div>
			{data.standings
				.filter((standings) => standings.type === "TOTAL")
				.map((standings, idx) => (
					<Table {...standings} key={idx} />
				))}
		</>
	);
}
