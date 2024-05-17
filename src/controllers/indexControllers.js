const { login, validToken } = require("./loginController");
const {tokenValid, tokenValidAdmin} = require("./authController");


module.exports = {
    login, validToken,
    tokenValid, tokenValidAdmin
}