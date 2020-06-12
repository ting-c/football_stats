import React from "react";
import { Link } from "react-router-dom";

export default function TeamItem({ id, name, crestUrl}) {
  return (
		<div className="card bg-light text-primary card-body mb-3">
			<div className="row">
				<div className="col-sm-10">
					{crestUrl ? (
						<img src={crestUrl} alt="Team Crest" style={{ height: "4rem" }} />
					) : null}
						<div className="my-1" style={{ fontSize: "1.6rem" }}>
							{name}
						</div>
				</div>
				<div className="col-sm-2">
					<Link to={`/teams/${id}`} className="btn btn-primary">Details</Link>
				</div>
			</div>
		</div>
	);
}
