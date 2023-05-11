{/*Falta  en el server*/}

import React,{useState,useEffect} from 'react'
import { TextField,Container,Grid, Button,Typography} from '@mui/material'
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link ,useNavigate,useParams} from 'react-router-dom';

import Axios from "axios";

export const UpdateProducto=()=>{
    {/*Tipo Producto*/}
    const{id}=useParams()
    const [TipoProducto, setProducto] = useState([])
    const navigate=useNavigate()
    
    const getTipoProducto = () => {
        Axios.get("http://localhost:3001/tipoproducto").then((response) => {
            setProducto(response.data);
        });
    };
    {/*Modelo*/}
    const [TipoModelo, setModel] = useState([])

    const getModelo = () => {
        Axios.get("http://localhost:3001/modelo").then((response) => {
            setModel(response.data);
        });
    };
    {/*Talla*/}
    const [TipoTalla, setTalla] = useState([])

    const getTalla = () => {
        Axios.get("http://localhost:3001/talla").then((response) => {
            setTalla(response.data);
        });
    };
    const getData=()=>{
        Axios.get(`http://localhost:3001/producto/${id}`).then((response) => {
            reset(response.data);
        });
    }
    const Eliminar=()=>{
        Axios.delete(`http://localhost:3001/deleteproducto/${id}`)
        return navigate("/listaproducto")
    }
    
    {/**cosas */}
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = async(data) => {
        data.estado='1'
        data.descripcion=data.descripcion.toUpperCase()
        console.log(data)
        await Axios.put("http://localhost:3001/updateproducto",{...data,id:id})
        reset()       
    };
    useEffect(() => {
        getData()
        getTipoProducto()
        getTalla()
        getModelo()
    }, [])
    return (
        <Container maxWidth="sm" sx={{marginTop:"6rem"}} component="form" onSubmit={handleSubmit(onSubmit)}>          
            <Grid container spacing={1} columns={16} >
                <Grid item xs={16}>
                    <Typography variant="h4" component="h4">
                        Editar Producto
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField {...register('descripcion', { required: true,maxLength:20 })}
                    label='descripcion'
                    defaultValue=' '
                    />
                    <br/>
                    {errors.descripcion?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.descripcion?.type === 'maxLength' && <span className="text-danger" >max. 20 caracteres</span>}

                </Grid>
                <Grid item xs={8}>
                    <TextField type="number" {...register('stock', { required: true  })}
                    label='Stock'
                    defaultValue={0}

                    />
                    <br/>
                    {errors.stock?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                </Grid>

               {/*Tipo producto */}
                <Grid item xs={8}>
                    <InputLabel id="demo-simple-select-helper-label" >Tipo Producto</InputLabel>
                    <Select sx={{width:"100%"}}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            {...register("idTipoProducto",{required:true})}
                            label="Age"
                        >
                            <MenuItem value="">
                            <em>Elige el tipo</em>
                            </MenuItem>
                            {TipoProducto.map((tipo)=>(
                                <MenuItem value={tipo.id}>{tipo.descripcion}</MenuItem>
                            ))}
                    </Select>
                    <br/>
                    {errors.idTipoProducto?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                </Grid>
                {/*Modelo */}
                <Grid item xs={8}>
                    <InputLabel id="demo-simple-select-helper-label" >Tipo Modelo</InputLabel>
                    <Select sx={{width:"100%"}}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            {...register("idModelo",{required:true})}
                            label="Age"
                        >
                            <MenuItem value="">
                            <em>Elige el Modelo</em>
                            </MenuItem>
                            {TipoModelo.map((tipo)=>(
                                <MenuItem value={tipo.id}>{tipo.descripcion}</MenuItem>
                            ))}
                    </Select>
                    <br/>
                    {errors.idModelo?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                </Grid>
                {/*talla*/}   
                <Grid item xs={8}>
                    <InputLabel id="demo-simple-select-helper-label" >Talla del Producto</InputLabel>
                    <Select sx={{width:"100%"}}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            {...register("idTalla",{required:true})}
                            label="Age"
                        >
                            <MenuItem value="">
                            <em>Elige la talla</em>
                            </MenuItem>
                            {TipoTalla.map((tipo)=>(
                                <MenuItem value={tipo.id}>{tipo.descripcion}</MenuItem>
                            ))}
                    </Select>
                    <br/>
                    {errors.idtalla?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                </Grid>

                       
            </Grid>  
            <Grid item xs={8}>
                    <Button variant='contained' sx={{marginTop:"5%"}} type='submit'>guardar</Button>
                    <Button variant='contained' color='error' sx={{marginTop:"5%",marginLeft:"2rem"}} onClick={Eliminar}>Eliminar</Button>     
                </Grid>                     
        </Container>
    )
}