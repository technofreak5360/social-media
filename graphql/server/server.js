const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();


const port = process.env.PORT || 5000;


app.use(express.json());

// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));
// resolvers
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});


apolloServer.applyMiddleware({ app });


// db
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE_CLOUD, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected');
    } catch (error) {
        console.log('DB Connection Error', error);
    }
};
// execute database connection
db();



app.get('/rest', (req, res) => {

    res.json({
        data: 'you hit'
    });
});

app.listen(port, () => {

    console.log(`server is running on port ${port}`);
    console.log(`graphqlserver is running on port ${port}`);
});