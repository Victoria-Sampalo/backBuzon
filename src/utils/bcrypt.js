// bcrypt.js
import bcrypt from 'bcrypt';

// Función para hacer el hash de una contraseña
export async function generarHashpass(contraseña) {
  const saltRounds = 10;

  try {
    // Generar un salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Generar el hash de la contraseña utilizando el salt
    const hash = await bcrypt.hash(contraseña, salt);
    return hash;
    
  } catch (error) {
    throw new Error('Error al generar el Hash');
  }
}

export async function comprobarPass(passUno, passDos) {
  return bcrypt.compare(passUno, passDos);
}