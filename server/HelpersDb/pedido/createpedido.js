const DB= require("../db")

exports.createPedido=(req, res) => {
  const fecha = req.body.fecha;
  const fechaEntrega = req.body.fecha;
  const montototal = req.body.montototal;

  DB.BDdatos.query(
    "INSERT INTO Pedido (fecha,fechaEntrega,montototal) VALUES (?,?,?)",
    [fecha,fechaEntrega,montototal],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        return res.send(result);
        
      }
    }
  );
}


exports.listaPedido=(req, res) => {
  DB.BDdatos.query("SELECT * FROM Pedido", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.PedidoId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM Pedido where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}


