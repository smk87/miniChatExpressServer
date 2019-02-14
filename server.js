const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
let path = require('path');
let server = require('http').Server(app);
let io = require('socket.io')(server);
const passport = require("passport");

const socketEvents = require('./socket');
const axios=require('axios');

//Import api
const user = require("./api/user.js");
const chat = require("./api/chat.js");

//Body Parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


//Passport midleware
app.use(passport.initialize());

//Passport Config
require("./config/passport.js")(passport);

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
const port = process.env.PORT || 3000
//app.listen(port, () => console.log("Server Running on port 3000..."))
server.listen(port,'192.168.43.164' ,function(){
  console.log(`Express server listening on port ${port}` );
});

//Define Routes
app.use('/api/user', user)
app.use('/api/chat', chat)
//app.use(express.static(path.join(__dirname, 'public')));



//Calling all the socket events
socketEvents(io);
