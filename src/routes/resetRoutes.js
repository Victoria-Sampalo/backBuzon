const { borrarUsuarios, borrarInvoices, createUsers, createInvoices } = require("../controllers/indexController");
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//primero borrar los invoices y despues los usuaurios
router.delete('/borrarusuarios', urlencodedParser, borrarUsuarios)
router.delete('/borrarinvoices', urlencodedParser, borrarInvoices)
router.get('/createuserstest', urlencodedParser, createUsers)
router.get('/createinvoicesstest', urlencodedParser, createInvoices)

module.exports = router;