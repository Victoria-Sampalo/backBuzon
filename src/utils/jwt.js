// jwt.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function generarToken(user) {
    const token = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        process.env.JWT,
        {
            expiresIn: "24h"
        }
    );
    return token;
}

export async function verificarToken(token) {
    try {
        return jwt.verify(token, process.env.JWT);
    } catch (error) {
        return null;
    }
}
