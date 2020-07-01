import React, { useState, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Nav from './components/Nav';
import CompleteRegistration from './pages/Auth/CompleteRegistration';
import PasswordUpdate from './pages/Auth/PasswordUpdate';
import PasswordForgot from './pages/Auth/PasswordForgot';
import Profile from './pages/Auth/Profile';
import { AuthContext } from './context/authContext';
import { request } from 'http';
import PrivateRoute from './components/PrivateRoute';
import Post from './pages/post/Post';
const App = () => {

  const { state } = useContext(AuthContext);
  const { user } = state;
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,

    request: operation => {

      operation.setContext({
        headers: {
          authtoken: user ? user.token : ''
        }
      });
    }

  });
  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/Login" component={Login}></Route>
        <Route exact path="/complete-registeration" component={CompleteRegistration} />
        <Route exact path="/password/forgot" component={PasswordForgot}></Route>
        <PrivateRoute exact path="/password/update" component={PasswordUpdate}></PrivateRoute>
        <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
        <PrivateRoute exact path="/post/create" component={Post}></PrivateRoute>
      </Switch>
    </ApolloProvider>
  );
};

export default App;
