const DB= require("../db")


exports.createTalla=(req, res) => {
  const descripcion = req.body.descripcion;

  DB.BDdatos.query(
    "INSERT INTO Talla (descripcion) VALUES (?)",
    [descripcion],
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


exports.listaTalla=(req, res) => {
  DB.BDdatos.query("SELECT * FROM Talla", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.TallaId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM Talla where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}
exports.updateTalla=(req, res) => {
  const id = req.body.id;
  const descripcion = req.body.descripcion;

  DB.BDdatos.query(
    "UPDATE Talla SET descripcion = ? WHERE id = ?",
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

exports.deleteTalla=(req, res) => {
  const id = req.params.id;
  DB.BDdatos.query("DELETE FROM Talla WHERE id = ?", id, (err, result) => {
    if (err) {
      res.send("error al eliminar");
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

