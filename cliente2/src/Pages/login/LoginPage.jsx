import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/authProvider';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


import {Layout} from '../../layout/Layout'

export const LoginPage = () => {
const { loginUser }=useAuth()
const navigate=useNavigate()
const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => { 
    
    const res=loginUser(data);
    console.log(res)
    return navigate("/")   

} 

  return (
    <Layout title='Inicia cesion'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                {/* correo y contrasena */}
                <Grid item xs={24} sx={{mt:2}}>
                    <TextField laberl="Correo" type="number" placeholder='id usuario' sx={{ width: '100%' }} {...register("id", { required: true })}/>
                    {errors.id && <span>This field is required</span>}
                </Grid>
                <Grid item xs={24} sx={{mt:2}}>
                    <TextField laberl="Correo" type="email" placeholder='Correo@gmail.com' sx={{ width: '100%' }} {...register("correo", { required: true })}/>
                    {errors.correo && <span>This field is required</span>}
                </Grid>

                {/* bottones de inicio*/}
                <Grid container spacing={2} sx={{mb:2, mt:1}}>
                    <Grid item xs={24} sm={12}>
                        <Button variant='contained' fullWidth type='submit'>iniciar sesion</Button> 
                    </Grid>

                </Grid>

            </Grid>
        </form>
    </Layout>
  )
}

