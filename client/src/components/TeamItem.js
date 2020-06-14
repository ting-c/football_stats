import React from "react";
import { Link } from "react-router-dom";

export default function TeamItem({ id, name, crestUrl}) {
  return (
		<div className="card container bg-light text-primary mb-3 p-2">
			<div className="row d-flex justify-content-center">
				{ crestUrl ? (
					<img src={crestUrl} alt="Team Crest" style={{ height: "4rem" }} />
					) : null}
			</div>
			<div className="row d-flex justify-content-center" style={{ fontSize: "1.3rem" }}>
				{name}
			</div>
			
			<div className="row d-flex justify-content-center">
				<Link to={`/teams/${id}`} className="btn btn-primary">
					Details
				</Link>
			</div>
		</div>
	);
}
