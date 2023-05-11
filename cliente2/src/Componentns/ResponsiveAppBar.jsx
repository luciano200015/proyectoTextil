import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import { useAuth } from '../context/authProvider';
import { useNavigate } from 'react-router-dom';





const FadeMenu = ({ title, lista }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'white', padding: '2rem' }}

      >
        {title}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {lista.map((a) =>
          <MenuItem onClick={handleClose} component={Link} to={a.link}>{a.page}</MenuItem>
        )}


      </Menu>
    </div>
  );
}



export const ResponsiveAppBar = () => {
  const { user, logoutUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  
  const cerrarCesion=()=>{
    logoutUser();
    navigate('/login');
    return;
  }

  const persona = [
    { page: 'Home', link: '/' },
    { page: 'Personal', link: '/listaspersonas' },
    { page: 'Clientes', link: '/listascliente' },
    { page: 'Proveedores', link: '/listasproveedor' },

  ];
  const materia = [
    { page: 'Home', link: '/' },
    { page: "Tipo Materia Prima", link: "/listastipomateriaprima" },
    { page: "Materia Primas", link: "/listasmateriaprima" },
    { page: "Compra de Materia Prima", link: "/listacompramateriaprima" },

  ];
  const venta = [
    { page: 'Home', link: '/' },
    { page: "Venta", link: "/listaventa" },
    { page: "Realizar Venta", link: "/createventa" },
  ];
  const pedido = [
    { page: 'Home', link: '/' },
    { page: "Pedidos", link: "/listapedido" },
    { page: "Realizar Pedido", link: "/createpedido" },
  ];
  const producto = [
    { page: 'Home', link: '/' },
    { page: "Tipo Producto", link: "/listastipoproducto" },
    { page: "Tallas", link: "/listastalla" },
    { page: "Modelos", link: "/listasmodelo" },
    { page: "Productos", link: "/listaproducto" },
  ];
  const settings = [
    { page: 'login', link: '/login' }
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TEXTILERIA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user ? <><FadeMenu title={'Personas'} lista={persona} />
                <FadeMenu title={'Materia Prima'} lista={materia} />
                <FadeMenu title={'Producto'} lista={producto} />
                <FadeMenu title={'Venta'} lista={venta} />
                <FadeMenu title={'Pedido'} lista={pedido} /></> : null}


            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TEXTILERIA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user ? <><FadeMenu title={'Personas'} lista={persona} />
              <FadeMenu title={'Materia Prima'} lista={materia} />
              <FadeMenu title={'Producto'} lista={producto} />
              <FadeMenu title={'Venta'} lista={venta} />
              <FadeMenu title={'Pedido'} lista={pedido} /></> : null}


          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...(user !== null && { alt: "Luciano", src: "/static/images/avatar/2.jpg" })}
                  alt="Luciano" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                user ? <MenuItem key={setting.page} onClick={cerrarCesion}>
                  <Typography textAlign="center">cerrar cesion</Typography>
                </MenuItem> : <MenuItem key={setting.page} onClick={handleCloseUserMenu}>
                  <Typography component={Link} to={setting.link} textAlign="center">{setting.page}</Typography>
                </MenuItem>

              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
