import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import TeamItem from './TeamItem';

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
  const { loading, error, data } = useQuery(TEAMS_QUERY, { variables: { competition_id: id }});

	if (loading) return <p>Loading...</p>;
	if (error) {
		console.log("Err", error);
		return <p>Error</p>;
	}

  return (
		<div>
			<h1 className="display-2 mt-3 mb-2" style={{fontSize: '2rem'}}>Teams</h1>
			{data.teams.map((team) => (
					<TeamItem {...team} key={team.id} />
				))}
		</div>
	);
}
