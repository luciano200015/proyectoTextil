import React,{useState,useEffect} from 'react'
import { TextField,Container,Grid, Button,Typography} from '@mui/material'
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

import Axios from "axios";



export const CreateMateriaPrima = () => {
    const [TipoMateriaPrima, setTipoMateriaPrima] = useState([])
    const navigate=useNavigate();
    useEffect(() => {
        getTiposMateriaPrima()
    }, [])
    const getTiposMateriaPrima = () => {
        Axios.get("http://localhost:3001/tipomateriaprima").then((response) => {
            setTipoMateriaPrima(response.data);
        });
        
    };
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        data.estado='1'
        data.nombre=data.nombre.toUpperCase()
        Axios.post("http://localhost:3001/createmateriaprima", data)
        reset()
        return navigate("/listacompramateriaprima")
    };
    return (
        <Container maxWidth="sm" sx={{marginTop:"6rem"}}>          
            <Grid container spacing={1} columns={16} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={16}>
                    <Typography variant="h4" component="h4">
                        Crear materia prima
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField {...register('nombre', { required: true,maxLength:20 })}
                    label='Nombre'
                    />
                    <br/>
                    {errors.nombre?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
         
                    {errors.nombre?.type === 'maxLength' && <span className="text-danger" >max. 20 caracteres</span>}

                </Grid>
                <Grid item xs={8}>
                    <TextField type="number" {...register('stock', { required: true  })}
                    label='Stock'
                    />
                    <br/>
                    {errors.stock?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                </Grid>
                <Grid item xs={8}>
                    <TextField type="number" {...register('stockminimo', { required: true})}
                    label='stock minimo'
                    />
                    <br/>
                    {errors.stockminimo?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}

                </Grid>
               
                <Grid item xs={8}>
                    <InputLabel id="demo-simple-select-helper-label" >Tipo Materia Prima</InputLabel>
                    <Select sx={{width:"100%"}}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            {...register("idTipoMateriaPrima",{required:true})}
                            label="Age"
                        >
                            <MenuItem value="">
                            <em>Elige el tipo</em>
                            </MenuItem>
                            {TipoMateriaPrima.map((tipo)=>(
                                <MenuItem value={tipo.id}>{tipo.descripcion}</MenuItem>
                            ))}
                    </Select>
                    <br/>
                    {errors.idTipoMateriaPrima?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                </Grid>
                <Grid item xs={8}>
                    <Button variant='contained' sx={{marginTop:"15%"}} type='submit'>guardar</Button>     
                </Grid>        
            </Grid>                      
        </Container>
    )
}
