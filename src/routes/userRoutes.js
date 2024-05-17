const express = require('express');
const router = express.Router()
const {postCrearUsuario, getUserID, getUsers, UserDeleteId, userPut, tokenValid, tokenValidAdmin} = require('../controllers/indexController')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get("/users", urlencodedParser,tokenValidAdmin, getUsers)
router.get("/user/:id", urlencodedParser,tokenValid, getUserID)
router.post("/crearusuario", urlencodedParser,postCrearUsuario)
router.delete("/borrarusuario/:id", urlencodedParser, tokenValid,UserDeleteId)
router.put("/actualizarusuario", urlencodedParser,tokenValid, userPut)

module.exports = router;