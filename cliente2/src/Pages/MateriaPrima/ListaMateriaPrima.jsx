import React from 'react'
import Axios from "axios";
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,Container,Grid,Typography } from '@mui/material';
import { ListaMateriaPrima } from '../../Componentns/3D/ListaMotion/ListaMateriaPrima';
import { AlertDialog } from '../../Componentns/Alertdialog';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export const ListaMateriPrima=()=> {
    const [Buscar,setBucar]=useState('');
    const [open, setOpen] = useState(false)
    const [id, setid] = useState()
    const [Personas, setPersonas] = useState([])
    const handleClickOpen = (idMateriaPrima) => {
        setOpen(true);
        setid(idMateriaPrima)

    };
    function serarChingTerm(Buscar){
        return function(x){
          return x.nombre.toLowerCase().includes(Buscar) || !Buscar;
    
        }
    }

    const getInactivos=()=>{
        Axios.get("http://localhost:3001/materiaprimainactivo").then((response) => {
            setPersonas(response.data);
        });
    }
    const handleClose = () => {
        setOpen(false);
    };
    

    const getPersonas = () => {
        Axios.get("http://localhost:3001/materiaprima").then((response) => {
            setPersonas(response.data);
        });
    };
    const eliminar= () => {
        Axios.delete(`http://localhost:3001/deletemateriaprima/${id}`)
        const newLista= Personas.filter((lista)=>lista.id !== id)
        setPersonas(newLista);
        setOpen(false)
    };
    useEffect(() => {
        getPersonas();
    }, [])
    return (
        <Container maxWidth="xl" sx={{marginTop:"6rem",alignContent:'center',alignItems:'center'}}>
            <Grid container spacing={1} columns={24}>
            <Grid item  xs={24}>
                <Typography variant="h4" component="h4">
                    Lista de Materias primas
                </Typography>
            </Grid>
            <Grid item  xs={24} sm={12} md={7}>
                <Button variant="outlined" sx={{width:"15rem",height:"95%"}} component={Link} to={`/createMateriaPrima`}>Añadir Materia Prima</Button>

            </Grid>
            <Grid item  xs={24} sm={12} md={4} >
                <Button variant="outlined" sx={{width:"15rem",height:"95%"}} color="success" onClick={getPersonas}>Activos</Button>

            </Grid>
            <Grid item  xs={24} sm={12} md={4}>
                <Button variant="outlined" sx={{width:"15rem",height:"95%"}} color="error" onClick={getInactivos}>De bajas</Button>

            </Grid>
            <Grid item  xs={24} sm={12} md={9}>
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:"100%" }}
                    >
                    <InputBase inputComponent="input"
                        onChange={e=>setBucar(e.target.value)}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Buscar"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                
                </Paper>
            </Grid>
                <ListaMateriaPrima functionBuscar={serarChingTerm(Buscar)}  MateriaPrima={Personas} eliminar={handleClickOpen}/>
            </Grid>
            
            <AlertDialog title={"Estas Seguro que deses eliminar"} open={open} handleClose={handleClose} Button={
                <>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={eliminar}>Apcetar</Button>
                </>
            }/>
        </Container>
    )
}
