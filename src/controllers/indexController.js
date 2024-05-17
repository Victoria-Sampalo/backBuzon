const {postCrearUsuario, getUserID, getUsers, UserDeleteId, userPut}=require("./userController");
const { login, validToken, pruebaBBDD } = require("./loginController");
const {tokenValid, tokenValidAdmin} = require("./authController");


module.exports = {
    postCrearUsuario, getUserID, getUsers, UserDeleteId, userPut,
    login, validToken, pruebaBBDD,
    tokenValid, tokenValidAdmin
}