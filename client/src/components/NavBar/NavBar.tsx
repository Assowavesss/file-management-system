import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../UserContext';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, handleUserLogout } = useContext(UserContext);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const renderButtonsBasedOnRole = () => {
    if (!user) {
      // Utilisateur non connecté
      return (
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>
      );
    } else if (user.role === 'Admin') {
      // Utilisateur connecté en tant qu'Admin
      return (
        <>
          <Button component={Link} to="/register">
            Register
          </Button>
          <Button component={Link} to="/internship">
            Internship
          </Button>
          <Button component={Link} to="/all-internships">
            All Internships
          </Button>
          <Button variant="contained" onClick={handleUserLogout}>
            Sign out
          </Button>
        </>
      );
    } else if (user.role === 'Student') {
      // Utilisateur connecté en tant qu'Étudiant
      return (
        <>
          <Button component={Link} to="/internship">
            Internship
          </Button>
          <Button variant="contained" onClick={handleUserLogout}>
            Sign out
          </Button>
        </>
      );
    } else if (user.role === 'Tutor') {
      // Utilisateur connecté en tant que Tuteur
      return (
        <>
          <Button component={Link} to="/all-internships">
            All Internships
          </Button>
          <Button variant="contained" onClick={handleUserLogout}>
            Sign out
          </Button>
        </>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        sx={{ backgroundColor: 'black' }}
        position="static"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ flex: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            {renderButtonsBasedOnRole()}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
