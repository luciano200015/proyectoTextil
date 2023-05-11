import React from 'react';
import { useNavigate} from 'react-router-dom';
import {TextField,Container,Button,Grid} from '@mui/material';
import { useForm } from "react-hook-form";
import Axios from "axios";


export const CreateTipoProducto = () => {

    const navigate=useNavigate();
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.descripcion=data.descripcion.toUpperCase()
        Axios.post("http://localhost:3001/createtipoproducto", data)
        reset()
        return navigate("/listastipoproducto")   
    };
    return (
        <Container maxWidth="sm" sx={{marginTop:"8rem"}}> 
           
            <Grid container spacing={1} columns={16} component="form" content="form"onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={16}>
                    <h3>Crear Tipo Producto</h3>
                </Grid>
                <Grid item xs={16}>
                    <TextField {...register('descripcion', { required: true,maxLength:20 })}
                        label='Descripcion'
                    />
                    <br/>
                    {errors.descripcion?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.descripcion?.type === 'maxLength' && <span className="text-danger" >maximo 20 caracteres</span>}
                </Grid>
                <Grid item xs={16}>
                    <Button variant='contained' type='submit'>guardar</Button>     
                </Grid>
           
            </Grid>            
            
        </Container>
    )
}
