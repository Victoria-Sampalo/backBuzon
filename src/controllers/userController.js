const { executeSQLfromQuery } = require('../database/db');
const {resError, prevenirInyeccionCodigo, esPassSegura, validName, validEmail, catchAsync, response, generarHashpass, ClientError } = require('../utils/indexUtils')

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
    const passSegura=generarHashpass(req.body.password);
    const name=req.body.name
    const company= req.body.company
    const cif=req.body.cif
    const phone= req.body.phone
    const email=req.body.email
    const pass=await passSegura
    const type=req.body.type

    const {rowCount}= await executeSQLfromQuery(`INSERT INTO users (name, company, CIF, phone, email, password, type) VALUES ('${name}', '${company}', '${cif}', '${phone}', '${email}', '${pass}', '${type}');`)
    // Enviar el usuario guardado como respuesta
    response(res, 200, rowCount)
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
    // const id = req.params.id;
    // const userDelete = await User.deleteOne({_id:id});
    // response(res, 200, userDelete);
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
}

module.exports = {
    //gestiono los errores con catchAsync
    postCreateUser:catchAsync(postCreateUser),
    getUsers:catchAsync(getUsers),
    getUserID:catchAsync(getUserID),
    UserDeleteId:catchAsync(UserDeleteId),
    updateUserId:catchAsync(updateUserId)
}
