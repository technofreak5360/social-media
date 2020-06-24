import React, { useState, useContext } from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/authContext';
const GET_ALL_POSTS = gql`
{
  allposts {
        id
        title
        desc
  }
}
`
const Home = () => {

    const { data, loading, error } = useQuery(GET_ALL_POSTS);

    // access context  
    const { state, dispatch } = useContext(AuthContext);

    if (loading) return <p className="p-5">Loading....</p>
    return (
        <div className="container">
            <div className="row p-5">
                {data.allposts.map(p => (
                    <div className="col-md-4" key={p.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h4>{p.title}</h4>
                                </div>
                                <p className="card-text">{p.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
