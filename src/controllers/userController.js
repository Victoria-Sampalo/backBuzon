const { executeSQLfromQuery } = require('../database/db');
const {resError, prevenirInyeccionCodigo, esPassSegura, validName, validEmail, catchAsync, response, generarHashpass, ClientError, verificarToken } = require('../utils/indexUtils')

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
    let token=null;
    let verificacion=null
    let esAdmin=false;
    try {
        token=req.headers.authorization.split(' ')[1];
        verificacion=await verificarToken(token);
       console.log(verificacion);
        if(verificacion.type=='admin') esAdmin=true;
       
    } catch (error) {
        console.log(error);
    }
    const passSegura=generarHashpass(req.body.password);
    const name=req.body.name
    const company= req.body.company
    const cif=req.body.cif
    const phone= req.body.phone
    const email=req.body.email
    const pass=await passSegura
    const type = (esAdmin) ? req.body.user_type: 'normal';
    const user_status = (esAdmin) ? req.body.user_status: 'false';

    // user_type: (datos.type==null)? 'normal' : datos.type,
    // user_status: (datos.status==null)? false : datos.status,

    const {rowCount}= await executeSQLfromQuery(`INSERT INTO users (name, company, CIF, phone, email, password, type, user_status ) VALUES ('${name}', '${company}', '${cif}', '${phone}', '${email}', '${pass}', '${type}', '${user_status}');`)
    
    const {rows}= await executeSQLfromQuery(`SELECT * FROM USERS WHERE email='${email}'`);
    console.log(rows[0]);
    // Enviar el usuario guardado como respuesta
    response(res, 200, rows[0])
}

//recoge todos los usuarios
const getUsers= async (req,res)=>{
    const {rows}= await executeSQLfromQuery('SELECT * FROM USERS')
    response(res, 200, rows);
}

//busca un usuario por ID
const getUserID= async (req,res)=>{
    // Obtén el ID del parámetro de la solicitud
    const id = req.params.id;
    // Utiliza el método findById() de Mongoose para buscar un usuario por su ID
    // Si no se encuentra el usuario, responde con un código de estado 404 (Not Found)
    const {rows}= await executeSQLfromQuery(`SELECT * FROM USERS WHERE id=${id}`)
    response(res, 200, rows);
}

// borrar un usuario
const UserDeleteId=async (req, res)=>{
    const id = req.params.id;
    const {rows}= await executeSQLfromQuery(`DELETE FROM USERS WHERE id=${id}`)
    response(res, 200, rows);
}

// modificar el usuario
const updateUserId=async (req, res)=>{
    // const filter = { _id: req.body.id};
    // const updateText={};
    // if(!!req.body.name) updateText['name']=prevenirInyeccionCodigo(req.body.name);
    // if(!!req.body.email) updateText['email']=prevenirInyeccionCodigo(req.body.email);
    // if(!!req.body.pass && !esPassSegura(req.body.pass) ) updateText['pass']=await generarHashpass(req.body.pass);
    // let doc = await User.findOneAndUpdate(filter, updateText);
    // if(doc==null)throw new ClientError("No existe el usuario", 400)
    // response(res, 200, doc);
    const id = req.body.id;

    console.log(id)

    // Validación de entrada
    // if (!id || !req.body.name || !req.body.email || !req.body.password || !req.body.direction ||
    //     !validEmail(req.body.email) ||
    //     !validName(req.body.name) ||
    //     !esPassSegura(req.body.password)) {
    //     return response(res, 400, { message: 'Datos no válidos' });
    // }

    const name = req.body.name;
    const company = req.body.company;
    const cif = req.body.cif;
    const phone = req.body.phone;
    const email = req.body.email;
    const pass = await generarHashpass(req.body.password);
    const type = req.body.user_type;
    const user_status = req.body.user_status;

   // Usar una cadena para la consulta SQL
   const query = `
   UPDATE users 
   SET 
       name = '${name}', 
       company = '${company}', 
       CIF = '${cif}', 
       phone = '${phone}', 
       email = '${email}', 
       password = '${pass}', 
       user_type = '${type}',
       user_status = '${user_status}',
   WHERE 
       id = '${id}'
`;

// Ejecutar la consulta
const { rowCount } = await executeSQLfromQuery(query);

if (rowCount === 0) {
   return response(res, 404, { message: 'User not found' });
}

response(res, 200, { message: 'User updated successfully' });

}

module.exports = {
    //gestiono los errores con catchAsync
    postCreateUser:catchAsync(postCreateUser),
    getUsers:catchAsync(getUsers),
    getUserID:catchAsync(getUserID),
    UserDeleteId:catchAsync(UserDeleteId),
    updateUserId:catchAsync(updateUserId)
}
