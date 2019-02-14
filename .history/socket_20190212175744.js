// Chatroom
const axios = require("axios");
//import model
const texts = require("./models/texts");

const socketEvents = io => {
  let numUsers = 0;

  io.on("connection", socket => {
    console.log("A user connected.");

    let addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on("new message", data => {
      // we tell the client to execute 'new message'

      newText = {
        body: data
      };
      axios
        .post("http://192.168.0.105:3000/api/chat", newText)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));

      socket.broadcast.emit("new message", {
        username: socket.username,
        message: data
      });
    });

    // when the client emits 'add user', this listens and executes
    socket.on("add user", username => {
      if (addedUser) return;

      // we store the username in the socket session for this client
      socket.username = username;
      ++numUsers;
      addedUser = true;
      socket.emit("login", {
        numUsers: numUsers
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit("user joined", {
        username: socket.username,
        numUsers: numUsers
      });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on("typing", () => {
      socket.broadcast.emit("typing", {
        username: socket.username
      });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on("stop typing", () => {
      socket.broadcast.emit("stop typing", {
        username: socket.username
      });
    });

    // when the user disconnects.. perform this
    socket.on("disconnect", () => {
      if (addedUser) {
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.emit("user left", {
          username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });
};

module.exports = socketEvents;