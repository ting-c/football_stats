import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import MatchItem from "./MatchItem";
import Spinner from './Spinner';
import LOGO_URL from '../LOGO_URL';

const TEAM_MATCHES_QUERY = gql`
	query TeamMatchesQuery($team_id: Int!) {
		team_matches(team_id: $team_id) {
			id,
      competition {
        id
        name
      }
      utcDate,
      status,
      matchday,
      stage,
      group,
      lastUpdated,
      score { 
        winner,
        duration,
        fullTime {
          homeTeam,
          awayTeam
        }
      }
      homeTeam { 
        id,
        name
       },
      awayTeam { 
        id,
        name
       }
	  } 
  }
`;

export default function TeamMatches({ id, activeCompetitions }) {
	const [matchCompetition, setMatchCompetition] = useState(null);

	const { loading, error, data } = useQuery(TEAM_MATCHES_QUERY, {
		variables: { team_id: id },
	});

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		console.log(error);
		return <p>Error</p>;
	}

	return (
		<div className='container'>
			<div
				className="row d-flex justify-content-center bg-primary text-white text-center"
				style={{ fontSize: "1.8rem" }}
			>
				Matches
			</div>
			<div className="row btn-group d-flex justify-content-between">
				{activeCompetitions.filter(competition => Object.keys(LOGO_URL).includes(competition.name)).map((competition, idx) => (
					<button
						className="btn btn-light mb-2"
						onClick={() => setMatchCompetition(competition.name)}
						key={idx}
					>
						{competition.name}
					</button>
				))}
			</div>
			{data.team_matches
				.filter((match) => match.competition.name === matchCompetition)
				.map((match, idx) => (
					<MatchItem {...{ match }} key={idx} />
				))}
		</div>
	);
}
