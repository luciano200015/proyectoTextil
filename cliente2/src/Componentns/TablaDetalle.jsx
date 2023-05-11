import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export const BasicTable=({data})=> {
    const [Datas, setDatas] = React.useState([])
    /*const getData=async ()=>{
        const lista=[];
        for(const obj of data){
            console.log("sdfg",obj) 
            const nombre=await Axios.get(`http://localhost:3001/materiaprima/${obj.idMateriaPrima}`).then((response) =>response.data
            console.log(nombre)
            lista.push({...obj,nombre:response.nombre.nombre})

        }
        setDatas(lista) 
    }*/
    React.useEffect(() => {
        //getData();
    }, [])
    
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio U.</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idMateriaPrima}
              </TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
              <TableCell align="right">{row.precio}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}