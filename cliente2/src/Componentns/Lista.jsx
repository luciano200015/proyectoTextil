import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';



export default function AlignItemsList({data,eliminar,url}) {
  return (
    <List sx={{ width: '100%', maxWidth: 1250, bgcolor: 'background.paper' }}>
        
        {data?.map((per)=>(
            <div key={per?.id}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={per?.nombre} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={"Nombre Completo: "+per?.nombre+" "+per?.apellidoPaterno+" "+per?.apellidoMaterno}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {"N° Carnet: "+per?.carnet}
                        </Typography>
                        {" — Correo: "+per?.correo+" - Direccion: "+per?.direccion+" - Telefono: "+per?.telefono}
                        </React.Fragment>
                    }
                    
                    />
                    <ListItemText
                    primary={
                        <React.Fragment>
                        <Button sx={{width:'0.3rem',height:"2.5rem",marginRight:"0.3rem"}} onClick={()=>eliminar(per?.id)} variant="outlined" startIcon={<DeleteIcon />}/>
                        <Link to={url+per.id}>
                            <Button sx={{width:'0.3rem',height:"2.5rem"}} variant="outlined" startIcon={<EditIcon />}/>
                            </Link>
                        </React.Fragment>
                    }
                    />
                </ListItem>
                
                <Divider variant="inset" component="li" />
            </div>
        ))}

    </List>
  );
}
