const jwt=require('jsonwebtoken')
require('dotenv').config()

const generarToken=async (user)=>{
    const token= jwt.sign(
        {
            _id:user._id,
            type:user.type
        },
        process.env.JWT,
        {
           expiresIn: "24h"
        }
    )
    return token
}

const verificarToken=async(token)=>{
    try {
        return jwt.verify(token, process.env.JWT)
    } catch (error) {
        return null
    }
}

const decodeToken=async(token)=>{
    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}


module.exports={
    generarToken,
    verificarToken,
    decodeToken

  };