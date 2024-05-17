const { login, validToken } = require("../controllers/indexController");
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/login", urlencodedParser, login)
router.post("/validtoken", urlencodedParser, validToken)

module.exports = router;