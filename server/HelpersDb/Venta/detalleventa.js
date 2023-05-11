const DB= require("../db")
exports.createDetalleVenta=(req, res) => {
  const cantidad = req.body.cantidad;
  const precio=req.body.precio;
  const idVenta=req.body.idVenta;
  const idProducto=req.body.idProducto
  DB.BDdatos.query(
    "INSERT INTO DetalleVenta (cantidad,precio,idVenta,idProducto) VALUES (?,?,?,?)",
    [cantidad,precio,idVenta,idProducto],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}


exports.listaDetalleVenta=(req, res) => {
  DB.BDdatos.query("SELECT * FROM DetalleVenta", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.DetalleVentaId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM DetalleVenta where idVenta = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

