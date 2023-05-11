const DB= require("../db")
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey);


exports.loginPersona = (req, res) => {
  const id = req.body.id;
  const correo = req.body.correo;
  DB.BDdatos.query("SELECT * FROM persona WHERE correo = ? AND id = ?", [correo, id], (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      if(result.length > 0) {
        // Crear un token usando el id del usuario y correo
        const token = jwt.sign({ id, correo }, secretKey, {
          expiresIn: '1h' // el token expira en 1 hora
        });

        // Devolver el token y el usuario
        return res.json({
          user: result[0],
          token:token
        });
      } else {
        return res.status(401).json({message: "Usuario no encontrado"});
      }
    }
  });
}

  





