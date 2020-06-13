import React from "react";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CompetitionItem from './CompetitionItem';
import { FREE_TIER_COMPETITIONS } from '../FREE_TIER';

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

	return (
    <div>
      <h1 className="display-4 my-3" style={{fontSize: '2rem', fontWeight: "800", textAlign: 'center'}}>Competitions</h1>
      {
        data.competitions
        .filter(competition => 
          Object.values(FREE_TIER_COMPETITIONS).includes(parseInt(competition.id)))
        .map( competition => 
          <CompetitionItem {...competition}  key={competition.id}/> )
      }
      <p style={{fontSize: '0.7rem', fontStyle: 'italic'}}>Logo images are sourced from Wikipedia</p>
    </div>
	);
}

export default Competition;
