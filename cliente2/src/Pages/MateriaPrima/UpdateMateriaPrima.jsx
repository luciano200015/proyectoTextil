import React,{useState,useEffect} from 'react'
import { TextField,Container,Button,Grid,Typography} from '@mui/material'
import { useNavigate,useParams} from 'react-router-dom';
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Axios from "axios";

export const UpdateMateriaPrima = () => {
    const [TipoMateriaPrima, setTipoMateriaPrima] = useState([])
    const {id}=useParams();
    const [persona, setpersona] = useState({})
    const navigate=useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        Axios.put("http://localhost:3001/updatemateriaprima", { ...data,id:id})
        return navigate("/listasmateriaprima")
    };
    const cargarPersona = () => {
        Axios.get(`http://localhost:3001/materiaprima/${id}`).then((response) => {
            console.log(response.data)
            setpersona(response.data);
            reset(response.data)
        });
    };
    
    const getTiposMateriaPrima = () => {
        Axios.get("http://localhost:3001/tipomateriaprima").then((response) => {
            setTipoMateriaPrima(response.data);
        });
    };
    useEffect(() => {
        getTiposMateriaPrima()
        cargarPersona()

    }, [])
    return (
    <Container maxWidth="sm" sx={{marginTop:"6rem"}}>          
        <Grid container spacing={1} columns={16} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={16}>
                <Typography variant="h4" component="h4">
                    Actualizar materia prima
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <TextField {...register('nombre', { required: true,maxLength:20 })}
                label='Nombre'
                defaultValue="default value"
                />
                <br/>
                {errors.nombre?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
                {errors.nombre?.type === 'maxLength' && <span className="text-danger" >max. 20 caracteres</span>}

            </Grid>
            <Grid item xs={8}>
                <TextField type="number" {...register('stock', { required: true  })}
                    label='Stock'
                    defaultValue="default value"
                />
                <br/>
                {errors.stock?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
            </Grid>
            <Grid item xs={8}>
                <TextField type="number" {...register('stockminimo', { required: true  })}
                    label='stock minimo'
                    defaultValue="default value"
                />
                <br/>
                {errors.stockminimo?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
            </Grid>
            {/*<Grid item xs={8}>
            <InputLabel id="demo-simple-select-helper-label" >estado</InputLabel>
                <Select sx={{width:"80%"}}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        {...register("estado",{required:true})}
                        label="estado"
                    >
                        <MenuItem value="1">
                        <em>Activo</em>
                        </MenuItem>
                        <MenuItem value="0">
                        <em>pasivo</em>
                        </MenuItem>
                        
                </Select>
                <br/>
                {errors.estado?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
    </Grid>*/}
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
                <InputLabel id="demo-simple-select-helper-label" >Estado</InputLabel>
                <Select sx={{width:"100%"}}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        {...register("estado",{required:true})}
                        label="estado"
                    >
                        <MenuItem value="1">
                        Activar
                        </MenuItem>
                        <MenuItem value='0'>Dar de Baja</MenuItem>
                </Select>
                <br/>
                {errors.idTipoMateriaPrima?.type === 'required' && <span className="text-danger" >El campo es requerido</span>}
            </Grid>
            <Grid item xs={8}>
                <Button variant='contained' sx={{marginTop:"15%"}} type='submit'>Actualizar</Button>     
            </Grid>        
        </Grid>                      
    </Container>
    )
}
