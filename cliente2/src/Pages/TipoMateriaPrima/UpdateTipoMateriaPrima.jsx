import React,{useState,useEffect} from 'react'
import { TextField,Container,Button,Grid} from '@mui/material'
import { useNavigate,useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import Axios from "axios";

export const UpdateTipoMateriaPrima = () => {

    const {id}=useParams();
    const navigate=useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        Axios.put("http://localhost:3001/updatetipomateriaprima", { ...data,id:id})
        return navigate("/listastipomateriaprima")
    };
    const cargarPersona = () => {
        Axios.get(`http://localhost:3001/tipomateriaprima/${id}`).then((response) => {
            reset(response.data);
        });
    };
    useEffect(() => {
        cargarPersona()

    }, [])
    return (
        <Container maxWidth="sm" sx={{marginTop:"8rem"}}> 
           
            <Grid container spacing={1} columns={16} component="form" content="form"onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={16}>
                    <h3>Actualizar Tipo Materia Prima</h3>
                </Grid>
                <Grid item xs={16}>
                    <TextField {...register('descripcion', { required: true,maxLength:20 })}
                        label='Descripcion'
                        defaultValue="default value"
                    />
                    <br/>
                    {errors.descripcion?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.descripcion?.type === 'maxLength' && <span className="text-danger" >maximo 20 caracteres</span>}
                </Grid>
                <Grid item xs={16}>
                    <Button variant='contained' type='submit'>Actualizar</Button>     
                </Grid>
            </Grid>              
        </Container>
    )
}
