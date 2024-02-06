import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../UserContext';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';
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
    } else {
      // Utilisateur connecté, afficher le bouton Profile
      const buttons = [
        <Button
          variant={'contained'}
          component={Link}
          to="/profile"
          key="profile"
        >
          Profile
        </Button>,
      ];

      if (user.role === 'Admin') {
        // Ajouter les boutons pour l'Admin
        buttons.push(
          <Button component={Link} to="/register" key="register">
            Register
          </Button>,
          <Button component={Link} to="/internship" key="internship">
            Internship
          </Button>,
          <Button component={Link} to="/all-internships" key="all-internships">
            All Internships
          </Button>
        );
      } else if (user.role === 'Student') {
        // Ajouter le bouton pour l'Étudiant
        buttons.push(
          <Button component={Link} to="/internship" key="internship">
            Internship
          </Button>,
          <Button component={Link} to="/all-internships" key="all-internships">
            All Internships
          </Button>
        );
      } else if (user.role === 'Tutor') {
        // Ajouter le bouton pour le Tuteur
        buttons.push(
          <Button component={Link} to="/all-internships" key="all-internships">
            All Internships
          </Button>
        );
      }

      // Ajouter le bouton de déconnexion pour tous les utilisateurs connectés
      buttons.push(
        <Button variant="contained" onClick={handleUserLogout} key="signout">
          Sign out
        </Button>
      );

      return buttons;
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
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: 120, marginRight: '10px' }}
          />
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
