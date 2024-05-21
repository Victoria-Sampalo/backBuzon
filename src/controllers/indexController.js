const {postCreateUser, getUserID, getUsers, UserDeleteId, updateUserId}=require("./userController");
const { login, validToken, pruebaBBDD } = require("./loginController");
const {tokenValid, tokenValidAdmin} = require("./authController");
const { borrarUsuarios, borrarInvoices, createUsers, createInvoices } = require("./bdController");


module.exports = {
    postCreateUser, getUserID, getUsers, UserDeleteId, updateUserId,
    login, validToken, pruebaBBDD,
    tokenValid, tokenValidAdmin,
    borrarUsuarios, borrarInvoices, createUsers, createInvoices
}