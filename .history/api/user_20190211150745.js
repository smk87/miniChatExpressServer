const express = require("express");
const router = express.Router();
const validate = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").secret;

//import model
const users = require("../models/users");

router.get("/test", (req, res) =>
  res.json({
    success: true,
    item: "test"
  })
);

//@@@ Register, POST, Public
router.post("/register", (req, res) => {
  errors = {};
  //Check existing username
  users
    .findOne({
      username: req.body.username
    })
    .then(user => {
      if (user) {
        errors.username = "Username already in use";
        return res.status(400).json(errors);
      } else {
        //   console.log(req.body);
        //Check username validation
        if (
          validate.isEmpty(req.body.username, {
            ignore_whitespace: false
          })
        ) {
          errors.username = "Username can't be empty";
        } else if (
          !validate.isLength(req.body.username, {
            min: 2,
            max: 10
          })
        ) {
          errors.username = "Username have to be within 2-10 characters";
        }

        //Check password validation
        if (
          validate.isEmpty(req.body.password, {
            ignore_whitespace: false
          })
        ) {
          errors.password = "Password can't be empty";
        } else if (
          !validate.isLength(req.body.password, {
            min: 2,
            max: 12
          })
        ) {
          errors.password = "Password have to be within 2-12 characters";
        }

        if (Object.keys(errors).length === 0) {
          const newuser = new users({
            username: req.body.username,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newuser.password, salt, (err, hash) => {
              if (err) throw err;
              newuser.password = hash;
              newuser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        } else {
          return res.status(400).json(errors);
        }
      }
    });
});

//@@@ Login, POST, Public
router.post("/login", (req, res) => {
  errors = {};
  users
    .findOne({
      username: req.body.username
    })
    .then(user => {
      if (!user) {
        errors.username = "User not found.";
        return res.status(404).json(errors);
      } else {
        //Check password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            //Generate jwt payload for matched user
            const payload = {
              username: user.username
            };
            //Sign token
            jwt.sign(
              payload,
              secret,
              {
                expiresIn: 3600
              },
              (err, token) => {
                res.json({
                  succes: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        });
      }
    });
});

module.exports = router;
