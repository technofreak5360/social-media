const express = require('express');
// const cors = require('cors');

// const mongoose = require('mongoose');


const app = express();


const port = process.env.PORT || 5000;

// app.use(cors());
app.use(express.json());


// const URI = process.env.ATLAS_URI;

// mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("connected to database");
// })

// const exercisesRoute = require('./routes/exercises');
// const usersRoute = require('./routes/users');

// app.use('/exercises', exercisesRoute);
// app.use('/users', usersRoute);

app.listen(port, () => {

    console.log(`server is running on port ${port}`);
});