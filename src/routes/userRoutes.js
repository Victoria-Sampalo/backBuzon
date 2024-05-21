const express = require('express');
const router = express.Router()
const { getUserID, getUsers, UserDeleteId, updateUserId, tokenValid, tokenValidAdmin, 
    postCreateUser, validToken} = require('../controllers/indexController')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/createuser", urlencodedParser, postCreateUser)

router.get("/users", urlencodedParser,tokenValidAdmin, getUsers)
router.get("/user/:id", urlencodedParser,tokenValid,getUserID)

router.delete("/deleteuser/:id", urlencodedParser,tokenValidAdmin, UserDeleteId)
router.put("/updateuser", urlencodedParser, tokenValidAdmin, updateUserId)

module.exports = router;