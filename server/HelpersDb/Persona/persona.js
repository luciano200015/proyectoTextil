const DB= require("../db")




exports.createPersona=(req, res) => {
  const nombre = req.body.nombre;
  const apellidoPaterno=req.body.apellidoPaterno;
  const apellidoMaterno=req.body.apellidoMaterno;
  const carnet=req.body.carnet;
  const direccion = req.body.direccion;
  const correo = req.body.correo;
  const telefono = req.body.telefono;
  const idTipoPersona = req.body.idTipoPersona;
  
  DB.BDdatos.query(
    "INSERT INTO Persona (nombre,apellidoPaterno,apellidoMaterno,carnet,direccion,correo,telefono,idTipoPersona) VALUES (?,?,?,?,?,?,?,?)",
    [nombre, apellidoPaterno,apellidoMaterno,carnet,direccion, correo, telefono,idTipoPersona],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
}


exports.PersonaId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM Persona where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}
exports.listaPersona=(req, res) => {
    const {id}=req.params
    DB.BDdatos.query("SELECT * FROM Persona where idTipoPersona = ?",[id],
     (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
}
exports.updatePersona=(req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const apellidoPaterno=req.body.apellidoPaterno;
  const apellidoMaterno=req.body.apellidoMaterno;
  const carnet=req.body.carnet;
  const direccion = req.body.direccion;
  const correo = req.body.correo;
  const telefono = req.body.telefono;
  const idTipoPersona = req.body.idTipoPersona;

  DB.BDdatos.query(
    "UPDATE Persona SET nombre = ?,apellidoPaterno=?,apellidoMaterno=?,carnet=?,direccion = ?, correo = ?, telefono = ?,idTipoPersona=? WHERE id = ?",
    [nombre, apellidoPaterno,apellidoMaterno,carnet,direccion, correo, telefono,idTipoPersona, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.deletePersona=(req, res) => {
  const id = req.params.id;
  DB.BDdatos.query("DELETE FROM Persona WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.TipoPersona=(req, res) => {
    DB.BDdatos.query("SELECT * FROM TipoPersona", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }