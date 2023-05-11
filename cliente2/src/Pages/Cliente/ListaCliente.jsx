import React from 'react'
import Axios from "axios";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import AlignItemsList from '../../Componentns/Lista';
import { Button ,Typography} from '@mui/material';
import { AlertDialog } from '../../Componentns/Alertdialog';



export const ListaCliente=()=> {
    const [open, setOpen] = useState(false)
    const handleClickOpen = (idMateriaPrima) => {
        setOpen(true);
        setid(idMateriaPrima)

    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const [id, setid] = useState()
    const [Cliente, setCliente] = useState([])

    const getCliente = () => {
        Axios.get("http://localhost:3001/personas/2").then((response) => {
            setCliente(response.data);
        });
    };
    const deletePersona = () => {
        Axios.delete(`http://localhost:3001/deletepersona/${id}`)
        const newLista= Cliente.filter((lista)=>lista.id !== id)
        setCliente(newLista);
        setOpen(false)

    };
    useEffect(() => {
        getCliente();

    }, [])
    return (
        <div className='container mt-5'>
            <div className='row mt-5'>
            <div className='col-md-6 mt-5'>
                <Typography variant="h4" component="h4">
                    Lista de Clientes
                </Typography>
            </div>
            <AlignItemsList data={Cliente} url="/updatecliente/" eliminar={handleClickOpen}/>
            <Button variant="outlined" sx={{width:"15rem",marginLeft:"2rem",marginTop:"1rem"}} LinkComponent={Link} to={`/createcliente`}>Añadir Nuevo cliente</Button>
            </div>
            <AlertDialog title={"Estas Seguro que deses eliminar"} open={open} handleClose={handleClose} Button={
                <>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={deletePersona}>Apcetar</Button>
                </>
            }/>
                
        </div>
    )
}
