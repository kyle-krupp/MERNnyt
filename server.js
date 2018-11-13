const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Require all models
const db = require('./models');

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);    

// Define API routes and send requests to the react app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Connect to the Mongo DB
var MONGODB_URI = 'mongodb://nytreact:nytreact1@ds161183.mlab.com:61183/nytreact'
mongoose.connect('mongodb://nytreact:nytreact1@ds161183.mlab.com:61183/nytreact');

// Connect to the Mongo DB
mongoose.Promise = Promise;

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});