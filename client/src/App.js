import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route } from 'react-router-dom';
import Competitions from './components/Competitions';
import CompetitionDetails from './components/CompetitionDetails';
import logo from './logo.png';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <div className="container">
        <img src={logo} alt="Football Stats" className='logo'/>
        <Route exact path='/' component={Competitions} />
        <Route exact path='/competition/:id' component={CompetitionDetails} />
      </div>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
