
const {catchAsync, response, ClientError, comprobarPass, generarToken, verificarToken} = require('../utils/indexUtils')

//comprueba un usuario
const tokenValid= async (req, res, next)=>{
    let token=null;
    let verificacion=null
    try {
        token=req.headers.authorization.split(' ')[1];
        verificacion=await verificarToken(token);
        if(verificacion==null) res.status(409).send({error:true, message: "El token no es valido"});
        next();
    } catch (error) {
        res.status(409).send({error:true, message: "El token no es valido"})
    }
    
}

const tokenValidAdmin=async (req, res, next)=>{
    let token=null;
    let verificacion=null
    try {
        token=req.headers.authorization.split(' ')[1];
        verificacion=await verificarToken(token);
        console.log(token) 
        console.log(verificacion.type)
        if(verificacion==null) res.status(409).send({error:true, message: "El token no es valido, pero pasa bien"});
       
        if(verificacion.type=='admin') next();
        else res.status(409).send({error:true, message: "El usuario no está autorizado"})
    } catch (error) {
        res.status(409).send({error:true, message: "El token no es valido"})
    }
}



module.exports = {
    //gestiono los errores con catchAsync
    tokenValid,
    tokenValidAdmin
}