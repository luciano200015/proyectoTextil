import React from 'react'
import Axios from "axios";
import { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container,Grid,Typography } from '@mui/material';
import { BasicTable } from '../../Componentns/TablaDetalle';
import Button from '@mui/material/Button';

export const ListaDetalleCompraMateriaPrima = () => {
    const {id,personal,proveedor,estado}=useParams()
    const [DetallesCompra, setDetallesCompra] = useState([])
    const navigate=useNavigate()
   
    const getDetalleCompra = async() => {
        const lista =await Axios.get(`http://localhost:3001/detallecompramateriaprima/${id}`);

        const newlista=[]
        for(const op of lista.data){
            console.log(await Axios.get(`http://localhost:3001/materiaprima/${op.idMateriaPrima}`).then((res)=>res.data.nombre))
            newlista.push({...op,id:op.id,
            idMateriaPrima:await Axios.get(`http://localhost:3001/materiaprima/${op.idMateriaPrima}`).then((res)=>res.data.nombre)
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
                        Detalle de compra
                    </Typography>
                </Grid>
                <Grid item  xs={12}>
                    <Typography variant="h5" component="h5">
                        PERSONAL: {personal}
                    </Typography>
                </Grid>
                <Grid item  xs={12}>
                    <Typography variant="h5" component="h5">
                        PROVEEDOR: {proveedor}
                    </Typography>
                </Grid>
                <Grid item  xs={24}>
                    <BasicTable data={DetallesCompra}/>
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