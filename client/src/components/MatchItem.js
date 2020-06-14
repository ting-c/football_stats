import React from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';
import LOGO_URL from '../LOGO_URL';

const MatchItem = ({ match }) => {
  
	return (
		<div className="card bg-light m-1 shadow-sm">
			<div className="container p-2">
				<div className="text-center" style={{ fontSize: "0.8rem" }}>
					{moment.utc(match.utcDate).toString()}
				</div>
				<div className="row my-3 text-center">
					<div className="col-4" style={{ fontSize: "0.9rem" }}>
						{`${match.homeTeam.name}`}
					</div>
					<div className="col-4" style={{ fontSize: "1rem" }}>
						{`${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`}
					</div>
					<div className="col-4" style={{ fontSize: "0.9rem" }}>
						{`${match.awayTeam.name}`}
					</div>
				</div>
				{	match.competition ? (
					<div className="row my-1 d-flex justify-content-center text-center">
						<Link to={`/competition/${match.competition.id}`}>
							<img src={LOGO_URL[match.competition.name]} style={{height: '3rem'}} alt='Competition Logo' />
						</Link>
					</div>		
					)	: null
				}
				<div className="row d-flex justify-content-center text-center">
					<Link to={`/match/${match.id}`}>
						<button
							className="btn btn-primary text-center"
							style={{ fontSize: "0.8rem" }}
						>
							Match Details
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
};

export default MatchItem;
