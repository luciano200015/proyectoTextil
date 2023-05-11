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


export const CreateCompraMateriaPrima = () => {
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
          return x.nombre.toLowerCase().includes(Buscar) || !Buscar;
    
        }
    }

    const [listaMateriaPrima, setlistaMateriaPrima] = useState([])
    const [sendListaMateriaPrima, setSentlistaMateriaPrima] = useState([])

    const removeItem=(id)=>{
        const NewLista=sendListaMateriaPrima.filter((op)=>op.idMateriaPrima!==id);
        setSentlistaMateriaPrima(NewLista)
    }
    const onClickAgregar=(value)=>{
        console.log(getValues())
        if (getValues().cantidad==="" || getValues().precio===""){
            seterror(true) 
            return;
        }
        value.cantidad= parseInt(getValues().cantidad);
        value.precio= parseFloat(getValues().precio);

        const neMateriaPrima=sendListaMateriaPrima.find(Mprima=>value.id===Mprima.idMateriaPrima)
        if (neMateriaPrima!=undefined) {
            const update=sendListaMateriaPrima.map(up=>{if (neMateriaPrima.idMateriaPrima===up.idMateriaPrima) {
                return {...up,cantidad:value.cantidad+up.cantidad,total:(value.cantidad+up.cantidad)*value.precio}
            }else{
                return up}
        })
                setSentlistaMateriaPrima(update)

        } else {
            const obj={
                idMateriaPrima:value.id,
                nombre:value.nombre,
                cantidad:value.cantidad,
                precio:value.precio,
                total:parseFloat(value.precio*value.cantidad)
            }
             sendListaMateriaPrima.push(obj)
        }
        setBucar('')
        setOpen(false)
        seterror(false)
        reset1()
    }
    
    //trae la lsta de materias primas
    const getMateriasPrimas = () => {
        Axios.get("http://localhost:3001/materiaprima").then((response) => {
            setlistaMateriaPrima(response.data);
        });
    };

    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const { register:regiscantidad,getValues,reset:reset1 } = useForm();

    const onSubmit =(data) => {
        var sumaTotal=0
        for(const su of sendListaMateriaPrima){
            sumaTotal=sumaTotal+su.total
        }
        const fecha1 = new Date();
        data.fecha=`${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`
        data.estado='2'
        data.total=sumaTotal
        Axios.post("http://localhost:3001/createcompramateriaprima", data).then((response)=>{
            sendListaMateriaPrima.map((obj)=>{
                obj.idCompra=response.data.insertId
                obj.estado="2"
                if(obj.idCompra!==undefined)Axios.post("http://localhost:3001/createdetallecompramateriaprima", obj)
                
            })
        })

        
        //console.log(data)
        //console.log(sendListaMateriaPrima)
        reset()
        navigate(`/listacompramateriaprima`)
        
    };
    const getProveedor = () => {
        Axios.get("http://localhost:3001/personas/3").then((response) => {
            setproveedores(response.data);
        });
    };
    const getPersonales = () => {
        Axios.get("http://localhost:3001/personas/1").then((response) => {
            setPersonales(response.data);
        });
    };
    useEffect(() => {
        getMateriasPrimas();
        getProveedor(); 
        getPersonales();  
    }, [])
    return (
        <Container maxWidth="sm" sx={{marginTop:"6rem"}}>          
            <Grid container spacing={1} columns={16} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={16}>
                    <Typography variant="h4" component="h4">
                        Realizar compra de materia prima
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <InputLabel id="demo-simple-select-helper-label" >Selecionar Personal</InputLabel>
                    <Select sx={{width:"100%"}}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            {...register("idPersonal",{required:true})}
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
                <Grid item xs={8}>
                    <InputLabel id="demo-simple-select-helper-label" >Selecionar Proveedor</InputLabel>
                    <Select sx={{width:"100%"}}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            {...register("idProveedor",{required:true})}
                            placeholder="Age"
                        >
                            <MenuItem value="">
                            <em>Elige el tipo</em>
                            </MenuItem>
                            {proveedores.map((tipo)=>(
                                <MenuItem value={tipo.id}>{tipo.nombre}</MenuItem>
                            ))}
                            
                    </Select>
                    <br/>
                    {errors.idTipoMateriaPrima?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                </Grid>
              
                    <Grid xs={5}>
                       <Button onClick={handleopen}  variant='contained' sx={{marginTop:"15%"}} >Agregar Materia Prima</Button>     
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
                                <h6>{lis?.nombre}</h6>
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
                                <IconButton onClick={()=>removeItem(lis.idMateriaPrima)}>
                                    <Delete sx={{color:"red"}}/>
                                </IconButton>
                              </Grid>
                    
                            </Box>
                    ))}
                    </Grid>
               
                <Grid item xs={12}>
                    <Button variant='contained' sx={{marginTop:"15%"}} type='submit'>guardar</Button>     
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
                    <Grid xs={5}>
                        <TextField {...regiscantidad('precio',{required:true})}
                                label='Precio'
                                error={error}
                                type="number"
                                />
                    </Grid>
                    </Grid>
                  {listaMateriaPrima.filter(serarChingTerm(Buscar)).map((lis)=>
                    <Box onClick={()=>onClickAgregar(lis)} 
                    sx={{display:'flex',border:1,margin:2}}>
                      <Grid xs={4}>
                        <h6>{lis.nombre}</h6>
                      </Grid>
                      <Grid xs={8}>
                        <h6>{lis.id}</h6>
                      </Grid>
                      
            
                    </Box>
                    )}
                  
                  </>}
                 />
        </Container>
    )
}

