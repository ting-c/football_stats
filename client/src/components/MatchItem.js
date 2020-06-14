import React from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';

const MatchItem = ({ data, matchDay }) => {

  console.log(data, matchDay);
  
	return data.competition_matches
		.filter((match) => match.matchday === parseInt(matchDay))
		.map((match, idx) => (
			<div key={idx} className="card bg-light m-1 shadow-sm">
				<div className="container p-2">
					<div className="text-center" style={{ fontSize: "0.8rem" }}>
						{moment.utc(match.utcDate).toString()}
					</div>
					<div className="row m-3 text-center">
						<div className="col-4">{`${match.homeTeam.name}`}</div>
						<div className="col-4" style={{ fontSize: "1.1rem" }}>
							{`${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`}
						</div>
						<div className="col-4">{`${match.awayTeam.name}`}</div>
					</div>
          <div className='text-center'>
            <Link to={`/match/${match.id}`}>
              <button className='btn btn-primary text-center' style={{fontSize: '0.8rem'}}>
                Match Details
              </button>
            </Link>
          </div>
				</div>
			</div>
		));
};

export default MatchItem;
