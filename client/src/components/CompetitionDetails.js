import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Teams from './Teams';
import Standings from './Standings';

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

	const [display, setDisplay] = useState('standings');

  const id = parseInt(props.match.params.id);
  
  const { loading, error, data } = useQuery(COMPETITION_QUERY, { variables: { id: id } });
  if (loading) return <p>Loading...</p>;
  if (error) { 
    console.log(error);
    return <p>Error</p>;
  };
	const { name, plan, currentSeason, lastUpdated } = data.competition;
	
	const displayStandingsTeams = () => { 
		switch (display) {
			case 'standings':
				return <Standings {...{ id }} />
			case 'teams':
				return <Teams {...{ id }} />
			default:
		}
	};

  return (
		<div>
			<div className="card bg-primary text-white my-3">
				<div className="display-4 m-3" style={{ fontSize: "1.5rem" }}>
					<span className="mr-3">Competition: </span>
					{name}
				</div>
				<div className="display-4 m-3" style={{ fontSize: "1.5rem" }}>
					<span className="mr-3">Tier: </span>
					{plan}
				</div>
			</div>
			<div className="card bg-info text-white">
				<div className="display-4 my-2" style={{ fontSize: "1.5rem" }}>
					<span className="mx-3">Current Season </span>
				</div>
				<div className="display-4 my-2" style={{ fontSize: "1rem" }}>
					<span className="mx-3">Start: </span>
					{currentSeason.startDate}
				</div>
				<div className="display-4 my-2" style={{ fontSize: "1rem" }}>
					<span className="mx-3">End: </span>
					{currentSeason.endDate}
				</div>
				<div className="display-4 my-2" style={{ fontSize: "1rem" }}>
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
				</div>
				<div className="my-2">
					<span className="mx-3">Last Updated: </span>
					{lastUpdated}
				</div>
			</div>
			<div className="btn-group my-2" role="group">
				<button
					className="btn btn-success"
					onClick={() => setDisplay("standings")}
				>
					Standings
				</button>
				<button className="btn btn-success" onClick={() => setDisplay("teams")}>
					Teams
				</button>
			</div>
			{displayStandingsTeams()}
		</div>
	);
}

