const express = require('express');
const router = express.Router()

const bodyParser = require('body-parser');
const { getAllInvoices, getInvoicesFromUser, getInvoiceID, postCreateInvoice, updateInvoiceId, invoiceDeleteId, tokenValid, tokenValidAdmin } = require('../controllers/indexController');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.post("/createinvoice", urlencodedParser,tokenValid, )
router.post("/createinvoice", urlencodedParser,tokenValid, postCreateInvoice )


// router.get("/allinvoices", urlencodedParser,tokenValidAdmin,)
router.get("/allinvoices", urlencodedParser,tokenValidAdmin,getAllInvoices)

// router.get("/invoicesfromuser", urlencodedParser,tokenValid,)
router.get("/invoicesfromuser", urlencodedParser,tokenValid, getInvoicesFromUser)


// router.get("/invoice/:id", urlencodedParser,tokenValid,) //comprobar que el creador sea el mismo que el usuario
router.get("/invoice/:id", urlencodedParser,tokenValid, getInvoiceID)

// router.delete("/deleteinvoice/:id", urlencodedParser,tokenValidAdmin, )

router.delete("/deleteinvoice/:id", urlencodedParser,tokenValidAdmin, invoiceDeleteId )

//  router.put("/updateinvoice", urlencodedParser, tokenValidAdmin, )
router.put("/updateinvoice", urlencodedParser,tokenValidAdmin, updateInvoiceId)


module.exports = router;