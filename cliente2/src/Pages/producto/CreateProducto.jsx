{/*Falta  en el server*/}

import React,{useState,useEffect} from 'react'
import { TextField,Container,Grid, Button,Typography} from '@mui/material'
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link ,useNavigate} from 'react-router-dom';

import Axios from "axios";

export const CreateProducto=()=>{
    const navigate =useNavigate()

    {/*Tipo Producto*/}
    const [TipoProducto, setProducto] = useState([])
    
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
    {/**cosas */}
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        data.estado='1'
        data.descripcion=data.descripcion.toUpperCase()
        Axios.post("http://localhost:3001/createproducto", data)
        reset() 
        navigate('/listaproducto')
    };
    useEffect(() => {
        getTipoProducto()
        getTalla()
        getModelo()
    }, [])
    return (
        <Container maxWidth="sm" sx={{marginTop:"6rem"}}>          
            <Grid container spacing={1} columns={16} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={16}>
                    <Typography variant="h4" component="h4">
                        Crear Producto
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField {...register('descripcion', { required: true,maxLength:20 })}
                    label='descripcion'
                    />
                    <br/>
                    {errors.descripcion?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.descripcion?.type === 'maxLength' && <span className="text-danger" >max. 20 caracteres</span>}

                </Grid>
                <Grid item xs={8}>
                    <TextField type="number" {...register('stock', { required: true  })}
                    label='Stock'
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

                <Grid item xs={8}>
                    <Button variant='contained' sx={{marginTop:"15%"}} type='submit'>guardar</Button>     
                </Grid>        
            </Grid>                      
        </Container>
    )
}