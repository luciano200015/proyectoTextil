import Axios from "axios";
import { motion } from "framer-motion";
import "./ListaProducto.css";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Button,Grid} from '@mui/material';
import Typography from '@mui/material/Typography';

export const ListaProducto=({functionBuscar,Producto,eliminar})=> {

    return (
      <>
          {Producto?.filter(functionBuscar).map((item,index) => (
            <Grid key={index} item xs={12} sm={6} md={4} >
              <ImgMediaCard id={item?.idTipoMateriaPrima} item={item} eliminar={eliminar}/>
            </Grid>
  
          ))}
      </>
  
    );
  }
  const ImgMediaCard=({id,item,eliminar})=> {
    const [state, setstate] = React.useState()
    const cargarDescripcion = () => {
      Axios.get(`http://localhost:3001/tipoProducto/${id}`).then((response) => {
        setstate(response.data);
      });
    };
    cargarDescripcion()
    return (
      <Card  sx={{ maxWidth:200,margin:0 }}>
        <CardMedia
          component="img"
          alt="Materia Prima"
          height="60"
          image="https://ads.wpblogdesigner.net/wp-content/uploads/2020/04/placeholder-1-1100x617-1.png"
        />
        <CardContent>
          <Typography gutterBottom component="div" sx={{margin:0}}>
          {item.nombre}
          </Typography>
          <Typography variant="body2" sx={{height:"4.5rem"}} color="text.secondary">
            stock:{item.stock}<br/>  
            Stock Minimo:{item.stockminimo}<br/>
            Estado:{item.estado}<br/>
            T. Materia:{state?.descripcion}
          </Typography>
        </CardContent>
        <CardActions sx={{height:"2rem"}}>
            <IconButton aria-label="comment" component="button" onClick={()=>eliminar(item.id)} >
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="comment" LinkComponent={Link} to={`/updateproducto/${item.id}`} >
              <EditIcon />
            </IconButton>
        </CardActions>
      </Card>
    );
  }