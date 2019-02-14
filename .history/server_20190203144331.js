const express = require("express");
const app = express();
const mongoose = require("mongoose");

//DB Config
const db = require("./config/key").mongoURI;
//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));
