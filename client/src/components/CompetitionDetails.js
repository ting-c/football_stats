import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Teams from './Teams';

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
      <div className="card bg-primary text-white my-3">
        <h3 className="display-4 m-3" style={{ fontSize: "1.5rem" }}>
          <span className="mr-3">Competition: </span>
          {name}
        </h3>
        <h3 className="display-4 m-3" style={{ fontSize: "1.5rem" }}>
          <span className="mr-3">Tier: </span>
          {plan}
        </h3>
      </div>
			<div className="card bg-info text-white">
				<h3 className="display-4 my-2" style={{ fontSize: "1.5rem" }}>
					<span className="mx-3">Current Season </span>
				</h3>
				<h3 className="display-4 my-2" style={{ fontSize: "1rem" }}>
					<span className="mx-3">Start date: </span>
					{currentSeason.startDate}
				</h3>
				<h3 className="display-4 my-2" style={{ fontSize: "1rem" }}>
					<span className="mx-3">End Date: </span>
					{currentSeason.endDate}
				</h3>
				<h3 className="display-4 my-2" style={{ fontSize: "1rem" }}>
					<span className="mx-3">Winner: </span>
					{currentSeason.winner ? (
						<>
							<span>{currentSeason.winner.name}</span>
							<img
								src={currentSeason.winner.crestUrl}
								alt="Winner Crest"
								style={{ height: "1.5rem" }}
							/>
						</>
					) : (
						<span>N/A</span>
					)}
				</h3>
			</div>
			<Teams {...{ id }} />
		</div>
	);
}

