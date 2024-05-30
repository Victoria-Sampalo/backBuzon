const express = require('express');
const router = express.Router()
const { getUserID, getUsers, userDeleteId, updateUserId, tokenValid, tokenValidAdmin, 
    postCreateUser, validToken,
    getCountUsers,
    getAllUserLimitFilters} = require('../controllers/indexController')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/createuser", urlencodedParser, postCreateUser)

 router.get("/users", urlencodedParser,tokenValidAdmin,getUsers)
//   router.get("/users", urlencodedParser, getUsers)

router.post("/countusers", urlencodedParser,tokenValidAdmin,getCountUsers)

router.post("/userslimitfilters", urlencodedParser,tokenValidAdmin,getAllUserLimitFilters)


router.get("/user/:id", urlencodedParser,tokenValid,getUserID)

router.delete("/deleteuser/:id", urlencodedParser,tokenValidAdmin, userDeleteId)
router.put("/updateuser", urlencodedParser, tokenValidAdmin, updateUserId)

module.exports = router;