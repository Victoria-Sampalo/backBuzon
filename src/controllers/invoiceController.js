const { executeSQLfromQuery } = require('../database/db');
const {resError, prevenirInyeccionCodigo, esPassSegura, validName, validEmail, catchAsync, response, generarHashpass, ClientError } = require('../utils/indexUtils')



// crear usuario
const postCreateInvoice = async (req, res) => {

}



const getAllInvoices= async (req,res)=>{
    const {rows}= await executeSQLfromQuery('SELECT * FROM INVOICES')
    response(res, 200, rows);
}


module.exports = {
    //gestiono los errores con catchAsync
    getAllInvoices:catchAsync(getAllInvoices),
}
