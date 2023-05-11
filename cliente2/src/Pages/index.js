//personal
import { CreatePersona } from "./Persona/CreatePersona";
import {ListaPersonas} from "./Persona/ListaPersonas";
import { UpdatePersona } from "./Persona/UpdatePerson";
import { CreatePersonas } from "./Per-sona/CreatePersona";
import { UpdatePersonas } from "./Per-sona/UpdatePerson";

//proveedor
import { CreateProveedor } from "./Proveedor/CreateProveedor";
import { UpdateProveedor } from "./Proveedor/UpdateProveedor";
import ListaProveedores from "./Proveedor/ListaProveedores";

//cliente
import {CreateCliente} from"./Cliente/CreateCliente"
import {UpdateCliente} from"./Cliente/UpdateCliente"
import { ListaCliente } from "./Cliente/ListaCliente";

///Tipo Materia Prima
import { CreateTipoMateriaPrima } from "./TipoMateriaPrima/CreateTipoMateriaPrima";
import { UpdateTipoMateriaPrima } from "./TipoMateriaPrima/UpdateTipoMateriaPrima";
import { ListaTipoMaterioPrima } from "./TipoMateriaPrima/ListaTipoMateriaPrima";

//Materia Prima
import { CreateMateriaPrima } from "./MateriaPrima/CreateMateriaPrima";
import { ListaMateriPrima } from "./MateriaPrima/ListaMateriaPrima";
import { UpdateMateriaPrima } from "./MateriaPrima/UpdateMateriaPrima";

//Compra de materia prima
import {CreateCompraMateriaPrima}from'./CompraMateriaPrima/CreateCompraMateriaPrima'
import { ListaCompraMateriaPrima } from "./CompraMateriaPrima/ListaCompraMateriaPrima";
import { ListaDetalleCompraMateriaPrima } from "./CompraMateriaPrima/DetalleCompraMateriaPrima";

//tipo producto
import { ListaTipoProducto } from "./TipoProducto/ListaTipoProducto";
import { CreateTipoProducto } from "./TipoProducto/CreateTipoProducto";
import { UpdateTipoProducto } from "./TipoProducto/UpdateTipoProducto";

//Talla producto
import { CreateTalla } from "./Talla/CreateTalla";
import { UpdateTalla } from "./Talla/UpdateTalla";
import { ListaTalla } from "./Talla/ListaTalla";

//modelo producto
import { CreateModelo } from "./Modelo/CreateModelo";
import { UpdateModelo } from "./Modelo/UpdateModelo";
import { ListaModelo } from "./Modelo/ListaModelo";

//producto
import { CreateProducto } from "./producto/CreateProducto";
import { ListaProducto } from "./producto/ListaProducto";
import { UpdateProducto } from "./producto/UpdateProducto";

//ventario
import { CreateVenta } from "./Venta/CreateVenta";
import { ListaVenta } from "./Venta/ListaVenta";
import{ DetalleVenta } from "./Venta/DetalleVenta";
//pedido
import {CreatePedido} from "./Pedido/CreatePedido";
import {DetallePedido} from "./Pedido/DetallePedido";
import { ListaPedido } from "./Pedido/ListaPedido";

export {
    //personal
    CreatePersona,ListaPersonas,UpdatePersona,CreatePersonas,UpdatePersonas,
    //proveedor
    ListaProveedores,UpdateProveedor,CreateProveedor,
    //cliente
    ListaCliente,CreateCliente,UpdateCliente,
    //Tipo de materia prima
    ListaTipoMaterioPrima,CreateTipoMateriaPrima,UpdateTipoMateriaPrima,
    //Materia Prima
    CreateMateriaPrima,ListaMateriPrima,UpdateMateriaPrima,
    //compra materia prima
    CreateCompraMateriaPrima,
    ListaCompraMateriaPrima,
    ListaDetalleCompraMateriaPrima,
    //tipo producto
    ListaTipoProducto,CreateTipoProducto,UpdateTipoProducto,
    //Talla producto
    CreateTalla,UpdateTalla,ListaTalla,
    //modelo producto
    CreateModelo,UpdateModelo,ListaModelo,
    //producto
    CreateProducto,UpdateProducto,ListaProducto,
    //vent
    CreateVenta,ListaVenta,DetalleVenta,
    //Pedido
    CreatePedido,DetallePedido,ListaPedido,

}


