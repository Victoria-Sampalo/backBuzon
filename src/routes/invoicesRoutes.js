const express = require('express');
const router = express.Router()

const bodyParser = require('body-parser');
const { getAllInvoices, getInvoicesFromUser, getInvoiceID, postCreateInvoice, updateInvoiceId, invoiceDeleteId, tokenValid, tokenValidAdmin, getCountInvoices, 
    getCountInvoicesAdmin, getAllInvoicesAdmin, getAllInvoicesAdminLimitFilters,getCountInvoicesAdminFilters, getAllDevelopment, 
    getCountInvoicesNormalFilters} = require('../controllers/indexController');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.post("/createinvoice", urlencodedParser,tokenValid, )
router.post("/createinvoice", urlencodedParser,tokenValid, postCreateInvoice )


// router.get("/allinvoices", urlencodedParser,tokenValidAdmin,)
router.post("/allinvoices", urlencodedParser,tokenValidAdmin,getAllInvoicesAdmin)


router.post("/allinvoicesadminlimitfilters", urlencodedParser,tokenValidAdmin,getAllInvoicesAdminLimitFilters)

// router.post("/countinvoices", urlencodedParser,tokenValid, getCountInvoices)
router.post("/countinvoices", urlencodedParser,tokenValid, getCountInvoicesNormalFilters)

// router.get("/invoicesfromuser", urlencodedParser,tokenValid,)
//añadirle limit filters
router.post("/invoicesfromuser", urlencodedParser,tokenValid, getInvoicesFromUser)
// router.post("/invoicesfromuser", urlencodedParser,getInvoicesFromUser)


router.post("/countinvoicesadmin", urlencodedParser,tokenValidAdmin, getCountInvoicesAdmin)

router.post("/countinvoicesadminfilters", urlencodedParser,tokenValidAdmin, getCountInvoicesAdminFilters)



// router.get("/invoice/:id", urlencodedParser,tokenValid,) //comprobar que el creador sea el mismo que el usuario
router.get("/invoice/:id", urlencodedParser,tokenValid, getInvoiceID)

// router.delete("/deleteinvoice/:id", urlencodedParser,tokenValidAdmin, )

router.delete("/deleteinvoice/:id", urlencodedParser,tokenValidAdmin, invoiceDeleteId )

//  router.put("/updateinvoice", urlencodedParser, tokenValidAdmin, )
router.put("/updateinvoice", urlencodedParser,tokenValidAdmin, updateInvoiceId)


router.get("/alldevelopment", urlencodedParser,tokenValid, getAllDevelopment)



module.exports = router;