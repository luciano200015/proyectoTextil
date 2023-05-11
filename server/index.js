const express = require("express");
const app = express();
const cors = require("cors");
//materia prima
const dbTipoMateriaPrima=require('./HelpersDb/MateriaPrima/TipoMateriaPrima')
const dbMateriaPrima=require("./HelpersDb/MateriaPrima/MateriaPrima")
const dbCompraMateriaPrima=require("./HelpersDb/ComprasMateria/compramateriaprima")
const dbCompraDetalleMateriaPrima=require("./HelpersDb/ComprasMateria/detallecompramateriaprima")

//proveedor,Cliente,Personal
const dbPersona=require("./HelpersDb/Persona/persona")

//Producto
const dbTipoProducto=require("./HelpersDb/Producto/TipoProducto")
const dbTalla=require("./HelpersDb/Producto/Talla")
const dbModelo=require("./HelpersDb/Producto/Modelo")

const dbProducto=require("./HelpersDb/Producto/Producto")

const dbVenta=require("./HelpersDb/Venta/createventa")
const dbPago=require("./HelpersDb/Venta/pago")
const dbDetalleVenta=require("./HelpersDb/Venta/detalleventa")
const dbpedido=require("./HelpersDb/pedido/createpedido")
const dbDetallepedido=require("./HelpersDb/pedido/detallepedido")

//login8
const dbLogin=require('./HelpersDb/auth/login')




app.use(cors());
app.use(express.json());


////Tipo Materia Prima
app.post("/createtipomateriaprima",dbTipoMateriaPrima.createTipoMateriaPrima);
app.get("/tipomateriaprima", dbTipoMateriaPrima.listaTipoMateriaPrima);
app.get("/tipomateriaprima/:id", dbTipoMateriaPrima.TipoMateriaPrimaId);
app.put("/updatetipomateriaprima", dbTipoMateriaPrima.updateTipoMateriaPrima);
app.delete("/deletetipomateriaprima/:id", dbTipoMateriaPrima.deleteTipoMateriaPrima);


//materia prima
app.post("/createmateriaprima",dbMateriaPrima.createMateriaPrima);
app.get("/materiaprima", dbMateriaPrima.listaMateriaPrima);
app.get("/materiaprimainactivo", dbMateriaPrima.listaMateriaPrimaInactivo);
app.get("/materiaprima/:id", dbMateriaPrima.MateriaPrimaId);
app.put("/updatemateriaprima", dbMateriaPrima.updateMateriaPrima);
app.delete("/deletemateriaprima/:id", dbMateriaPrima.deleteMateriaPrima);

//compra materia prima
app.post("/createcompramateriaprima",dbCompraMateriaPrima.createCompraMateriaPrima);
app.get("/compramateriaprima", dbCompraMateriaPrima.listaCompraMateriaPrima);
app.get("/compramateriaprimaorden", dbCompraMateriaPrima.listaCompraMateriaPrimaOrden);
app.get("/compramateriaprimacancelada", dbCompraMateriaPrima.listaCompraMateriaPrimaCanceladas);
app.get("/compramateriaprima/:id", dbCompraMateriaPrima.CompraMateriaPrimaId);
app.put("/updatecompramateriaprima", dbCompraMateriaPrima.updateCompraMateriaPrima);
app.delete("/deletecompramateriaprima/:id", dbCompraMateriaPrima.deleteCompraMateriaPrima);
app.delete("/completarcompramateriaprima/:id", dbCompraMateriaPrima.completarCompraMateriaPrima);



//detalle compra materia prima
app.post("/createdetallecompramateriaprima",dbCompraDetalleMateriaPrima.createDetalleCompraMateriaPrima);
app.get("/detallecompramateriaprima", dbCompraDetalleMateriaPrima.listaDetalleCompraMateriaPrima);
app.get("/detallecompramateriaprima/:id", dbCompraDetalleMateriaPrima.DetalleCompraMateriaPrimaId);
app.put("/updatedetallecompramateriaprima", dbCompraDetalleMateriaPrima.updateDetalleCompraMateriaPrima);
app.delete("/deletedetallecompramateriaprima/:id", dbCompraDetalleMateriaPrima.deleteDetalleCompraMateriaPrima);

//Persona
app.post("/createpersona",dbPersona.createPersona);
app.get("/personas/:id", dbPersona.listaPersona);
app.get("/detallepersona/:id", dbPersona.PersonaId);
app.get("/tipopersona", dbPersona.TipoPersona);
app.put("/updatepersona", dbPersona.updatePersona);
app.delete("/deletepersona/:id", dbPersona.deletePersona);

//tipo de producto
app.post("/createtipoproducto",dbTipoProducto.createTipoProducto);
app.get("/tipoproducto", dbTipoProducto.listaTipoProducto);
app.get("/tipoproducto/:id", dbTipoProducto.TipoProductoId);
app.put("/updatetipoproducto", dbTipoProducto.updateTipoProducto);
app.delete("/deletetipoproducto/:id", dbTipoProducto.deleteTipoProducto);

//Talla
app.post("/createtalla",dbTalla.createTalla);
app.get("/talla", dbTalla.listaTalla);
app.get("/talla/:id", dbTalla.TallaId);
app.put("/updatetalla", dbTalla.updateTalla);
app.delete("/deletetalla/:id", dbTalla.deleteTalla);

//Modelo
app.post("/createmodelo",dbModelo.createModelo);
app.get("/modelo", dbModelo.listaModelo);
app.get("/modelo/:id", dbModelo.ModeloId);
app.put("/updatemodelo", dbModelo.updateModelo);
app.delete("/deletemodelo/:id", dbModelo.deleteModelo);


//producto
app.post("/createproducto",dbProducto.createProducto);
app.get("/producto", dbProducto.listaProducto);
app.get("/productoinactivo", dbProducto.listaProductoInactivo);
app.get("/producto/:id", dbProducto.ProductoId);
app.put("/updateproducto", dbProducto.updateProducto);
app.delete("/deleteproducto/:id", dbProducto.deleteProducto);

//venta
app.post("/createventa",dbVenta.createVenta);
app.post("/createpago",dbPago.createPago);
app.get("/listaventa",dbVenta.listaVenta);

app.post("/createdetalleventa",dbDetalleVenta.createDetalleVenta);
app.get("/detalleventa/:id",dbDetalleVenta.DetalleVentaId);

app.post("/createpedido",dbpedido.createPedido);
app.get("/listapedido",dbpedido.listaPedido);

app.post("/createdetallepedido",dbDetallepedido.createDetallePedido);
app.get("/detallepedido/:id",dbDetallepedido.DetallePedidoId);


//login
app.post("/loginpersona",dbLogin.loginPersona);

app.listen(3001, () => {
  console.log("El servidor esta corriendo en el puerto 3001");
});
