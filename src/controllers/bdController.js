
const { executeSQLfromQuery } = require('../database/db');
const {resError, prevenirInyeccionCodigo, esPassSegura, validName, validEmail, catchAsync, response, generarHashpass, ClientError } = require('../utils/indexUtils')

const borrarUsuarios = async (req, res) => {
    const { rows } = await executeSQLfromQuery('DROP TABLE users')
    response(res, 200, rows);
}

const borrarInvoices = async (req, res) => {
    const { rows } = await executeSQLfromQuery('DROP TABLE invoices')
    response(res, 200, rows);
}

const createUsers = async (req, res) => {
    const nombres = ["Ana", "Juan", "María", "Pedro", "Laura", "Carlos", "David", "Sandra", "Javier", "Rosa",
        "Luis", "Francisco", "Isabel", "José", "Antonio", "Mercedes", "Manuel", "Cristina", "Alejandro", "Marta"]

    const nombres_empresas = ["Acme Corporation", "Industrias Lopez", "Tech Solutions", "Servicios Globales", "Comercializadora Rivera",
        "Constructora del Valle", "Distribuidora Martinez", "Alimentos del Norte", "Agropecuaria Gonzalez", "Textiles del Sur",
        "Farmacias del Centro", "Logistica Express", "Hoteles del Pacifico", "Turismo Aventura", "Inmobiliaria del Este",
        "Consultoria Integral", "Asesoria Financiera", "Servicios Profesionales", "Soluciones Tecnologicas", "Innovacion y Desarrollo"]

    const cifs = ["A12345678B", "B98765432C", "C87654321D", "D76543210E", "E65432109F",
        "F54321098G", "G43210987H", "H32109876I", "I21098765J", "J10987654K",
        "K09876543L", "L98765432M", "M87654321N", "N76543210O", "O65432109P",
        "P54321098Q", "Q43210987R", "R32109876S", "S21098765T", "T10987654U"]

    const numeros_telefono = ["+34 612 345 678", "+34 987 654 321", "+34 765 432 109", "+34 654 321 098", "+34 543 210 987",
                            "+34 432 109 876", "+34 321 098 765", "+34 210 987 654", "+34 109 876 543", "+34 098 765 432",
                            "+34 987 654 321", "+34 876 543 210", "+34 765 432 109", "+34 654 321 098", "+34 543 210 987",
                            "+34 432 109 876", "+34 321 098 765", "+34 210 987 654", "+34 109 876 543", "+34 098 765 432"]
    const tipo=['normal', 'admin'];

    for (let index = 0; index < 100; index++) {
        const passSegura = generarHashpass('1234');
        const name=nombres[Math.floor(Math.random() * nombres.length)] 
        const company= nombres_empresas[Math.floor(Math.random() * nombres_empresas.length)] 
        const cif=cifs[Math.floor(Math.random() * cifs.length)] 
        const phone= numeros_telefono[Math.floor(Math.random() * numeros_telefono.length)] 
        const email=name+index+"@gmail.com"
        const pass=await passSegura
        const type=tipo[Math.floor(Math.random() * tipo.length)] 
        await executeSQLfromQuery(`INSERT INTO users (name, company, CIF, phone, email, password, type) VALUES ('${name}', '${company}', '${cif}', '${phone}', '${email}', '${pass}', '${type}');`)
    }
    // Enviar el usuario guardado como respuesta
    response(res, 200, {message:'Usuarios creados correctamente'})
}
function generateRandomDate(
    startDateString = '2022-01-01T00:00:00+02:00',
    endDateString = new Date().toISOString()
  ) {
    try {
      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);
  
      // Ensure valid dates (optional, depending on your needs)
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid start or end date provided.');
      }
  
      if (endDate < startDate) {
        throw new Error('End date must be after start date.');
      }
  
      const timeRange = endDate.getTime() - startDate.getTime();
      const randomDate = new Date(startDate.getTime() + Math.random() * timeRange);
      return randomDate.toISOString().slice(0, 19).replace('T', ' ');
    } catch (error) {
      console.error('Error generating random date:', error.message);
      // Handle the error appropriately, e.g., return a default date or retry
      return new Date(); // Example fallback value (adjust as needed)
    }
  }
  

const createInvoices=async (req, res)=>{
    const companyRandom=['prime', 'project']
    const developmentRandom=['neinor', 'lagoon', 'ocyan']
    const statusRandom=['sent', 'pending', 'paid', 'error', 'rejected']
    for (let index = 0; index < 100; index++) {
        const user_id= index
        const invoice_number= `INV-${Math.floor(Math.random() * 1000) + 1000}`
        const development= developmentRandom[Math.floor(Math.random() * developmentRandom.length)] 
        const company=companyRandom[Math.floor(Math.random() * companyRandom.length)] 
        const invoice_date=generateRandomDate() // Random invoice date
        const registration_date=generateRandomDate()// Random registration date
        const status=statusRandom[Math.floor(Math.random() * statusRandom.length)] 
        const error_message="mensaje de error"
        const rejection_message="mensaje de rechazo"
        const concept=`concepto khj  wjehb fywfe wfeyuwgfbewebiuf usyfgusbuysabdfuasbf8sbdfsdf`
        const amount= Math.floor(Math.random() * 1000) + 100.00;
        await executeSQLfromQuery(`INSERT INTO invoices (
            user_id, 
            invoice_number,
            development,
            company,
            invoice_date,
            registration_date,
            status,
            error_message,
            rejection_message,
            concept,
            amount) VALUES ('${user_id}','${invoice_number}', '${development}', '${company}', '${invoice_date}', '${registration_date}', '${status}', '${error_message}', '${rejection_message}', '${concept}', '${amount}');`)
    }

    response(res, 200, {message:'Facturas creadas correctamente'})
}

module.exports = {
    //gestiono los errores con catchAsync
    borrarUsuarios: catchAsync(borrarUsuarios),
    borrarInvoices: catchAsync(borrarInvoices),
    createUsers:catchAsync(createUsers),
    createInvoices:catchAsync(createInvoices)
}