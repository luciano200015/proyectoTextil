const DB= require("../db")

exports.createPago=(req, res) => {
    const fecha = req.body.fecha;
    const montototal = req.body.montototal;
    const estado=req.body.estado;
    const idVenta = req.body.idVenta;

  DB.BDdatos.query(
    "INSERT INTO Pago (fecha,montototal,estado,idVenta) VALUES (?,?,?,?)",
    [fecha,montototal,estado,idVenta],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        return res.send(result);
        
      }
    }
  );
}

exports.listaPago=(req, res) => {
  DB.BDdatos.query("SELECT * FROM Pago", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.PagoId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM Pago where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}


