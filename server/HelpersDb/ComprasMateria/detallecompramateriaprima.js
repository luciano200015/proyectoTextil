const DB= require("../db")
exports.createDetalleCompraMateriaPrima=(req, res) => {
  const cantidad = req.body.cantidad;
  const precio=req.body.precio;
  const estado=req.body.estado;
  const total=req.body.total;
  const idCompra=req.body.idCompra;
  const idMateriaPrima=req.body.idMateriaPrima
  DB.BDdatos.query(
    "INSERT INTO DetalleCompraMateriaPrima (cantidad,precio,estado,total,idCompra,idMateriaPrima) VALUES (?,?,?,?,?,?)",
    [cantidad,precio,estado,total,idCompra,idMateriaPrima],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}


exports.listaDetalleCompraMateriaPrima=(req, res) => {
  DB.BDdatos.query("SELECT * FROM DetalleCompraMateriaPrima", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.DetalleCompraMateriaPrimaId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM DetalleCompraMateriaPrima where idCompra = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
exports.updateDetalleCompraMateriaPrima=(req, res) => {
  const id = req.body.id;
  const cantidad = req.body.cantidad;
  const precio=req.body.precio;
  const estado=req.body.estado;
  const idCompra=req.body.idCompra;
  const idMateriaPrima=req.body.idMateriaPrima
  DB.BDdatos.query(
    "UPDATE DetalleCompraMateriaPrima SET cantidad = ?,precio=?,estado=?,idCompra=?,idMateriaPrima=? WHERE id = ?",
    [cantidad, precio,estado,idCompra,idMateriaPrima,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.deleteDetalleCompraMateriaPrima=(req, res) => {
  const id = req.params.id;
  DB.BDdatos.query("DELETE FROM DetalleCompraMateriaPrima WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

