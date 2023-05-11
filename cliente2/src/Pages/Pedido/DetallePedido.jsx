import React from 'react'
import Axios from "axios";
import { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container,Grid,Typography ,TableHead,TableRow,TableCell,TableBody,Table,TableContainer,Paper} from '@mui/material';
import { BasicTable } from '../../Componentns/TablaDetalle';
import Button from '@mui/material/Button';

export const DetallePedido = () => {
    const {id,personal,proveedor,estado}=useParams()
    const [DetallesCompra, setDetallesCompra] = useState([])
    const navigate=useNavigate()
   
    const getDetalleCompra = async() => {
        const lista =await Axios.get(`http://localhost:3001/detalleventa/${id}`);

        const newlista=[]
        for(const op of lista.data){
            
            newlista.push({...op,id:op.id,
            idProducto:await Axios.get(`http://localhost:3001/producto/${op.idProducto}`).then((res)=>res.data.descripcion)
            })
        }
        setDetallesCompra(newlista)
        console.log(DetallesCompra)
    };
    const eliminar= () => {
        Axios.delete(`http://localhost:3001/deletecompramateriaprima/${id}`)
        return navigate("/listacompramateriaprima")
    };
    const completarCompra= () => {
        Axios.delete(`http://localhost:3001/completarcompramateriaprima/${id}`)
        return navigate("/listacompramateriaprima")
    };
    useEffect(() => {
        getDetalleCompra();
    }, [])
    return (
        <Container maxWidth="xl" sx={{marginTop:"6rem",alignContent:'center',alignItems:'center'}}>
            <Grid container spacing={1} columns={24}>
                <Grid item  xs={24}>
                    <Typography variant="h4" component="h4">
                        Detalle de Venta
                    </Typography>
                </Grid>
                
                <Grid item  xs={12}>
                    <Typography variant="h5" component="h5">
                        Cliente: Arlet
                    </Typography>
                </Grid>
                <Grid item  xs={24}>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Descripcion</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio U.</TableCell>
            <TableCell align="right">Total</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {DetallesCompra.map((row,id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idProducto}
              </TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
              <TableCell align="right">{row.precio}</TableCell>
              <TableCell align="right">{row.cantidad*row.precio}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </Grid>
                {estado==="2"&&<>
                <Grid item  xs={4}>
                    <Button variant="contained" onClick={completarCompra} color='success'>Realizar Compra</Button>
                </Grid>
                <Grid item  xs={4}>
                    <Button variant="contained" color='error' onClick={eliminar}>Cancelar orden</Button>
                </Grid></>}
                {estado==="1"&&<>
                <Grid item  xs={4}>
                    <Button variant="contained" color='error' onClick={eliminar}>Cancelar Compra</Button>
                </Grid></>}
            </Grid>
            
            
        </Container>
    )
}