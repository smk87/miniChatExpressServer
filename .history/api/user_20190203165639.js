const express = require("express");
const router = express.Router();
const validate = require("validator");
const bcrypt = require("bcryptjs");

//import model
const users = require("../models/users");

router.get("/", (req, res) => res.send("Hello world"));

//@@ Register, POST
router.post("/register", (req, res) => {
  errors = {};
  //Check existing username
  users.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "Username already in use";
      res.status(400).json(errors);
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
        res.status(400).json(errors);
      }
    }
  });
});

module.exports = router;
