import React from 'react'
import Axios from "axios";
import { useEffect,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button,Container,Grid,Typography ,Box} from '@mui/material';
import { AlertDialog } from '../../Componentns/Alertdialog';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

export const ListaPedido = () => {
    const navigate=useNavigate()
    const [Buscar,setBucar]=useState('');
    const [open, setOpen] = useState(false)
    const handleClickOpen = (idp) => {
        setOpen(true);
        setid(idp)

    };
    function serarChingTerm(Buscar){
        return function(x){
          return x.id.toLowerCase().includes(Buscar) || !Buscar;
    
        }
    }
    const handleClose = () => {
        setOpen(false);
    };
    const navigateDetalle=(obj)=>{
        navigate(`/detalleventa/${obj.id}`)
    }
    const [id, setid] = useState()
    const [Personas, setPersonas] = useState([])

    const getPersonas = async() => {
        
        const listaCOmpre=await  Axios.get("http://localhost:3001/listaventa")

        console.log(listaCOmpre.data)
        setPersonas(listaCOmpre.data)
    };
    const getCanceladas = async() => {
        
      const listaCOmpre=await  Axios.get("http://localhost:3001/compramateriaprimacancelada")


      const newlista=[]
      for(const list of listaCOmpre.data){
          console.log('personal', await Axios.get(`http://localhost:3001/detallepersona/${list.idProveedor}`).then((response) => response.data.nombre))
         newlista.push({...list,id:list.id,
         idProveedor:  await Axios.get(`http://localhost:3001/detallepersona/${list.idProveedor}`).then((response) => response.data.nombre),
         idPersonal: await Axios.get(`http://localhost:3001/detallepersona/${list.idPersonal}`).then((response) =>response.data.nombre),
      })
      }
      setPersonas(newlista)
    };
    const getOrden = async() => {
        
      const listaCOmpre=await  Axios.get("http://localhost:3001/compramateriaprimaorden")


      const newlista=[]
      for(const list of listaCOmpre.data){
          console.log('personal', await Axios.get(`http://localhost:3001/detallepersona/${list.idProveedor}`).then((response) => response.data.nombre))
         newlista.push({...list,id:list.id,
         idProveedor:  await Axios.get(`http://localhost:3001/detallepersona/${list.idProveedor}`).then((response) => response.data.nombre),
         idPersonal: await Axios.get(`http://localhost:3001/detallepersona/${list.idPersonal}`).then((response) =>response.data.nombre),
      })
      }
      setPersonas(newlista)
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
                    Lista de Ventas
                </Typography>
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
            <Grid item  xs={24} sm={24} md={24}>
            <Box
             sx={{display:'flex',border:1,margin:1}}>

              
               <Grid xs={8}>
                 <h6>Monto Total</h6>
               </Grid>
               <Grid xs={8}>
                 <h6>Fecha de Venta</h6>
               </Grid>

             </Box>
            {Personas?.map((obj)=>
             <Box onClick={()=>navigateDetalle(obj)}
             sx={{display:'flex',border:1,margin:1,cursor:"pointer"}}>

               <Grid xs={8}>
                 <h6>{obj.montototal}</h6>
               </Grid>
               
               <Grid xs={8}>
                 <h6>{obj.fecha}</h6>
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
