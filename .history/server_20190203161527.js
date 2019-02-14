const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


//Import api
const user = require("./api/user.js");

//Body Parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

// app.use(bodyParser.json());
//DB Config
const db = require("./config/key").mongoURI;
//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

//Server
app.listen(3000, () => console.log("Server Running on port 3000..."))

//Define Routes
app.use('/api/user', user)