const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const validate = require("validator");

//Body Parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(bodyParser.json());

console.log(validate.isEmpty(""))

//import model
const users = require("./models/users");

router.get('/', (req, res) => res.send("Hello world"));

//@Register, POST
router.post('/register', (req, res) => {

})

module.exports = router;