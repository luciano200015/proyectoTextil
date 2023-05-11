import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

export const ListaTipoMateriaPrima=({TipoMateriaPrima,eliminar,urlupdate})=> {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {TipoMateriaPrima.map((value,id) => (
        <ListItem
          key={id}
          disableGutters
          secondaryAction={
            <>
            <IconButton aria-label="comment" component="button" onClick={()=>eliminar(value.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="comment" LinkComponent={Link} to={`/${urlupdate}/${value.id}`} >
            <EditIcon />
          </IconButton>
          </>
          }
        >
          <ListItemText primary={id+1+" Descripcion:  "+value.descripcion} />
        </ListItem>
      ))}
    </List>
  );
}