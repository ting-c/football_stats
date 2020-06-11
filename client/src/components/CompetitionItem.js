import React from 'react';
import { Link } from "react-router-dom";

export default function CompetitionItem({  
  id,
  name,
  area,
  plan,
  currentSeason,
  lastUpdated }) {
  return (
    <div className='card card-body mb-3'>
      <div className="row">
        <div className="col-md-9">
          <p>Name: {name}</p>
          <p>Country / Continent: {area.name}
            <span>
              { area.ensignUrl ? 
                <img src={area.ensignUrl} alt="Country Flag" style={{ height: '1.5rem'}} /> : null }
            </span>
          </p>
          <p>Tier: {plan}</p>
         
          <p>Last Updated: {lastUpdated.substr(0,10)}</p>
        </div>
        <div className="col-md-3">
          <Link to={`/competition/${id}`}className="btn btn-primary">Details</Link>
        </div>
      </div>
    </div>
  )
}

