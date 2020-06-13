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
  console.log(id);
	const { loading, error, data } = useQuery(STANDINGS_QUERY, {
		variables: { competition_id: id }
	});

	if (loading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		return <p>Error</p>;
  }
  console.log(data.standings);

  

	return (
		<>
			<h1 className="display-2 mt-3 mb-2" style={{ fontSize: "2rem" }}>
				Standings
			</h1>
			<ul>
				KEY:
				<li># = Position</li>
				<li>P = Games Played</li>
				<li>W = Win</li>
				<li>D = Draw</li>
				<li>L = Lost</li>
				<li>GF = Goals For</li>
				<li>GA = Goals Against</li>
				<li>GD = Goals Difference</li>
				<li>Pt = Points</li>
			</ul>
			{data.standings
				.filter((standings) => standings.type === "TOTAL")
				.map((standings, idx) => (
					<Table {...standings} key={idx} />
				))}
		</>
	);
}
