const express = require("express");
const router = express.Router();
const validate = require("validator");


//import model
const users = require("./models/users");

router.get('/', (req, res) => res.send("Hello world"));

//@Register, POST
errors = {};
router.post('/register', (req, res) => {
    //Check username
    if (validate.isEmpty(req.body.username, {
            ignore_whitespace: false
        })) {
        errors.username = "Username can't be empty"
    } else if (!validate.isLength(req.body.username, {
            min: 2,
            max: 10
        })) {
        errors.username = "Username have to be within 2-10 characters"
    }
})

module.exports = router;