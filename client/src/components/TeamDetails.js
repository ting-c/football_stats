import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import TeamMatches from './TeamMatches';
import Spinner from './Spinner';

const TEAM_QUERY = gql`
	query TeamQuery($id: Int!) {
		team(id: $id) {
      id,
      name,
			area {
				id,
				name
			}
			activeCompetitions {
				area {
					name
				},
				name
			}
      crestUrl,
      website,
      founded,
      venue
		}
	}
`;

export default function TeamDetails(props) {
	const id = parseInt(props.match.params.id);

	const { loading, error, data } = useQuery(TEAM_QUERY, {
		variables: { id: id },
	});

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		console.log(error);
		return <p>Error</p>;
	}

	const {
		name,
		area,
		activeCompetitions,
		crestUrl,
		website,
		founded,
		venue,
	} = data.team;

	return (
		<>
			<div className="container bg-light text-primary">
				<div className="row p-1 d-flex justify-content-center">
					{crestUrl ? (
						<img src={crestUrl} alt="Team Crest" style={{ height: "4rem" }} />
					) : null}
				</div>
				<div
					className="row p-1 d-flex justify-content-center"
					style={{ fontSize: "1.5rem" }}
				>
					{" "}
					{name}
				</div>
				<table className="table">
					<tbody>
						<tr>
							<td>Club Website</td>
							<td>
								<a href={website}>{website}</a>
							</td>
						</tr>
						<tr>
							<td>Country</td>
							<td>{area.name}</td>
						</tr>
						<tr>
							<td>Year Founded</td>
							<td>{founded}</td>
						</tr>
						<tr>
							<td>Stadium</td>
							<td>{venue}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<TeamMatches {...{ id, activeCompetitions }} />
		</>
	);
}
