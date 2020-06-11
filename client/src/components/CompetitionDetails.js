import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const COMPETITION_QUERY = gql`
	query CompetitionQuery($id: Int!) {
		competition(id: $id) {
			name
			emblemUrl
			plan
			currentSeason {
				id
				startDate
				endDate
				currentMatchday
				winner {
					id
					name
					shortName
					tla
					crestUrl
				}
			}
		}
	}
`;

export default function CompetitionDetails(props) {
  const id = parseInt(props.match.params.id);
  
  const { loading, error, data } = useQuery(COMPETITION_QUERY, { variables: { id: id } });
  if (loading) return <p>Loading...</p>;
  if (error) { 
    console.log(error);
    return <p>Error</p>;
  };
  const { name, plan, currentSeason } = data.competition;

  return (
		<div>
			<h3 className="display-4 my-3" style={{ fontSize: "1.5rem" }}>
				<span className="text-info">Competition: </span>
				{name}
			</h3>
			<h3 className="display-4 my-3" style={{ fontSize: "1.5rem" }}>
				<span className="text-info">Tier: </span>
				{plan}
			</h3>
			<h3 className="display-4 my-3" style={{ fontSize: "1.5rem" }}>
				<span className="text-success">Current Season </span>
			</h3>
			<h3 className="display-4 my-3" style={{ fontSize: "1rem" }}>
				<span className="text-success">Start date: </span>
				{currentSeason.startDate}
			</h3>
			<h3 className="display-4 my-3" style={{ fontSize: "1rem" }}>
				<span className="text-success">End Date: </span>
				{currentSeason.endDate}
			</h3>
			<h3 className="display-4 my-3" style={{ fontSize: "1rem" }}>
				<span className="text-success">Winner: </span>
				{currentSeason.winner || 'N/A' }
			</h3>
		</div>
	);
}

