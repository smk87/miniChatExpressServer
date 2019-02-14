const express = require("express");
const router = express.Router();
const validate = require("validator");


//import model
const users = require("./models/users");

router.get('/', (req, res) => res.send("Hello world"));

//@Register, POST
errors = {};
router.post('/register', (req, res) => {
    if (validate.isEmpty(req.body.username)) {

    }
})

module.exports = router;