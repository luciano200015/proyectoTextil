const DB= require("../db")

exports.createVenta=(req, res) => {
  const fecha = req.body.fecha;
  const montototal = req.body.montototal;

  DB.BDdatos.query(
    "INSERT INTO Venta (fecha,montototal) VALUES (?,?)",
    [fecha,montototal],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        
        return res.send(result);
        
      }
    }
  );
}


exports.listaVenta=(req, res) => {
  DB.BDdatos.query("SELECT * FROM Venta", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.VentaId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM Venta where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}


