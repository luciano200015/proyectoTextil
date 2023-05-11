import React from 'react'
import Axios from "axios";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import AlignItemsList from '../../Componentns/Lista';
import { Button } from '@mui/material';
import { AlertDialog } from '../../Componentns/Alertdialog';


export default function ListaProveedores() {
    const [open, setOpen] = useState(false)
    const handleClickOpen = (idMateriaPrima) => {
        setOpen(true);
        setid(idMateriaPrima)

    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const [id, setid] = useState()
    const [Personas, setPersonas] = useState([])

    const getPersonas = () => {
        Axios.get("http://localhost:3001/personas/3").then((response) => {
            setPersonas(response.data);
        });
    };
    const deletePersona = () => {
        Axios.delete(`http://localhost:3001/deletepersona/${id}`)
        const newLista= Personas.filter((lista)=>lista.id !== id)
        setPersonas(newLista);
        setOpen(false)
    };
    useEffect(() => {
        getPersonas();

    }, [])
    return (
        <div className='container mt-5'>
            <div className='row mt-5'>
            <div className='col-md-11 mt-5'>
                <h2>Lista de Proveedores</h2>
                <AlignItemsList data={Personas} url="/updateproveedor/" eliminar={handleClickOpen}/></div>
                <Button variant="outlined" sx={{width:"15rem",marginLeft:"2rem",marginTop:"1rem"}} LinkComponent={Link} to={`/createproveedor`}>Añadir proveedor</Button>

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
