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


input PostInput {
    title: String!
    desc: String!
}

type Mutation {
    newPost(input: PostInput!): post!
}

`;