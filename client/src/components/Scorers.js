import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';
import Spinner from "./Spinner";

export const SCORERS_QUERY = gql`
	query ScorersQuery($competition_id: Int!) {
		scorers(competition_id: $competition_id) {
			player {
        id,
        name
      },
      team {
        id,
        name
      },
      numberOfGoals
		}
	}
`;

export default function Scorers({ id }) {
	const { loading, error, data } = useQuery(SCORERS_QUERY, {
		variables: { competition_id: id },
	});

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		console.log(error);
		return <p>Error</p>;
  }
  console.log(data);
  const { scorers } = data;

	return (
		<>
			<div
				className="display-2 mt-3 mb-2 p-2 bg-primary text-white text-center"
				style={{ fontSize: "1.7rem" }}
			>
				Top Scorers
			</div>
      <table className='table table-light text-center'>
        <thead>
          <tr>
            <th>Player</th>
            <th>Team</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          { scorers.map((scorer, idx) => (
              <tr key={idx}>
                <td><Link to={`/player/${scorer.player.id}`}>{scorer.player.name}</Link></td>
                <td><Link to={`/teams/${scorer.team.id}`}>{scorer.team.name}</Link></td>
                <td>{scorer.numberOfGoals}</td>
              </tr>
            )) }
        </tbody>
      </table>
		</>
	);
}
