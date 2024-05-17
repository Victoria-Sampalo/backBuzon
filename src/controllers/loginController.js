
const {catchAsync, response, ClientError, comprobarPass, generarToken, verificarToken} = require('../utils/indexUtils')
const jwt=require('jsonwebtoken')
const {pool} = require('../database/db')


//comprueba un usuario
const login= async (req,res)=>{
    // const emailAux=req.body.email
    // const passAux=req.body.pass
    // // Utiliza el método findOne() de Mongoose para obtener 1 usuario
    // const usuario = await User.findOne({ email: emailAux});
    // if(usuario == null) throw new ClientError("El nombre no es correcto", 403);
    // if (!await comprobarPass(passAux, usuario.pass)) throw new ClientError("La contraseña no es correcta", 403);
    // const token = await generarToken(usuario)
    // // Responde con la lista de usuario + el token generado y código de estado 200 (OK)
    // const respuesta={usuario,token}
    // response(res, 200, respuesta);
}

const validToken=async(req,res)=>{
    // const token=req.body.token
    // if(verificarToken(token)){
    //     const id=jwt.decode(token)._id
    //     const usuario = await User.findOne({ _id: id});
    //     response(res,200,usuario)
    // } else{
    //     throw new ClientError("El token no es correcto o a expirado", 403);
    // }
    

}

const pruebaBBDD=async(req,res)=>{
    // const token=req.body.token
    // if(verificarToken(token)){
    //     const id=jwt.decode(token)._id
    //     const usuario = await User.findOne({ _id: id});
    //     response(res,200,usuario)
    // } else{
    //     throw new ClientError("El token no es correcto o a expirado", 403);
    // }
    const resultado=await pool.query('SELECT NOW()')
    console.log(resultado)
    response(res, 200, resultado)

}


module.exports = {
    //gestiono los errores con catchAsync
    login:catchAsync(login),
    validToken:catchAsync(validToken),
    pruebaBBDD:catchAsync(pruebaBBDD)
}