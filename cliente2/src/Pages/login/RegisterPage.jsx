import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Button ,Grid, Link, TextField, Typography} from '@mui/material'

import {Layout} from '../../layout/Layout'

export const RegisterPage = () => {
  return (
    <Layout title='Crear cuenta'>
        <from>
            <Grid item xs={12} sx={{mt:2}}> 
                <TextField label="Nombre" type="text" placeholder="Nombre completo" fullWidth/>
            </Grid>
            <Grid item xs={12} sx={{mt:2}}> 
                <TextField label="Correo" type="email" placeholder="Correo@google" fullWidth/>
            </Grid>
            <Grid item xs={12} sx={{mt:2}}> 
                <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth/>
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>
                <Grid item xs={12} sm={12}>
                    <Button variant='contained' fullWidth>
                        Crear cuenta
                    </Button>
                </Grid>
            </Grid>

            <Grid container direcction='row' justifyContent='end'>
                <Typography sx={{mr:1}}>Ya  tienes Cuenta?</Typography>
                                                            {/*Para mandar a login */}
                <Link component={RouterLink} color='inherit' to='/login'>
                    Ingresa
                </Link>
            </Grid>
        </from>
    </Layout>
  )
}

