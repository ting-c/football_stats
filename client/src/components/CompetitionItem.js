import React from 'react';
import { Link } from "react-router-dom";
import LOGO_URL from '../LOGO_URL';

export default function CompetitionItem({  
  id,
  name,
  area,
  plan,
  lastUpdated }) {
  return (
		<div className="card bg-light mb-3">
			<Link to={`/competition/${id}`} style={{ color: "black" }}>
				<div className="card-body d-flex flex-column align-items-center">
					<div className="row">
						{name}
          </div>
          <div className="row">
            <img
              className="m-2"
              style={{ height: "5rem"}}
              src={LOGO_URL[name]}
              alt="Logo"
            />
          </div>
					<div className="row">
						Country / Continent: {area.name}
						<span className='mx-3'>
							{area.ensignUrl ? (
								<img
									src={area.ensignUrl}
									alt="Country Flag"
									style={{ height: "1.5rem" }}
								/>
							) : null}
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

