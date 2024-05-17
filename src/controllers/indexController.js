const {postCrearUsuario, getUserID, getUsers, UserDeleteId, userPut}=require("./userController");
const { login, validToken } = require("./loginController");
const {tokenValid, tokenValidAdmin} = require("./authController");


module.exports = {
    postCrearUsuario, getUserID, getUsers, UserDeleteId, userPut,
    login, validToken,
    tokenValid, tokenValidAdmin
}