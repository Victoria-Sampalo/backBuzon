const {postCreateUser, getUserID, getUsers, UserDeleteId, updateUserId}=require("./userController");
const { login, validToken, pruebaBBDD } = require("./loginController");
const {tokenValid, tokenValidAdmin} = require("./authController");
const { borrarUsuarios, borrarInvoices, createUsers, createInvoices } = require("./bdController");
const { postCreateInvoice,getAllInvoices,getInvoicesFromUser,getInvoiceID, updateInvoiceId, invoiceDeleteId, getCountInvoices, getAllInvoicesAdmin, getCountInvoicesAdmin, getAllInvoicesAdminLimitFilters, getCountInvoicesAdminFilters } = require("./invoiceController");


module.exports = {
    postCreateUser, getUserID, getUsers, UserDeleteId, updateUserId,
    login, validToken, pruebaBBDD,
    tokenValid, tokenValidAdmin,
    borrarUsuarios, borrarInvoices, createUsers, createInvoices,
    postCreateInvoice,getAllInvoices,getInvoicesFromUser,getInvoiceID,updateInvoiceId,invoiceDeleteId, 
    getCountInvoices, getAllInvoicesAdmin,getCountInvoicesAdmin,getAllInvoicesAdminLimitFilters,getCountInvoicesAdminFilters

}