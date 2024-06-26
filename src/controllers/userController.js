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
  verificarToken,
} = require("../utils/indexUtils");

// crear usuario
const postCreateUser = async (req, res) => {
  // doble comprobación, primero por seguridad en el frontend nos aseguraremos que los datos enviados sean correctos,
  // y aquí (backend) volveremos ha hacer una doble comprobación para evitar injección de código

  // if (!req.body.name || !req.body.email || !req.body.pass || !req.body.direction ||
  //     !validEmail(req.body.email) ||
  //     !validName(req.body.name) ||
  //     !esPassSegura(req.body.pass)
  // ) throw new ClientError("Los datos no son correctos", 400);
  // Crear un nuevo usuario utilizando el modelo de Mongoose
  //const newUser = new User(req.body);
  // genero una password segura
  let token = null;
  let verificacion = null;
  let esAdmin = false;
  try {
    token = req.headers.authorization.split(" ")[1];
    verificacion = await verificarToken(token);
    console.log(verificacion);
    if (verificacion.type == "admin") esAdmin = true;
  } catch (error) {
    console.log(error);
  }
  const passSegura = generarHashpass(req.body.password);
  const name = req.body.name;
  const company = req.body.company;
  const cif = req.body.cif;
  const phone = req.body.phone;
  const email = req.body.email;
  const pass = await passSegura;
  const type = esAdmin ? req.body.user_type : "normal";
  const user_status = esAdmin ? req.body.user_status : "false";

  // user_type: (datos.type==null)? 'normal' : datos.type,
  // user_status: (datos.status==null)? false : datos.status,

  const { rowCount } = await executeSQLfromQuery(
    `INSERT INTO users (name, company, CIF, phone, email, password, type, user_status ) VALUES ('${name}', '${company}', '${cif}', '${phone}', '${email}', '${pass}', '${type}', '${user_status}');`
  );

  const { rows } = await executeSQLfromQuery(
    `SELECT * FROM USERS WHERE email='${email}'`
  );
  console.log(rows[0]);
  // Enviar el usuario guardado como respuesta
  response(res, 200, rows[0]);
};

//recoge todos los usuarios
const getUsers = async (req, res) => {
  const { rows } = await executeSQLfromQuery("SELECT * FROM USERS");
  response(res, 200, rows);
};

const getCountUsers = async (req, res) => {
  let query = `SELECT COUNT(*) AS total_filas FROM USERS`;
  const { rows } = await executeSQLfromQuery(query);
  response(res, 200, rows[0]);
};

//Recoge todos los usuarios teniendo en cuenta filtro y paginación
const getAllUserLimitFilters = async (req, res) => {
  const limit = req.body.limit;
  const offset = req.body.offset;
  // Obtén el ID del parámetro de la solicitud
  const id = req.body.id;
  //console.log("id"+ id);
  const { rows } = await executeSQLfromQuery(
    `SELECT * FROM USERS ORDER BY id ASC LIMIT ${limit}  OFFSET ${offset}`
  );

  response(res, 200, rows);
};

//busca un usuario por ID
const getUserID = async (req, res) => {
  // Obtén el ID del parámetro de la solicitud
  const id = req.params.id;
  // Utiliza el método findById() de Mongoose para buscar un usuario por su ID
  // Si no se encuentra el usuario, responde con un código de estado 404 (Not Found)
  const { rows } = await executeSQLfromQuery(
    `SELECT * FROM USERS WHERE id=${id}`
  );
  response(res, 200, rows);
};

// borrar un usuario
const userDeleteId = async (req, res) => {
  const id = req.params.id;
  const { rows } = await executeSQLfromQuery(
    `DELETE FROM USERS WHERE id=${id}`
  );
  response(res, 200, rows);
};

// modificar el usuario
const updateUserId = async (req, res) => {
  const id = req.body.id;
  console.log("ID: " + id);

  const name = req.body.name;
  const company = req.body.company;
  const cif = req.body.cif;
  const phone = req.body.phone;
  const email = req.body.email;
  //const pass = await generarHashpass(req.body.password);
  const newPassword = req.body.password;
  const type = req.body.type;
  const user_status = req.body.user_status;

  // Consulta para obtener la contraseña actual del usuario
  const userQuery = "SELECT password FROM users WHERE id = $1";
  const { rows: userRows } = await executeSQLfromQuery(userQuery, [id]);

  //console.log(userRows);

  if (userRows.length === 0) {
    return response(res, 404, { message: "User not found" });
  }

  const currentPasswordHash = userRows[0].password;
  let passwordHash;

  // Verifica si la nueva contraseña es diferente de la actual
  if (newPassword && newPassword !== currentPasswordHash) {
    passwordHash = await generarHashpass(newPassword);
  } else {
    passwordHash = currentPasswordHash;
  }

  // Usar una cadena para la consulta SQL
  const query = `
   UPDATE users 
   SET 
       name = $1, 
       company = $2, 
       CIF = $3, 
       phone = $4, 
       email = $5, 
       password = $6, 
       type = $7,
       user_status = $8
   WHERE 
       id = $9
`;
  const values = [
    name,
    company,
    cif,
    phone,
    email,
    passwordHash,
    type,
    user_status,
    id,
  ];

  // Ejecutar la consulta
  const { rowCount } = await executeSQLfromQuery(query, values);

  if (rowCount === 0) {
    return response(res, 404, { message: "User not found" });
  }

  const { rows } = await executeSQLfromQuery(
    `SELECT * FROM USERS WHERE email='${email}'`
  );
  // console.log(rows[0]);
  // Enviar el usuario guardado como respuesta
  response(res, 200, rows[0]);
  // response(res, 200, { message: 'User updated successfully' });
};

module.exports = {
  //gestiono los errores con catchAsync
  postCreateUser: catchAsync(postCreateUser),
  getUsers: catchAsync(getUsers),
  getUserID: catchAsync(getUserID),
  userDeleteId: catchAsync(userDeleteId),
  updateUserId: catchAsync(updateUserId),
  getCountUsers: catchAsync(getCountUsers),
  getAllUserLimitFilters: catchAsync(getAllUserLimitFilters),
};
