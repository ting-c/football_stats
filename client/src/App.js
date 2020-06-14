import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Competitions from './components/Competitions';
import CompetitionDetails from './components/CompetitionDetails';
import TeamDetails from './components/TeamDetails';
import MatchDetails from './components/MatchDetails';
import PlayerDetails from './components/PlayerDetails';
import logo from './logo.png';

const client = new ApolloClient({
  uri: '/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <div className="container">
        <Link to='/'>
          <img src={logo} alt="Football Stats" className='logo' style={{width: '8rem'}}/>
        </Link>
        <Route exact path='/' component={Competitions} />
        <Route exact path='/competition/:id' component={CompetitionDetails} />
        <Route exact path='/teams/:id' component={TeamDetails} />
        <Route exact path='/match/:id' component={MatchDetails} />
        <Route exact path='/player/:id' component={PlayerDetails} />
      </div>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
