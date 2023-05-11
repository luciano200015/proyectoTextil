import React,{useState,useEffect} from 'react'
import { TextField,Container,Grid,Box, Button,Typography} from '@mui/material'
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {ModalBa}from'../../Componentns/ModalBa'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Delete from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom'



import Axios from "axios";


export const CreatePedido = () => {
    const navigate=useNavigate()
   const[open,setOpen]=useState(false)
   const [proveedores, setproveedores] = useState([])
   const [personales, setPersonales] = useState([])
   const [error, seterror] = useState(false)
   const [CompraId, setCompraId] = useState()
   const handleClose=()=>{setOpen(false)};
   const handleopen=()=>{setOpen(true)};

   
   const [Buscar,setBucar]=useState('');
    function serarChingTerm(Buscar){
        return function(x){
          return x.descripcion.toLowerCase().includes(Buscar) || !Buscar;
    
        }
    }

    const [listaMateriaPrima, setlistaMateriaPrima] = useState([])
    const [sendListaMateriaPrima, setSentlistaMateriaPrima] = useState([])
    const [sendRequerimiento, setSentRequerimiento] = useState([])

    const removeItem=(id)=>{
        const NewLista=sendListaMateriaPrima.filter((op)=>op.idProducto!==id);
        var sumaTotal=0
        for(const su of NewLista){
            sumaTotal=sumaTotal+su.total
        }
        reset2({montoTotal:sumaTotal})
        setSentlistaMateriaPrima(NewLista)
    }
    const onClickAgregar=(value)=>{
        var sumaTotal=0;
        if (getValues().cantidad==="" ){
            seterror(true) 
            return;
        }
        value.cantidad= parseInt(getValues().cantidad);
        


        const neMateriaPrima=sendListaMateriaPrima.find(Mprima=>value.id===Mprima.idProducto)
        if (neMateriaPrima!=undefined) {
            const update=sendListaMateriaPrima.map(up=>{if (neMateriaPrima.idProducto===up.idProducto) {
                return {...up,cantidad:value.cantidad+up.cantidad,total:(value.cantidad+up.cantidad)*value.precio}
            }else{
                return up}
        })
                setSentlistaMateriaPrima(update)
                for(const su of update){
                    sumaTotal=sumaTotal+su.total
                }

        } else {
            const obj={
                idProducto:value.id,
                descripcion:value.descripcion,
                cantidad:value.cantidad,
                precio:value.precio,
                total:parseFloat(value.precio*value.cantidad)
            }
             sendListaMateriaPrima.push(obj)
             for(const su of sendListaMateriaPrima){
                sumaTotal=sumaTotal+su.total
            }
        }
        
        
        console.log(sumaTotal)
        reset2({montoTotal:sumaTotal})
        setBucar('')
        setOpen(false)
        seterror(false)
        reset1()
    }
    
    //trae la lsta de materias primas
    const getMateriasPrimas = () => {
        Axios.get("http://localhost:3001/producto").then((response) => {
            setlistaMateriaPrima(response.data);
        });
    };
    const getProducto = async() => {
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
        setlistaMateriaPrima(newlista)
    };

    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const { register:regiscantidad,getValues,reset:reset1 } = useForm();
    const { register:regismontototal,getValues:getValuMonto,reset:reset2 } = useForm();

    const onSubmit =(data) => {
        var sumaTotal=0
        for(const su of sendListaMateriaPrima){
            sumaTotal=sumaTotal+su.total
        }
        const fecha1 = new Date();
        data.fecha=`${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`
         data.montototal=parseFloat(sumaTotal)
        
        Axios.post("http://localhost:3001/createpedido", data).then((response)=>{
            sendListaMateriaPrima.map((obj)=>{
                obj.idVenta=response.data.insertId
                obj.estado='1'
                obj.montototal=parseFloat(sumaTotal)                                                                    
                obj.fecha=`${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`
                if(obj.idVenta!==undefined){
                    Axios.post("http://localhost:3001/createdetallepedido", obj)
                    
                }
            })
        })

        
        //console.log(data)
        //console.log(sendListaMateriaPrima)
        reset()
        navigate(`/listaventa`)
        
    };

    const getPersonales = () => {
        Axios.get("http://localhost:3001/personas/2").then((response) => {
            setPersonales(response.data);
        });
    };
    useEffect(() => {
        getProducto();
    
        getPersonales();  
    }, [])
    return (
        <Container maxWidth="sm" sx={{marginTop:"6rem"}}>          
            <Grid container spacing={1} columns={16} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={16}>
                    <Typography variant="h4" component="h4">
                        Realizar Pedido
                    </Typography>
                </Grid>
                <Grid item xs={16}>
                <TextField {...register("fechaEntrega",{required:true})}
                                error={error}
                                type="date"
                                />
                                <h6>Fecha Entrega</h6>
                </Grid>
                <Grid item xs={16}>
                    <InputLabel id="demo-simple-select-helper-label" >Selecionar Cliente</InputLabel>
                    <Select sx={{width:"100%"}}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            {...register("idCliente",{required:true})}
                            placeholder="Age"
                        >   
                            <MenuItem value="">
                            <em>Elige el tipo</em>
                            </MenuItem>
                            {personales.map((tipo)=>(
                                <MenuItem value={tipo.id}>{tipo.nombre}</MenuItem>
                            ))}
                            
                    </Select>
                    <br/>
                    {errors.idTipoMateriaPrima?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                </Grid>

              
                    <Grid xs={5}>
                       <Button onClick={handleopen}  variant='contained' sx={{marginTop:"15%"}} >Agregar Producto</Button>     
                    </Grid>
                    <Grid xs={16} >
                    <Box 
                            sx={{display:'flex',border:1,margin:1}}>
                              <Grid xs={8}>
                                <h6>nombre</h6>
                              </Grid>
                              <Grid xs={8}>
                                <h6>cantidad</h6>
                              </Grid>
                              <Grid xs={8}>
                                <h6>precio</h6>
                              </Grid>
                              <Grid xs={8}>
                                <h6>Total</h6>
                              </Grid>
                    
                            </Box>
                    {sendListaMateriaPrima.map(lis=>(

                            <Box 
                            sx={{display:'flex',border:1,margin:1}}>
                              <Grid xs={8}>
                                <h6>{lis?.descripcion}</h6>
                              </Grid>
                              <Grid xs={8}>
                                <h6>{lis?.cantidad}</h6>
                              </Grid>
                              <Grid xs={8}>
                                <h6>{lis?.precio}</h6>
                              </Grid>
                            
                              <Grid xs={8}>
                                <h6>{lis?.total}</h6>
                              </Grid>
                              <Grid xs={2}>
                                <IconButton onClick={()=>removeItem(lis.idProducto)}>
                                    <Delete sx={{color:"red"}}/>
                                </IconButton>
                              </Grid>
                    
                            </Box>
                    ))}
                    </Grid>
                    <Grid item xs={12}>
                    <TextField {...regismontototal('montoTotal',{required:true})}
                                label='Total Compra'
                                defaultValue={0}
                                error={error}
                                disabled
                                type="number"
                                />    
                </Grid> 
               
                <Grid item xs={12}>
                    <Button variant='contained' sx={{marginTop:"15%"}} type='submit'>Terminar Compra</Button>     
                </Grid>        
            </Grid>   
                 <ModalBa open={open} handleClose={handleClose} 
                  container={<>
                  <Grid sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                  <Grid xs={6} >
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
                    <Grid xs={5}>
                        <TextField {...regiscantidad('cantidad',{required:true})}
                                label='Cantidad'
                                error={error}
                                type="number"
                                />
                    </Grid>
                   
                    </Grid>
                    <Box  sx={{display:'flex',border:1,margin:2}}>
                    <Grid xs={8}>
                        <h6>Descripcion</h6>
                      </Grid>
                      <Grid xs={4}>
                        <h6>Precio</h6>
                      </Grid>
                      <Grid xs={8}>
                        <h6>Talla</h6>
                      </Grid>
                      <Grid xs={8}>
                        <h6>Modelo</h6>
                      </Grid>
                    </Box>
                    
                  {listaMateriaPrima.filter(serarChingTerm(Buscar)).map((lis)=>
                    <Box onClick={()=>onClickAgregar(lis)} 
                    sx={{display:'flex',border:1,margin:2}}>
                      <Grid xs={8}>
                        <h6>{lis.descripcion}</h6>
                      </Grid>
                      <Grid xs={4}>
                        <h6>{lis.precio}</h6>
                      </Grid>
                      <Grid xs={8}>
                        <h6>{lis.idTalla}</h6>
                      </Grid>
                      <Grid xs={8}>
                        <h6>{lis.idModelo}</h6>
                      </Grid>
                      
            
                    </Box>
                    )}
                  
                  </>}
                 />
                
                   
                
        </Container>
    )
}

