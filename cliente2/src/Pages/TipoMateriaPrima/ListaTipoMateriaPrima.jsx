import Axios from "axios";
import React,{ useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ListaTipoMateriaPrima } from '../../Componentns/ListaTipoMateriaPrima';
import { AlertDialog } from '../../Componentns/Alertdialog';
import AlertComponent from "../../Componentns/Alert";


export const ListaTipoMaterioPrima=()=> {
    const [open, setOpen] = useState(false)
    
    const [errorEliminar, seterrorEliminar] = useState(false)
    const handleClickOpen = (idMateriaPrima) => {
        setOpen(true);
        setid(idMateriaPrima)

    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const [id, setid] = useState()
    const [TipoMateriaPrima, setTipoMateriaPrima] = useState([])

    const getTipoMateriaPrima = () => {
        Axios.get("http://localhost:3001/tipomateriaprima").then((response) => {
            setTipoMateriaPrima(response.data);
        });
    };
    const deleteTipoMPrima = async() => {
        const response=await Axios.delete(`http://localhost:3001/deletetipomateriaprima/${id}`)
        if (response.data==="error al eliminar") {
            seterrorEliminar(true)
        } else {
            const newLista= TipoMateriaPrima.filter((lista)=>lista.id !== id)
            setTipoMateriaPrima(newLista);
            seterrorEliminar(false)
        }
        
        setOpen(false)
    };
    useEffect(() => {
        getTipoMateriaPrima();

    }, [])
    return (
        <div className='container mt-5'>
            <div className='row mt-5'>
                <div className='col-md-6 mt-5'><h2>Lista Tipo de Materia Prima</h2></div>
                
                <AlertComponent message={"error al eliminar" } error={errorEliminar} seterror={seterrorEliminar} severity="error"/>
                
                <div className='col-md-8 '>
                    <ListaTipoMateriaPrima TipoMateriaPrima={TipoMateriaPrima} eliminar={handleClickOpen} urlupdate="updatetipomateriaprima"/>
                </div>
                <br/>
                <div className='col-md-8'>
                    <Button variant="outlined" sx={{width:"15rem",marginTop:"1rem"}} component={Link} to={`/createtipomateriaprima`}>Añadir Nuevo Tipo</Button>
                </div>

            </div>
            <AlertDialog title={"Estas Seguro que deses eliminar"} open={open} handleClose={handleClose} Button={
                <>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={deleteTipoMPrima}>Apcetar</Button>
                </>
            }/>
        </div>
    )
}
