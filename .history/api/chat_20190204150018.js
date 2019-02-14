const express = require("express");
const router = express.Router();
const validate = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").secret;
const passport = require("passport");

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

//@@@ Recieve texts, GET, Private
router.get(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        let temp = "";
        while (!validate.isEmpty(tem, {
                ignore_whitespace: false
            })) {
            texts.findOneAndUpdate({
                seen: false
            }, {
                $set: {
                    test: 1
                }
            }, {
                new: true
            })
        }
    }
);

module.exports = router;