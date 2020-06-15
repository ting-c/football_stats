import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import moment from 'moment';
import Spinner from "./Spinner";

export const PLAYER_QUERY = gql`
	query PlayerQuery($player_id: Int!) {
		player(player_id: $player_id) {
      id,
      name,
      dateOfBirth,
      countryOfBirth,
      nationality,
      position,
      shirtNumber,
      lastUpdated
		}
	}
`;

export const PlayerDetails = (props) => {
	const id = parseInt(props.match.params.id);

	const { loading, error, data } = useQuery(PLAYER_QUERY, {
		variables: { player_id: id },
	});

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		console.log(error);
		return <p>Error</p>;
  }
  
  const { player } = data;

	return (
		<div className="container bg-light">
			<div
				className="row bg-primary text-white justify-content-center"
				style={{ fontSize: "1.5rem" }}
			>
				<div>Player Details</div>
			</div>

			<table
				className="table table-light table-responsive-sm text-center"
				style={{ fontSize: "1rem" }}
			>
				<tbody>
					<tr>
            <td>Name</td>
						<td>{player.name}</td>
					</tr>
					<tr>
            <td>Position</td>
						<td>{player.position}</td>
					</tr>
					<tr>
            <td>Shirt Number</td>
						<td>{player.shirtNumber}</td>
					</tr>
					<tr>
            <td>Nationality</td>
						<td>{player.nationality}</td>
					</tr>
          <tr>
            <td>Date of Birth</td>
						<td>{player.dateOfBirth}</td>
					</tr>
					<tr>
            <td>Country of Birth</td>
						<td>{player.countryOfBirth}</td>
					</tr>
					<tr style={{fontStyle: 'italic', fontSize: '0.7rem'}}>
            <td>Last Updated</td>
						<td>{moment.utc(player.lastUpdated).toString()}</td>
					</tr>
				</tbody>
			</table>

		</div>
	);
};

export default PlayerDetails;
