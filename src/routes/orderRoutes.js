const express = require('express');
const router = express.Router()
const {getOrder, getOrderID, postCrearOrder, orderDeleteId, tokenValid, tokenValidAdmin} = require('../controllers/indexController')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/orders", urlencodedParser, tokenValid, getOrder)
router.get("/order/:id", urlencodedParser,tokenValid, getOrderID)
router.post("/crearorder", urlencodedParser,tokenValid,postCrearOrder)
router.delete("/borrarorder/:id", urlencodedParser,tokenValidAdmin, orderDeleteId)

module.exports = router;