import React from "react";
import { Link } from "react-router-dom";

export default function TeamItem({ name, crestUrl, website, founded, venue }) {
  return (
		<div className="card bg-secondary text-white card-body mb-3">
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
							<a href={website} className="text-white">
								{website}
							</a>
						</li>
						<li className="my-1">
							<span className="mr-3">Founded Year: </span>
							{founded}
						</li>
						<li className="my-1">
              <span className='mr-3'>Stadium: </span>
              {venue}
            </li>
					</ul>
				</div>
				<div className="col-md-3">
					<Link className="btn btn-primary">Details</Link>
				</div>
			</div>
		</div>
	);
}
