const express = require("express");
const router = express.Router();
const validate = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").secret;


router.get("/", (req, res) => res.send("Hello Chat"));

//@@ Send Text, POST


module.exports=router;