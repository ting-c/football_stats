import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const TEAM_QUERY = gql`
	query TeamQuery($id: Int!) {
		team(id: $id) {
      id,
      name,
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
	if (loading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		return <p>Error</p>;
  }
	const { name, crestUrl, website, founded, venue } = data.team;

	return (
		<div className="card bg-light text-primary card-body">
			<div className="row">
				<div className="col-md-9">
					{crestUrl ? (
						<img src={crestUrl} alt="Team Crest" style={{ height: "4rem" }} />
					) : null}
					<ul className="list-group" style={{ listStyleType: "none" }}>
						<li className="my-1" style={{ fontSize: "2rem" }}>
							{name}
						</li>
						<li className="my-1">
							<span className="mr-3">Club Website: </span>
							<a href={website}>{website}</a>
						</li>
						<li className="my-1">
							<span className="mr-3">Founded Year: </span>
							{founded}
						</li>
						<li className="my-1">
							<span className="mr-3">Stadium: </span>
							{venue}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
