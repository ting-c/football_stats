import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import TeamItem from './TeamItem';
import Spinner from './Spinner';

const TEAMS_QUERY = gql`
	query TeamsQuery($competition_id: Int!) {
		teams(competition_id: $competition_id) {
			id,
      name,
      crestUrl,
      website,
      founded,
      venue
		}
	}
`;

export default function Teams({ id }) {
	const { loading, error, data } = useQuery(TEAMS_QUERY, {
		variables: { competition_id: id },
	});

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		console.log(error);
		return <p>Error</p>;
	}

	return (
		<div>
			<div
				className="display-2 mt-3 mb-2 p-2 bg-primary text-white text-center"
				style={{ fontSize: "2rem" }}
			>
				Teams
			</div>
			{data.teams.map((team) => (
				<TeamItem {...team} key={team.id} />
			))}
		</div>
	);
}
