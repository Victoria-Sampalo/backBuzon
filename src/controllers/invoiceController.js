const { executeSQLfromQuery } = require("../database/db");
const {
  resError,
  prevenirInyeccionCodigo,
  esPassSegura,
  validName,
  validEmail,
  catchAsync,
  response,
  generarHashpass,
  ClientError,
  decodeToken,
} = require("../utils/indexUtils");

// const Dropbox = require('dropbox');
// const fs = require('fs');

// // Crear Dropbox Client (asumiendo que tienes las credenciales configuradas)
// const dbx = new Dropbox({
//   clientId: process.env.DROPBOX_CLIENT_ID,
//   clientSecret: process.env.DROPBOX_CLIENT_SECRET,
// });

// -------------------- Funciones para Facturas --------------------
// crear factura
const postCreateInvoice = async (req, res) => {
  const {
    user_id,
    invoice_number,
    development,
    company,
    invoice_date,
    status,
    error_message = null,
    rejection_message = null,
    concept,
    amount
  } = req.body;

  const registration_date = new Date().toISOString().split('T')[0]; // Fecha actual

  console.log("invoiceController " + req.body)
  // Validar campos obligatorios
  if (!user_id || !invoice_number || !development || !company || !invoice_date || !status || !concept || !amount) {
    return response(res, 400, { message: 'Los campos user_id, invoice_number, development, company, invoice_date, status, concept y amount son obligatorios' });
  }

  // Crear la consulta SQL para insertar la factura
  const insertQuery = `
    INSERT INTO invoices (
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
      amount
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  const values = [
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
    amount
  ];

  try {
    // Ejecutar la consulta SQL con parámetros preparados
    const result = await executeSQLfromQuery(insertQuery, values);
    if (result.rowCount === 0) {
      return response(res, 500, { message: 'Invoice creation failed' });
    }

    // Enviar la respuesta con éxito
    return response(res, 200, result.rows[0]);
  } catch (error) {
    console.error('Error creating invoice:', error);
    return response(res, 500, { message: 'Internal server error' });
  }
};






const getAllInvoices = async (req, res) => {
  const { rows } = await executeSQLfromQuery("SELECT * FROM INVOICES");
  response(res, 200, rows);
};

const getAllInvoicesAdminLimitFilters = async (req, res) => {
  const limit = req.body.limit
  const  offset = req.body.offset
  const { numerofactura,development, company } = req.body;
   // Construir la consulta SQL dinámicamente
   let query = 'SELECT * FROM INVOICES';
   const conditions = [];
 
  // Agregar condiciones si los filtros están presentes
  if (numerofactura) {
    conditions.push(`invoice_number ILIKE '%${numerofactura}%'`);
  }
  if (development) {
    conditions.push(`development = '${development}'`);
  }
  if (company) {
    conditions.push(`company = '${company}'`);
  }
  // Combinar las condiciones con la cláusula WHERE si existen
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // Agregar limit y offset
  query += ` LIMIT ${limit} OFFSET ${offset}`;

  const { rows } = await executeSQLfromQuery(query);
  response(res, 200, rows);
 
};

const getInvoicesFromUser = async (req, res) => {
  const { id, limit, offset, numerofactura, development, company } = req.body;

  console.log("id " + id);
  let query = `SELECT * FROM INVOICES WHERE user_id = $1`;
  let queryParams = [id];

  // Agregar condiciones si los filtros están presentes
  if (numerofactura) {
    queryParams.push(`%${numerofactura}%`);
    query += ` AND invoice_number ILIKE $${queryParams.length}`;
  }
  if (development) {
    queryParams.push(development);
    query += ` AND development = $${queryParams.length}`;
  }
  if (company) {
    queryParams.push(company);
    query += ` AND company = $${queryParams.length}`;
  }

  // Agregar limit y offset
  queryParams.push(limit);
  query += ` LIMIT $${queryParams.length}`;
  queryParams.push(offset);
  query += ` OFFSET $${queryParams.length}`;

  try {
    const { rows } = await executeSQLfromQuery(query, queryParams);
    response(res, 200, rows);
  } catch (error) {
    console.error("Database query error:", error);
    response(res, 500, { error: "Internal server error" });
  }
};



const getCountInvoicesAdmin = async (req, res) => {
  const { rows } = await executeSQLfromQuery(
    `SELECT COUNT(*) AS total_filas FROM INVOICES`

  );

  response(res, 200, rows[0]);
};

const getCountInvoicesAdminFilters = async (req, res) => {
  const { numerofactura,development, company } = req.body;

  let query = `SELECT COUNT(*) AS total_filas FROM INVOICES WHERE 1=1`;
  
  // Añadir filtros opcionales
  if (numerofactura) {
    query += ` AND invoice_number = '${numerofactura}'`;
  }
  if (development) {
    query += ` AND development = '${development}'`;
  }
  if (company) {
    query += ` AND company = '${company}'`;
  }


    const { rows } = await executeSQLfromQuery(query);
    response(res, 200, rows[0]);
  
};

const getCountInvoicesNormalFilters = async (req, res) => {
  const {id, numerofactura,development, company } = req.body;

  let query =  `SELECT COUNT(*) AS total_filas FROM INVOICES WHERE user_id=${id}`
  
  // Añadir filtros opcionales
  if (numerofactura) {
    query += ` AND invoice_number = '${numerofactura}'`;
  }
  if (development) {
    query += ` AND development = '${development}'`;
  }
  if (company) {
    query += ` AND company = '${company}'`;
  }


    const { rows } = await executeSQLfromQuery(query);
    response(res, 200, rows[0]);
  
};



//no usado
const getCountInvoices = async (req, res) => {
  // Obtén el ID del parámetro de la solicitud
  const id = req.body.id;
  console.log("id"+ id);
  const { rows } = await executeSQLfromQuery(
    `SELECT COUNT(*) AS total_filas FROM INVOICES WHERE user_id=${id}`

  );

  response(res, 200, rows[0]);
};


 const getAllInvoicesAdmin = async (req, res) => {
  const limit = req.body.limit
  const  offset = req.body.offset
        // Obtén el ID del parámetro de la solicitud
        const id = req.body.id;
        console.log("id"+ id);
        const { rows } = await executeSQLfromQuery(
          `SELECT * FROM INVOICES  LIMIT ${limit}  OFFSET ${offset}`
        );
      
      
        response(res, 200, rows);
      };

//busca un usuario por ID
const getInvoiceID = async (req, res) => {
  // Obtén el ID del parámetro de la solicitud
  const id = req.params.id;
 let token = "";
  try {
      // Verificar y extraer el token de la cabecera de autorización
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  } catch (error) {
    throw new ClientError("Token no válido", 401);
  }
// Decodificar el token
  const decode = await decodeToken(token);
  if(decode==null){
    throw new ClientError("Token no valido en decode", 401)
  }
 // Obtener la factura por ID
  const { rows } = await executeSQLfromQuery(
    `SELECT * FROM INVOICES WHERE id=${id}`
  );
  console.log(rows);
  console.log(decode);
// // Verificar si se encontró la factura
// if (rows.length === 0) {
//   return response(res, 404, { message: "Factura no encontrada" });
// }

// Verificar si el usuario tiene permiso para acceder a la factura
  if (decode.type == "admin" || decode.id == rows[0].user_id) {
    response(res, 200, rows);
  } else {
  
    response(res, 403, {message:"No es el creador.No tiene permiso para acceder a esta factura"});

  }


};


const getAllDevelopment = async (req, res) => {
    const { rows } = await executeSQLfromQuery("SELECT DISTINCT development FROM INVOICES");
    response(res, 200, rows);
  
};



// borrar una factura
const invoiceDeleteId=async (req, res)=>{
  const id = req.params.id;
  const {rows}= await executeSQLfromQuery(`DELETE FROM INVOICES WHERE id=${id}`)
  response(res, 200, rows);
}


const updateInvoiceId= async (req, res) => {
  const id = req.body.id;
  const user_id = req.body.user_id;
  const invoice_number = req.body.invoice_number;
  const development = req.body.development;
  const company = req.body.company;
  const invoice_date = req.body.invoice_date;
  const registration_date = req.body.registration_date || new Date().toISOString().split('T')[0]; // Fecha actual
  const status = req.body.status;
  const error_message = req.body.error_message || null;
  const rejection_message = req.body.rejection_message || null;
  const concept = req.body.concept;
  const amount = req.body.amount;

  // Validar campos obligatorios
  // if (!user_id || !invoice_number || !development || !company || !invoice_date || !status || !concept || !amount) {
  //   return response(res, 400, { message: 'Los campos user_id, invoice_number, development, company, invoice_date, status, concept y amount son obligatorios' });
  // }

  // Crear la consulta SQL para actualizar la factura
  const query = `UPDATE invoices SET 
    user_id = '${user_id}',
    invoice_number = '${invoice_number}', 
    development = '${development}', 
    company = '${company}', 
    invoice_date = '${invoice_date}', 
    registration_date = '${registration_date}', 
    status = '${status}', 
    error_message = '${error_message}', 
    rejection_message = '${rejection_message}', 
    concept = '${concept}', 
    amount = '${amount}'
    WHERE id = ${id}`;

  // Ejecutar la consulta SQL
  const { rowCount } = await executeSQLfromQuery(query);

  // Verificar si la actualización fue exitosa
  if (rowCount === 0) {
    return response(res, 404, { message: 'Factura no encontrada o ningún campo fue modificado' });
  }else{
    // Enviar la respuesta con éxito
  response(res, 200, { message: 'Factura actualizada exitosamente', rowCount });
  }
};


module.exports = {
  //gestiono los errores con catchAsync
  getAllInvoices: catchAsync(getAllInvoices),
  getInvoicesFromUser: catchAsync(getInvoicesFromUser),
  getInvoiceID: catchAsync(getInvoiceID),
  postCreateInvoice:catchAsync(postCreateInvoice),
  updateInvoiceId:catchAsync(updateInvoiceId),
  invoiceDeleteId:catchAsync(invoiceDeleteId),
  getCountInvoices:catchAsync(getCountInvoices),
  getAllInvoicesAdmin:catchAsync(getAllInvoicesAdmin),
  getCountInvoicesAdmin:catchAsync(getCountInvoicesAdmin),
  getAllInvoicesAdminLimitFilters:catchAsync(getAllInvoicesAdminLimitFilters),
  getCountInvoicesAdminFilters:catchAsync(getCountInvoicesAdminFilters),
  getAllDevelopment:catchAsync(getAllDevelopment),
  getCountInvoicesNormalFilters:catchAsync(getCountInvoicesNormalFilters),
 
};
