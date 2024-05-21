const {
  catchAsync,
  response,
  ClientError,
  comprobarPass,
  generarToken,
  verificarToken,
} = require("../utils/indexUtils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool, executeSQLfromQuery } = require("../database/db");

//comprueba un usuario
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
   // Validación de entrada
  if (!email || !password) {
      return response(res, 400, { message: 'Email and password are required' });
  }
  // Consulta SQL para obtener el usuario por email
  const query = `SELECT * FROM USERS WHERE email='${email}'`;
  const { rows } = await executeSQLfromQuery(query);

  if (rows.length === 0) {
    return response(res, 401, { message: "Invalid email or password" });
  }
  const user = rows[0];

  // Verificar la contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return response(res, 401, { message: "Invalid password" });
  }
  // Generar un token (por ejemplo, JWT)
  const token = jwt.sign(
    { id: user.id, email: user.email, type:user.type },
    process.env.JWT,
    { expiresIn: "24h" }
  );

  // Enviar la respuesta con el token
  response(res, 200, { message: "Login successful", token });

  // // Utiliza el método findOne() de Mongoose para obtener 1 usuario
  // const usuario = await User.findOne({ email: emailAux});
  // if(usuario == null) throw new ClientError("El nombre no es correcto", 403);
  // if (!await comprobarPass(passAux, usuario.pass)) throw new ClientError("La contraseña no es correcta", 403);
  // const token = await generarToken(usuario)
  // // Responde con la lista de usuario + el token generado y código de estado 200 (OK)
  // const respuesta={usuario,token}
  // response(res, 200, respuesta);
};

const validToken = async (req, res) => {
   const token=req.body.token
  if(verificarToken(token)){
      const id=jwt.decode(token).id
      const {rows} = await executeSQLfromQuery(`SELECT * FROM USERS WHERE id=${id}`);
      
      if(rows.length >0){
        response(res,200,true)
      }else{
         response(res,200,false)
      }
     
  } else{
      throw new ClientError("El token no es correcto o a expirado", 403);
  }
};

const pruebaBBDD = async (req, res) => {
  // const token=req.body.token
  // if(verificarToken(token)){
  //     const id=jwt.decode(token)._id
  //     const usuario = await User.findOne({ _id: id});
  //     response(res,200,usuario)
  // } else{
  //     throw new ClientError("El token no es correcto o a expirado", 403);
  // }
  const resultado = await pool.query("SELECT NOW()");
  console.log(resultado);
  response(res, 200, resultado);
};

module.exports = {
  //gestiono los errores con catchAsync
  login: catchAsync(login),
  validToken: catchAsync(validToken),
  pruebaBBDD: catchAsync(pruebaBBDD),
};
