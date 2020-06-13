import React from 'react';
import { Link } from "react-router-dom";
import LOGO_URL from '../LOGO_URL';

export default function CompetitionItem({  
  id,
  name,
  area
}) {
  return (
		<div className="card bg-light mb-3">
			<Link
				to={`/competition/${id}`}
				style={{ color: "black", textDecoration: "none" }}
			>
				<div className="card-body d-flex flex-column align-items-center">
					<div className="row" style={{ fontSize: "1.8rem" }}>
						{name}
					</div>
					<div className="row">
						<img
							className="m-2 align-items-center"
							style={{ height: "5rem", maxWidth: "100%" }}
							src={LOGO_URL[name]}
							alt="Logo"
						/>
					</div>
					<div className="row text-center mt-2" style={{ fontWeight: "900" }}>
						{area.name}
						{area.ensignUrl ? (
							<img
								className="ml-3"
								src={area.ensignUrl}
								alt="Country Flag"
								style={{ height: "1.5rem" }}
							/>
						) : null}
					</div>
				</div>
			</Link>
		</div>
	);
}

