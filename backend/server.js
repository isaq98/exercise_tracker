const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//Configuring so we can have environment variables in the .env file
require('dotenv').config();

//Creating express server and estabishing the port it will be served on
const app = express();
const port = process.env.PORT || 5000;

//Establishing middleware for CORS requests and parsing JSON
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
})

/*
 Now whenever someone heads to our route URL with the either of the extensions 
 included at the end of the URL, it will load everything in each of the routers
*/
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});