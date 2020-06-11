import React from 'react'

export default function CompetitionItem({  
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
          <p>Country : {area.name}</p>
          <p>Tier: {plan}</p>
          <p>Last Updated: {lastUpdated.substr(0,10)}</p>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  )
}

