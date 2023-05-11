const DB= require("../db")


exports.createMateriaPrima=(req, res) => {
  const nombre = req.body.nombre;
  const stock=req.body.stock;
  const stockminimo=req.body.stockminimo;
  const estado=req.body.estado;
  const idTipoMateriaPrima=req.body.idTipoMateriaPrima

  DB.BDdatos.query(
    "INSERT INTO MateriaPrima (nombre,stock,stockminimo,estado,idTipoMateriaPrima) VALUES (?,?,?,?,?)",
    [nombre,stock,stockminimo,estado,idTipoMateriaPrima],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
}


exports.listaMateriaPrima=(req, res) => {
  DB.BDdatos.query("SELECT * FROM MateriaPrima where estado='1'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
exports.listaMateriaPrimaInactivo=(req, res) => {
  DB.BDdatos.query("SELECT * FROM MateriaPrima where estado='0'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.MateriaPrimaId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM MateriaPrima where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}
exports.updateMateriaPrima=(req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const stock=req.body.stock;
  const stockminimo=req.body.stockminimo;
  const estado=req.body.estado;
  const idTipoMateriaPrima=req.body.idTipoMateriaPrima;

  DB.BDdatos.query(
    "UPDATE MateriaPrima SET nombre = ?,stock=?,stockminimo=?,estado=?,idTipoMateriaPrima=? WHERE id = ?",
    [nombre, stock,stockminimo,estado,idTipoMateriaPrima,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.deleteMateriaPrima=(req, res) => {
  const id = req.params.id;
  DB.BDdatos.query("UPDATE MateriaPrima SET estado='0' WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

