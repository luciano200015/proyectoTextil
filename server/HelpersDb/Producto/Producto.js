const DB= require("../db")


exports.createProducto=(req, res) => {
  const descripcion = req.body.descripcion;
  const stock=req.body.stock;
  const estado=req.body.estado;
  const idTalla=req.body.idTalla;
  const idModelo=req.body.idModelo;
  const idTipoProducto=req.body.idTipoProducto;

  DB.BDdatos.query(
    "INSERT INTO Producto (descripcion,stock,estado,idTalla,idModelo,idTipoProducto) VALUES (?,?,?,?,?,?)",
    [descripcion,stock,estado,idTalla,idModelo,idTipoProducto],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
}


exports.listaProducto=(req, res) => {
  DB.BDdatos.query("SELECT * FROM Producto where estado='1'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}
exports.listaProductoInactivo=(req, res) => {
  DB.BDdatos.query("SELECT * FROM Producto where estado='0'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

exports.ProductoId=(req, res) => {
  const {id}=req.params
  DB.BDdatos.query("SELECT * FROM Producto where id = ?",[id],
   (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}
exports.updateProducto=(req, res) => {
  const id = req.body.id;
  const descripcion = req.body.descripcion;
  const stock=req.body.stock;
  const estado=req.body.estado;
  const idTalla=req.body.idTalla;
  const idModelo=req.body.idModelo;
  const idTipoProducto=req.body.idTipoProducto;

  DB.BDdatos.query(
    "UPDATE Producto SET descripcion = ?,stock=?,estado=?,idTalla=?,idModelo=?,idTipoProducto=? WHERE id = ?",
    [descripcion, stock,estado,idTalla,idModelo,idTipoProducto,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.deleteProducto=(req, res) => {
  const id = req.params.id;
  DB.BDdatos.query("UPDATE Producto SET estado='0' WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

