const express = require('express');
const router = express.Router()

const bodyParser = require('body-parser');
const { getAllInvoices } = require('../controllers/invoiceController');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//router.post("/createinvoice", urlencodedParser,tokenValid, )

// router.get("/invoicesfromuser", urlencodedParser,tokenValid,)
// router.get("/allinvoices", urlencodedParser,tokenValidAdmin,)
router.get("/allinvoices", urlencodedParser,getAllInvoices)

// router.get("/invoice/:id", urlencodedParser,tokenValid,) //comprobar que el creador sea el mismo que el usuario

// router.delete("/deleteinvoice/:id", urlencodedParser,tokenValidAdmin, )
//  router.put("/updateinvoice", urlencodedParser, tokenValidAdmin, )

module.exports = router;