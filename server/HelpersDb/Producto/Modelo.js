const DB= require("../db")


exports.createModelo=(req, res) => {
  const descripcion = req.body.descripcion;
  const precio= req.body.precio;

  DB.BDdatos.query(
    "INSERT INTO Modelo (descripcion,precio) VALUES (?,?)",
    [descripcion,precio],
    (err, result) => {
      if (err) {
        res.send("error");
        console.log(err)

      } else {
        res.send("correct");
      }
    }
  );
}


exports.listaModelo=(req, res) => {
  DB.BDdatos.query("SELECT * FROM Modelo", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.ModeloId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM Modelo where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}
exports.updateModelo=(req, res) => {
  const id =parseInt(req.body.id);
  const descripcion = req.body.descripcion;
  const precio=parseInt(req.body.precio);

  DB.BDdatos.query(
    "UPDATE Modelo SET descripcion = ?, precio=? WHERE id = ?",
    [descripcion,precio, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("error")
      } else {
        res.send(result);
      }
    }
  );
};

exports.deleteModelo=(req, res) => {
  const id = req.params.id;
  DB.BDdatos.query("DELETE FROM Modelo WHERE id = ?", id, (err, result) => {
    if (err) {
      res.send("error al eliminar");
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

