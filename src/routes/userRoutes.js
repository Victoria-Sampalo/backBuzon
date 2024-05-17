const express = require('express');
const router = express.Router()
const { getUserID, getUsers, UserDeleteId, updateUserId, tokenValid, tokenValidAdmin, postCreateUser} = require('../controllers/indexController')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/createuser", urlencodedParser,postCreateUser)

router.get("/users", urlencodedParser,tokenValidAdmin, getUsers)
router.get("/user/:id", urlencodedParser,tokenValid, getUserID)

router.delete("/deleteuser/:id", urlencodedParser, tokenValid,UserDeleteId)
router.put("/updateuser", urlencodedParser,tokenValid, updateUserId)

module.exports = router;