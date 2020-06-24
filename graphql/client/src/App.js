import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Home from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Nav from './components/Nav';
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

const App = () => {

  return (
    <ApolloProvider client={client}>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/Login" component={Login}></Route>
      </Switch>
    </ApolloProvider>
  );
};

export default App;
