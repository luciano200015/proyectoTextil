const DB= require("../db")


exports.createTipoProducto=(req, res) => {
  const descripcion = req.body.descripcion;

  DB.BDdatos.query(
    "INSERT INTO TipoProducto (descripcion) VALUES (?)",
    [descripcion],
    (err, result) => {
      if (err) {
        res.send("error");

      } else {
        res.send("correct");
      }
    }
  );
}


exports.listaTipoProducto=(req, res) => {
  DB.BDdatos.query("SELECT * FROM TipoProducto", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.TipoProductoId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM TipoProducto where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}
exports.updateTipoProducto=(req, res) => {
  const id = req.body.id;
  const descripcion = req.body.descripcion;

  DB.BDdatos.query(
    "UPDATE TipoProducto SET descripcion = ? WHERE id = ?",
    [descripcion, id],
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

exports.deleteTipoProducto=(req, res) => {
  const id = req.params.id;
  DB.BDdatos.query("DELETE FROM TipoProducto WHERE id = ?", id, (err, result) => {
    if (err) {
      res.send("error al eliminar");
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

