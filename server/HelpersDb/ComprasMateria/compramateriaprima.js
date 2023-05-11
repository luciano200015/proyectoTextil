const DB= require("../db")

exports.createCompraMateriaPrima=(req, res) => {
  const fecha = req.body.fecha;
  const estado=req.body.estado;
  const total=req.body.total;
  const idPersonal=req.body.idPersonal;
  const idProveedor=req.body.idProveedor


  DB.BDdatos.query(
    "INSERT INTO CompraMateriaPrima (fecha,estado,total,idPersonal,idProveedor) VALUES (?,?,?,?,?)",
    [fecha,estado,total,idPersonal,idProveedor],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        return res.send(result);
        
      }
    }
  );
}


exports.listaCompraMateriaPrima=(req, res) => {
  DB.BDdatos.query("SELECT * FROM CompraMateriaPrima where estado='1'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
exports.listaCompraMateriaPrimaOrden=(req, res) => {
  DB.BDdatos.query("SELECT * FROM CompraMateriaPrima where estado='2'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
exports.listaCompraMateriaPrimaCanceladas=(req, res) => {
  DB.BDdatos.query("SELECT * FROM CompraMateriaPrima where estado='0'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.CompraMateriaPrimaId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM CompraMateriaPrima where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}
exports.updateCompraMateriaPrima=(req, res) => {
  const id = req.body.id;
  const fecha = req.body.fecha;
  const estado=req.body.estado;
  const idPersonal=req.body.idPersonal;
  const idProveedor=req.body.idProveedor;

  DB.BDdatos.query(
    "UPDATE CompraMateriaPrima SET fecha = ?,estado=?,idPersonal=?,idProveedor=? WHERE id = ?",
    [fecha, estado,idPersonal,idProveedor,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.deleteCompraMateriaPrima=(req, res) => {
  const id =parseInt( req.params.id);
  DB.BDdatos.query("UPDATE CompraMateriaPrima SET estado='0' WHERE id = ?", id, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
exports.completarCompraMateriaPrima=(req, res) => {
  const id = parseInt(req.params.id);
  DB.BDdatos.query("UPDATE CompraMateriaPrima SET estado='1' WHERE id = ?", id, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

