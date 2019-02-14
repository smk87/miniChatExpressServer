const express = require("express");
const router = express.Router();
const validate = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").secret;
const passport = require("passport");
router.get("/", (req, res) => res.send("Hello Chat"));

//@@@ Send Text, POST, Private
router.post("/", passport.authenticate('jwt', {
    session: false
})(req, res) => {

});

module.exports = router;