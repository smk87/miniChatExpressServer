const express = require("express");
const router = express.Router();
const validate = require("validator");


console.log(validate.isEmpty(" ", {
    ignore_whitespace: true
}));

//import model
const users = require("./models/users");

router.get('/', (req, res) => res.send("Hello world"));

//@Register, POST
router.post('/register', (req, res) => {

})

module.exports = router;