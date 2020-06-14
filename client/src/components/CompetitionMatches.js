import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import MatchItem from './MatchItem';

const COMPETITION_MATCHES_QUERY = gql`
	query CompetitionMatchesQuery($competition_id: Int!) {
		competition_matches(competition_id: $competition_id) {
      id,
      utcDate,
      status,
      matchday,
      stage,
      group,
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

export default function CompetitionMatches({ id }) {
  const [ matchDay, setMatchDay ] = useState(1);

	const { loading, error, data } = useQuery(COMPETITION_MATCHES_QUERY, {
		variables: { competition_id: id },
  });

	if (loading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		return <p>Error</p>;
  }
  
	return (
		<div>
			<div
				className="display-2 mt-2 p-2 bg-primary text-white text-center"
				style={{ fontSize: "2rem" }}
			>
				Matches
			</div>
			<div
				className="display-2 my-1 p-2 bg-secondary text-white text-center"
				style={{ fontSize: "1.2rem" }}
			>
				Match Day 
        <span className='mx-3'>
          <input 
            style={{width: '30%'}} 
            value={matchDay}
            onChange={(e) => setMatchDay(e.target.value)}
          />
        </span>
			</div>
      <MatchItem {...{data, matchDay}} />
		</div>
	);
}
