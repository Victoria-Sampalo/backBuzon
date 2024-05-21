const { borrarUsuarios, borrarInvoices } = require("../controllers/indexController");
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.delete('/borrarusuarios', urlencodedParser, borrarUsuarios)
router.delete('/borrarinvoices', urlencodedParser, borrarInvoices)

module.exports = router;