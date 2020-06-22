const { gql } = require('apollo-server-express');

module.exports = gql`
type post
{
    id:ID!
    title:String!
    desc:String!
}
type Query {
    totalPosts: Int!
    allposts: [post]!
}
type Mutation {
    newPost(title: String!, desc: String!): post!
}

`;