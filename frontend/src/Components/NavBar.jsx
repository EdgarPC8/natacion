import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PoolIcon from "@mui/icons-material/Pool";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

function ResponsiveAppBar() {
  const { isAuthenticated, logout, user, isLoading } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [moreMenuAnchors, setMoreMenuAnchors] = useState({});
  const [mobileMenuAnchors, setMobileMenuAnchors] = useState({});

  const location = useLocation();

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

  const handleMoreMenuOpen = (id) => (event) => {
    setMoreMenuAnchors((prevAnchors) => ({
      ...prevAnchors,
      [id]: event.currentTarget,
    }));
  };

  const handleMoreMenuClose = (id) => () => {
    setMoreMenuAnchors((prevAnchors) => ({
      ...prevAnchors,
      [id]: null,
    }));
  };

  const handleMobileMenuOpen = (id) => (event) => {
    setMobileMenuAnchors((prevAnchors) => ({
      ...prevAnchors,
      [id]: event.currentTarget,
    }));
  };

  const handleMobileMenuClose = (id) => () => {
    setMobileMenuAnchors((prevAnchors) => ({
      ...prevAnchors,
      [id]: null,
    }));
  };

  const settings = [
    {
      name: "Perfil",
      link: "/perfil",
      icon: <AdbIcon />,
      function: () => {
        /* Agrega la función correspondiente */
      },
    },
    { name: "Cerrar Sesión", link: "/", icon: <AdbIcon />, function: logout }, // Asumiendo que 'logout' es una función definida
  ];

  const permisos = {
    Programador: [
      {
        name: "Progreso",
        icon: <AdbIcon />,
        menu: {
          items: [
            { name: "Mi Progreso", link: "/miprogreso", icon: <AdbIcon /> },
            { name: "Todos los progresos", link: "/progreso", icon: <AdbIcon /> },
          ],
        },
      },
      {
        name: "Tablas",
        icon: <AdbIcon />,
        menu: {
          items: [
            { name: "Metros", link: "/metros", icon: <AdbIcon /> },
            { name: "Pruebas", link: "/pruebas", icon: <AdbIcon /> },
            { name: "Tiempos", link: "/tiempos", icon: <AdbIcon /> },
            { name: "Nadadores", link: "/nadadores", icon: <AdbIcon /> },
            { name: "Institucion", link: "/institucion", icon: <AdbIcon /> },
            { name: "Usuarios", link: "/usuarios", icon: <AdbIcon /> },
          ],
        },
      },
      {
        name: "Competencia",
        icon: <AdbIcon />,
        menu: {
          items: [
            { name: "Crear", link: "/competencia", icon: <AdbIcon /> },
            { name: "Organizar", link: "/organizar", icon: <AdbIcon /> },
            { name: "Llenar", link: "/competencia/insert", icon: <AdbIcon /> },
            { name: "Resultados", link: "/competencia/resultados", icon: <AdbIcon /> },
          ],
        },
      },
      {
        name: "Panel de programador",
        icon: <AdbIcon />,
        menu: {
          items: [
            { name: "Config Home", link: "/panel-programador", icon: <AdbIcon /> },
            { name: "Comandos", link: "/comandos", icon: <AdbIcon /> },
            { name: "CronoSwim", link: "/cronoswim", icon: <AdbIcon /> },
          ],
        },
      },
    ],
    Administrador: [
      { name: "Nadadores", link: "/nadadores", icon: <AdbIcon /> },
      { name: "Tiempos", link: "/tiempos", icon: <AdbIcon /> },
    ],
    Usuario: [
      {
        name: "Progreso",
        icon: <AdbIcon />,
        menu: {
          items: [
            { name: "Mi Progreso", link: "/miprogreso", icon: <AdbIcon /> },
          ],
        },
      },
    ],
  };

  const pagesToShow = permisos[user.nameRol] || [];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Natación
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pagesToShow.map((page, index) => {
                if (page.menu) {
                  const mobileMenuId = `${page.name.toLowerCase()}-menu-mobile-${index}`;
                  return (
                    <React.Fragment key={page.name}>
                      <MenuItem onClick={handleMobileMenuOpen(mobileMenuId)}>
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                      <Menu
                        id={mobileMenuId}
                        anchorEl={mobileMenuAnchors[mobileMenuId]}
                        keepMounted
                        open={Boolean(mobileMenuAnchors[mobileMenuId])}
                        onClose={handleMobileMenuClose(mobileMenuId)}
                      >
                        {page.menu.items.map((item) => (
                          <MenuItem
                            key={item.name}
                            onClick={handleMobileMenuClose(mobileMenuId)}
                            component={Link}
                            to={item.link}
                          >
                            <Typography textAlign="center">{item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <MenuItem
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to={page.link}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
          <PoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Natación
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pagesToShow.map((page, index) => {
              if (page.menu) {
                const menuId = `${page.name.toLowerCase()}-menu-${index}`;
                return (
                  <React.Fragment key={page.name}>
                    <Tabs
                      value={false}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                      <Tab
                        label={page.name}
                        onClick={handleMoreMenuOpen(menuId)}
                        sx={{ my: 2, color: "white" }}
                      />
                    </Tabs>
                    <Menu
                      id={menuId}
                      anchorEl={moreMenuAnchors[menuId]}
                      keepMounted
                      open={Boolean(moreMenuAnchors[menuId])}
                      onClose={handleMoreMenuClose(menuId)}
                    >
                      {page.menu.items.map((item) => (
                        <MenuItem
                          key={item.name}
                          onClick={handleMoreMenuClose(menuId)}
                          component={Link}
                          to={item.link}
                        >
                          <Typography textAlign="center">{item.name}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </React.Fragment>
                );
              } else {
                return (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.link}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                );
              }
            })}
          </Box>

          {!isLoading && isAuthenticated ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      setting.function();
                      handleCloseUserMenu();
                    }}
                    component={Link}
                    to={setting.link}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            location.pathname !== "/login" && (
              <Button color="inherit" component={Link} to="/login">
                Iniciar sesión
              </Button>
            )
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
