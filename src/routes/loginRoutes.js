const { login, validToken, pruebaBBDD } = require("../controllers/indexController");
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const { route } = require("./userRoutes");
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/pruebaBBDD', urlencodedParser, pruebaBBDD)
router.post("/login", urlencodedParser, login)
router.post("/validtoken", urlencodedParser, validToken)

module.exports = router;