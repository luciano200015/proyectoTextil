import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../Pages/login'
import App from '../App'
import AccessDenied from '../Pages/login/accesodenaegado'
import { ResponsiveAppBar } from '../Componentns/ResponsiveAppBar'
import {
  CreatePersona, ListaPersonas, UpdatePersona, CreatePersonas, UpdatePersonas,
  ListaProveedores, UpdateProveedor, CreateProveedor,
  CreateCliente, UpdateCliente, ListaCliente,
  ListaTipoMaterioPrima, CreateTipoMateriaPrima, UpdateTipoMateriaPrima,
  CreateMateriaPrima, ListaMateriPrima, UpdateMateriaPrima,
  CreateCompraMateriaPrima, ListaCompraMateriaPrima, ListaDetalleCompraMateriaPrima,
  ListaTipoProducto, CreateTipoProducto, UpdateTipoProducto,
  CreateTalla, UpdateTalla, ListaTalla,
  CreateModelo, UpdateModelo, ListaModelo,
  CreateProducto, UpdateProducto, ListaProducto,
  CreateVenta, ListaVenta, DetalleVenta,
  CreatePedido, DetallePedido, ListaPedido
} from '../Pages'
import { ProtectedRoute } from '../context/ProtectedRoute'


export const AppRouter = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ marginTop: `100px` }}>
        <Routes>
          <Route path="/" element={<App />} />

          {/*login y registro*/}
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path="/access-denegado" element={<AccessDenied />} />

          {/**/}
          <Route path="/createpersona" element={<ProtectedRoute><CreatePersona/></ProtectedRoute>}/>
          <Route path="/listaspersonas" element={<ProtectedRoute><ListaPersonas /></ProtectedRoute>} />
          <Route path="/updatepersonal/:id" element={<ProtectedRoute><UpdatePersona /></ProtectedRoute>} />
          
          {/**/}
          <Route path="/createcliente" element={<ProtectedRoute><CreateCliente /></ProtectedRoute>}/>
          <Route path="/listascliente" element={<ProtectedRoute><ListaCliente /></ProtectedRoute>} />
          <Route path="/updatecliente/:id" element={<ProtectedRoute><UpdateCliente /></ProtectedRoute>}/>

          {/**/}
          <Route path="/createproveedor" element={<ProtectedRoute><CreateProveedor /></ProtectedRoute>}/>
          <Route path="/listasproveedor" element={<ProtectedRoute><ListaProveedores /></ProtectedRoute>} />
          <Route path="/updateproveedor/:id" element={<ProtectedRoute><UpdateProveedor /></ProtectedRoute>}/>



          {/**/}
          <Route path="/createtipomateriaprima" element={<CreateTipoMateriaPrima />} />
          <Route path="/listastipomateriaprima" element={<ListaTipoMaterioPrima />} />
          <Route path="/updatetipomateriaprima/:id" element={<UpdateTipoMateriaPrima />} />

          {/**/}
          <Route path="/listasmateriaprima" element={<ListaMateriPrima />} />
          <Route path="/createMateriaPrima" element={<CreateMateriaPrima />} />
          <Route path="/updatemateriaprima/:id" element={<UpdateMateriaPrima />} />

          {/**/}
          <Route path="/createcompramateriaprima" element={<CreateCompraMateriaPrima />} />
          <Route path="/listacompramateriaprima" element={<ListaCompraMateriaPrima />} />
          <Route path="/listadetallecompramateriaprima/:id/:personal/:proveedor/:estado" element={<ListaDetalleCompraMateriaPrima />} />

          {/**/}
          <Route path="/createtipoproducto" element={<CreateTipoProducto />} />
          <Route path="/listastipoproducto" element={<ListaTipoProducto />} />
          <Route path="/updatetipoproducto/:id" element={<UpdateTipoProducto />} />

          {/**/}
          <Route path="/createtalla" element={<CreateTalla />} />
          <Route path="/listastalla" element={<ListaTalla />} />
          <Route path="/updatetalla/:id" element={<UpdateTalla />} />

          {/**/}
          <Route path="/createmodelo" element={<CreateModelo />} />
          <Route path="/listasmodelo" element={<ListaModelo />} />
          <Route path="/updatemodelo/:id" element={<UpdateModelo />} />

          {/**/}
          <Route path="/createproducto" element={<CreateProducto />} />
          <Route path="/listaproducto" element={<ListaProducto />} />
          <Route path="/updateproducto/:id" element={<UpdateProducto />} />

          {/**/}
          <Route path="/createventa" element={<CreateVenta />} />
          <Route path="/listaventa" element={<ListaVenta />} />
          <Route path="/detalleventa/:id" element={<DetalleVenta />} />

          {/**/}
          <Route path="/createpedido" element={<CreatePedido />} />
          <Route path="/listapedido" element={<ListaPedido />} />
          <Route path="/detallepedido/:id" element={<DetallePedido />} />

        </Routes>
      </div>

    </>
  )
}
