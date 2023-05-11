const DB= require("../db")
exports.createDetallePedido=(req, res) => {
  const cantidad = req.body.cantidad;
  const precio=req.body.precio;
  const idPedido=req.body.idPedido;
  const idProducto=req.body.idProducto
  DB.BDdatos.query(
    "INSERT INTO DetallePedido (cantidad,precio,idPedido,idProducto) VALUES (?,?,?,?)",
    [cantidad,precio,idPedido,idProducto],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}


exports.listaDetallePedido=(req, res) => {
  DB.BDdatos.query("SELECT * FROM DetallePedido", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.DetallePedidoId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM DetallePedido where idPedido = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

