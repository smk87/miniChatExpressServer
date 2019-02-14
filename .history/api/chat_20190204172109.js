const express = require("express");
const router = express.Router();
const validate = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").secret;
const passport = require("passport");
const socket = require('../socket');

//import model
const texts = require("../models/texts");

//@@@ Send Text, POST, Private
router.post(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        // res.json({succes:req.user})

        const newText = new texts({
            author: req.user._id,
            body: req.body.body
        });

        newText
            .save()
            .then(text => res.json(text))
            .catch(err => console.log(err));
    }
);

//@@@ Recieve new texts, GET, Private
router.get(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        texts.updateMany({
            seen: false
        }, {
            $set: {
                seen: true
            }
        }, (err, raw) => res.status(200));

        texts.find()
            .then(text => res.json(text))
            .catch(err => console.log(err))

    }
);

module.exports = router;