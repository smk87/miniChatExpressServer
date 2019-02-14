const express = require("express");
const router = express.Router();

//import model
const users = require("./models/users");

router.get('/', (req, res) => res.send("Hello world"));


module.exports = router;