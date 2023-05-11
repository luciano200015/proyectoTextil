import React from 'react'
import Axios from "axios";
import { useEffect,useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Button,Container,Grid,Typography,Box } from '@mui/material';
import { ListaMateriaPrima } from '../../Componentns/3D/ListaMotion/ListaMateriaPrima';
import { AlertDialog } from '../../Componentns/Alertdialog';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export const ListaProducto=()=> {
    const navigate =useNavigate()
    const [Buscar,setBucar]=useState('');
    const [open, setOpen] = useState(false)
    const [id, setid] = useState()
    const [Personas, setPersonas] = useState([])
    const handleClickOpen = (idProducto) => {
        setOpen(true);
        setid(idProducto)

    };
    function serarChingTerm(Buscar){
        return function(x){
          return x.nombre.toLowerCase().includes(Buscar) || !Buscar;
    
        }
    }

    const getInactivos=async()=>{
      const listaCOmpre= await Axios.get("http://localhost:3001/productoinactivo")
      const newlista=[]
      for(const list of listaCOmpre.data){
         newlista.push({...list,id:list.id,
         idModelo:  await Axios.get(`http://localhost:3001/modelo/${list.idModelo}`).then((response) => response.data.descripcion),
         idTalla: await Axios.get(`http://localhost:3001/talla/${list.idTalla}`).then((response) =>response.data.descripcion),
         idTipoProducto: await Axios.get(`http://localhost:3001/tipoproducto/${list.idTipoProducto}`).then((response) =>response.data.descripcion),
         precio: await Axios.get(`http://localhost:3001/modelo/${list.idModelo}`).then((response) =>response.data.precio),


      })
      }
      setPersonas(newlista)
    }
    const handleClose = () => {
        setOpen(false);
    };
    const navigateUpdate=(obj)=>{
         navigate(`/updateproducto/${obj.id}`)
    }
    

    const getPersonas = async() => {
        const listaCOmpre= await Axios.get("http://localhost:3001/producto")
        const newlista=[]
        for(const list of listaCOmpre.data){
           newlista.push({...list,id:list.id,
           idModelo:  await Axios.get(`http://localhost:3001/modelo/${list.idModelo}`).then((response) => response.data.descripcion),
           idTalla: await Axios.get(`http://localhost:3001/talla/${list.idTalla}`).then((response) =>response.data.descripcion),
           idTipoProducto: await Axios.get(`http://localhost:3001/tipoproducto/${list.idTipoProducto}`).then((response) =>response.data.descripcion),
           precio: await Axios.get(`http://localhost:3001/modelo/${list.idModelo}`).then((response) =>response.data.precio),


        })
        }
        setPersonas(newlista)
    };
    const eliminar= () => {
        Axios.delete(`http://localhost:3001/deleteproducto/${id}`)
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
            <Grid item  xs={24} >
                <Typography variant="h4" component="h4">
                    Lista de productos
                </Typography>
            </Grid>
            <Grid item  xs={24} sm={12} md={7}>
                <Button variant="outlined" sx={{width:"15rem",height:"95%"}} component={Link} to={`/createproducto`}>Añadir producto</Button>

            </Grid>
            <Grid item  xs={24} sm={12} md={4} >
                <Button variant="outlined" sx={{width:"15rem",height:"95%"}} color="success" onClick={getPersonas}>Activos</Button>

            </Grid>
            <Grid item  xs={24} sm={12} md={4}>
                <Button variant="outlined" sx={{width:"15rem",height:"95%",display:'none'}} color="error" onClick={getInactivos} disabled>De bajas</Button>

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
            <Grid  item  xs={24} sm={24} md={24}>
            <Box
             sx={{display:'flex',border:1,margin:1}}>

               <Grid xs={6}>
                 <h6>Descripcion</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>Stock</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>Estado</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>Talla</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>Tipo producto</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>Modelo</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>Precio</h6>
               </Grid>

             </Box>
            {Personas?.map((obj)=>
             <Box onClick={()=>navigateUpdate(obj)}
             sx={{display:'flex',border:1,margin:1,cursor:"pointer"}}>

               <Grid xs={6}>
                 <h6>{obj.descripcion}</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>{obj.stock}</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>{obj.estado==='0'&&'inactivo'}{obj.estado==='1'&&'activo'}</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>{obj.idTalla}</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>{obj.idTipoProducto}</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>{obj.idModelo}</h6>
               </Grid>
               <Grid xs={6}>
                 <h6>{obj.precio}</h6>
               </Grid>
     
             </Box>
            )}
            </Grid>
            
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
