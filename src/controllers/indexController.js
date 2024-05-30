const {postCreateUser, getUserID, getUsers, userDeleteId, updateUserId, getCountUsers, getAllUserLimitFilters}=require("./userController");
const { login, validToken, pruebaBBDD } = require("./loginController");
const {tokenValid, tokenValidAdmin} = require("./authController");
const { borrarUsuarios, borrarInvoices, createUsers, createInvoices } = require("./bdController");
const { postCreateInvoice,getAllInvoices,getInvoicesFromUser,getInvoiceID,
     updateInvoiceId, invoiceDeleteId, getCountInvoices, getAllInvoicesAdmin,
      getCountInvoicesAdmin, getAllInvoicesAdminLimitFilters, 
      getCountInvoicesAdminFilters,
       getAllDevelopment } = require("./invoiceController");


module.exports = {
    postCreateUser, getUserID, getUsers, userDeleteId, updateUserId,
    login, validToken, pruebaBBDD,
    tokenValid, tokenValidAdmin,
    borrarUsuarios, borrarInvoices, createUsers, createInvoices,
    postCreateInvoice,getAllInvoices,getInvoicesFromUser,getInvoiceID,updateInvoiceId,invoiceDeleteId, 
    getCountInvoices, getAllInvoicesAdmin,getCountInvoicesAdmin,getAllInvoicesAdminLimitFilters,
    getCountInvoicesAdminFilters,getAllDevelopment,
    getCountUsers,getAllUserLimitFilters

}