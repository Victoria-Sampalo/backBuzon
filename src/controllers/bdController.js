const { executeSQLfromQuery } = require('../database/db');
const { catchAsync } = require('../utils/catchAsync');

const borrarUsuarios= async (req,res)=>{
    const {rows}= await executeSQLfromQuery('DROP TABLE users')
    response(res, 200, rows);
}

const borrarInvoices= async (req,res)=>{
    const {rows}= await executeSQLfromQuery('DROP TABLE invoices')
    response(res, 200, rows);
}

const createUsers=async(req,res) =>{
    const nombres = ["Ana", "Juan", "María", "Pedro", "Laura", "Carlos", "David", "Sandra", "Javier", "Rosa",
               "Luis", "Francisco", "Isabel", "José", "Antonio", "Mercedes", "Manuel", "Cristina", "Alejandro", "Marta"]

    
    for (let index = 0; index < 100; index++) {
        const passSegura=generarHashpass(req.body.password);
        // const name= 
        // const company= 
        // const cif=
        // const phone= 
        // const email=index+
        // const pass=await passSegura
        // const type=
    
        const {rowCount}= await executeSQLfromQuery(`INSERT INTO users (name, company, CIF, phone, email, password, type) VALUES ('${name}', '${company}', '${cif}', '${phone}', '${email}', '${pass}', '${type}');`)
    
        
    }
    // Enviar el usuario guardado como respuesta
    response(res, 200, rowCount)
}

module.exports = {
    //gestiono los errores con catchAsync
    borrarUsuarios:catchAsync(borrarUsuarios),
    borrarInvoices:catchAsync(borrarInvoices)
}