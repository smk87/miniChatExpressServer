const express = require("express");
const router = express.Router();
const validate = require("validator");


//import model
const users = require("./models/users");

router.get('/', (req, res) => res.send("Hello world"));

//@Register, POST
errors = {};
router.post('/register', (req, res) => {
    //Check username validation
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

    //Check password validation
    if (validate.isEmpty(req.body.password, {
            ignore_whitespace: false
        })) {
        errors.password = "password can't be empty"
    } else if (!validate.isLength(req.body.password, {
            min: 2,
            max: 12
        })) {
        errors.password = "password have to be within 2-12 characters"
    }

    Object.keys(obj).length ===
})

module.exports = router;