const DB= require("../db")


exports.createTipoMateriaPrima=(req, res) => {
  const descripcion = req.body.descripcion;

  DB.BDdatos.query(
    "INSERT INTO TipoMateriaPrima (descripcion) VALUES (?)",
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


exports.listaTipoMateriaPrima=(req, res) => {
  DB.BDdatos.query("SELECT * FROM TipoMateriaPrima", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.TipoMateriaPrimaId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM TipoMateriaPrima where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}
exports.updateTipoMateriaPrima=(req, res) => {
  const id = req.body.id;
  const descripcion = req.body.descripcion;

  DB.BDdatos.query(
    "UPDATE TipoMateriaPrima SET descripcion = ? WHERE id = ?",
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

exports.deleteTipoMateriaPrima=(req, res) => {
  const id = req.params.id;
  DB.BDdatos.query("DELETE FROM TipoMateriaPrima WHERE id = ?", id, (err, result) => {
    if (err) {
      res.send("error al eliminar");
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

