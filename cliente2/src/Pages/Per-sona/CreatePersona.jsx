import React,{useState,useEffect} from 'react'
import { TextField,Container,Button,Grid,InputLabel,Select,MenuItem,FormControl} from '@mui/material'
import { useForm } from "react-hook-form";
import Axios from "axios";


export const CreatePersonas = () => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const [tipoPersonas, settipoPersonas] = useState([])
    const getTipoPersona = () => {
        Axios.get("http://localhost:3001/tipopersona").then((response) => {
            settipoPersonas(response.data);
        });
    };
    const onSubmit = data => {
        Axios.post("http://localhost:3001/createpersona", data)
        if (data.idTipoPersona===1) {
            return navigate("/listaspersonas")   
        }
        if (data.idTipoPersona===2) {
            return navigate("/listascliente")   
        }
        if (data.idTipoPersona===3) {
            return navigate("/listasproveedor")   
        }
        
    };
    useEffect(() => {
        getTipoPersona()
    }, [])
    return (
        <Container maxWidth="sm" sx={{marginTop:"4rem"}}> 
            
            <Grid   container spacing={1} columns={16} component="form" onSubmit={handleSubmit(onSubmit)} >
                <Grid item xs={16}>
                    <h2 className='mt-5'>Crear nuevo persona</h2>

                </Grid>
                <Grid item xs={8} >
                    <TextField {...register('nombre', { required: true,pattern:/^[A-Z]+$/,maxLength:50})}
                    error={errors.nombre?.type === 'required' && true}
                    label='Nombre'
                    />
                    <br/>
                {errors.nombre?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                {errors.nombre?.type === 'pattern' && <span className="text-danger" >Solo se admiten mayusculas</span>}
                {errors.nombre?.type === 'maxLength' && <span className="text-danger" >Max. 50 caracteres</span>}

                </Grid >

                <Grid item xs={8} >
                    <TextField {...register('apellidoPaterno', { required: true,pattern:/^[A-Z]+$/,maxLength:50})}
                    label='Apellido Paterno'
                    error={errors.apellidoPaterno?.type === 'required' && true}
                    />
                    <br/>
                    {errors.apellidoPaterno?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.apellidoPaterno?.type === 'pattern' && <span className="text-danger" >Solo se admiten mayusculas</span>}
                    {errors.apellidoPaterno?.type === 'maxLength' && <span className="text-danger" >Max. 50 caracteres</span>}
                </Grid  >
                <Grid  item xs={8}>
                    <TextField {...register('apellidoMaterno', { required: true,pattern:/^[A-Z]+$/,maxLength:50})}
                    error={errors.apellidoMaterno?.type === 'required' && true}
                    label='Apellido Materno'
                    />
                    <br/>
                    {errors.apellidoMaterno?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.apellidoMaterno?.type === 'pattern' && <span className="text-danger" >Solo se admiten mayusculas</span>}
                    {errors.apellidoMaterno?.type === 'maxLength' && <span className="text-danger" >Max. 50 caracteres</span>}
                </Grid >
                <Grid  item xs={8}>
                    <TextField {...register('carnet', { required: true,maxLength:15 })}
                    error={errors.carnet?.type === 'required' && true}
                    label='Carnet'
                    />
                    <br/>
                    {errors.carnet?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.carnet?.type === 'maxLength' && <span className="text-danger" >Max. 15 caracteres</span>}
                </Grid >
                <Grid  item xs={8}>
                    <TextField {...register('direccion', { required: true ,maxLength:50})}
                    label='Dirección'
                    error={errors.direccion?.type === 'required' && true}
                    />
                    <br/>
                    {errors.direccion?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.direccion?.type === 'maxLength' && <span className="text-danger" >Max. 50 caracteres</span>}
                </Grid >
                <Grid  item xs={8}>
                    <TextField {...register('correo', { required: true,
                    pattern:/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/,
                    maxLength:70 })}
                    error={errors.correo?.type === 'required' && true}
                    label='Correo'
                    />
                    <br/>
                    {errors.correo?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.correo?.type === 'pattern' && <span className="text-danger" >email invalido</span>}
                    {errors.correo?.type === 'maxLength' && <span className="text-danger" >Max. 70 caracteres</span>}

                </Grid >
                <Grid  item xs={8}>
                    <TextField {...register('telefono', { required: true,pattern:/^[0-9]*(\.?)[ 0-9]+$/,maxLength:10 })}
                    error={errors.telefono?.type === 'required' && true}
                    label='Telefono'
                    />
                    <br/>
                    {errors.telefono?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    {errors.telefono?.type === 'pattern' && <span className="text-danger" >Solo numeros</span>}
                    {errors.telefono?.type === 'maxLength' && <span className="text-danger" >Max. 10 caracteres</span>}
                </Grid  >
                <Grid  item xs={8}>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Tipo persona</InputLabel>
                        <Select
                            disabled={false}
                            {...register("idTipoPersona",{required:true})}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="tipo persona"
                        >
                            <MenuItem value="">Elige un tipo de persona</MenuItem>
                            {tipoPersonas?.map(tipo=>(
                                <MenuItem key={tipo.id} value={tipo.id}>{tipo.descripcion}</MenuItem>
                            ))}
                        </Select>
                        <br/>
                        {errors.idTipoPersona?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                    </FormControl>
                </Grid  >
                <Grid item xs={8} >
                    <Button variant='contained' type='submit'>guardar</Button>
                </Grid>
     
            </Grid >            
            
        </Container>
    )
}
