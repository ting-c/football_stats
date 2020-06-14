import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import Teams from './Teams';
import Standings from './Standings';
import CompetitionMatches from './CompetitionMatches';
import Scorers from './Scorers';
import LOGO_URL from '../LOGO_URL';
import Spinner from './Spinner';

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
			lastUpdated
		}
	}
`;

export default function CompetitionDetails(props) {
	const [display, setDisplay] = useState("standings");

	const id = parseInt(props.match.params.id);

	const { loading, error, data } = useQuery(COMPETITION_QUERY, {
		variables: { id: id },
	});

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		console.log(error);
		return <p>Error</p>;
	}

	const { name, plan, currentSeason, lastUpdated } = data.competition;

	const displayStandingsTeams = () => {
		switch (display) {
			case "standings":
				return <Standings {...{ id }} />;
			case "teams":
				return <Teams {...{ id }} />;
			case "matches":
				return <CompetitionMatches {...{ id }} />;
			case "scorers":
				return <Scorers {...{ id }} />;
			default:
				return
		}
	};

	return (
		<div>
			<div className="card bg-light text-primary my-2">
				<div className="m-1 text-center" style={{ fontSize: "1.7rem" }}>
					{name}
				</div>
				<div className="m-1 text-center">
					<img
						src={LOGO_URL[name]}
						style={{ height: "5rem", maxWidth: "80%" }}
						alt="Logo"
					/>
				</div>
				<div
					className="mt-3 mb-2 text-center"
					style={{ fontSize: "1rem", textTransform: "capitalize" }}
				>
					{plan.replace("_", " ")}
				</div>
			</div>
			<div className="card bg-light my-2">
				<div className="display-4 my-2" style={{ fontSize: "1.3rem" }}>
					<span className="mx-3">Current Season </span>
				</div>
				<table className="table">
					<tbody>
						<tr>
							<td>Start</td>
							<td>{currentSeason.startDate}</td>
						</tr>
						<tr>
							<td>End</td>
							<td>{currentSeason.endDate}</td>
						</tr>
						<tr>
							<td>Winner</td>
							<td>
								{currentSeason.winner ? (
									<>
										<span className="mr-2">{currentSeason.winner.name}</span>
										<img
											src={currentSeason.winner.crestUrl}
											alt="Winner Crest"
											style={{ height: "1.5rem" }}
										/>
									</>
								) : (
									<span>N/A</span>
								)}
							</td>
						</tr>
						<tr>
							<td>Last Updated</td>
							<td>{moment.utc(lastUpdated).toString()}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="btn-group my-2 d-flex justify-content-between" role="group">
				<button
					className="btn btn-success"
					onClick={() => setDisplay("standings")}
				>
					Standings
				</button>
				<button className="btn btn-success" onClick={() => setDisplay("teams")}>
					Teams
				</button>
				<button
					className="btn btn-success"
					onClick={() => setDisplay("matches")}
				>
					Matches
				</button>
				<button
					className="btn btn-success"
					onClick={() => setDisplay("scorers")}
				>
					Scorers
				</button>
			</div>
			{displayStandingsTeams()}
		</div>
	);
}

