import React from "react";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CompetitionItem from './CompetitionItem';

const COMPETITIONS_QUERY = gql`
  query CompetitionsQuery {
    competitions {
      id
      name
      area {
        id
        name
        countryCode
        ensignUrl
      }
      plan
      currentSeason {
        id
        startDate
        endDate
        currentMatchday
        winner {
          id
		      name
		      shortName
		      tla
		      crestUrl
        }
      }
      lastUpdated
    }
  }
`;

function Competition() {
  const { loading, error, data } = useQuery(COMPETITIONS_QUERY);
  
  if (loading) return <p>Loading...</p>;
  if (error) { 
    console.log('Err', error);
    return <p>Error</p>;
  }
  if (data) console.log(data);

	return (
    <div>
      <h1 className="display-4 my-3">Competitions</h1>
      {
        data.competitions.map( competition => 
          <CompetitionItem {...competition}  key={competition.id}/> )
      }
    </div>
	);
}

export default Competition;
