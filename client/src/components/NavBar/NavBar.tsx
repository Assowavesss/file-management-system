import { useContext, useState, useCallback, FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { UserContext } from '../../../UserContext';
import logo from '../../assets/logo.png';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode without destructuring
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems: string[] = [
  'Home',
  'Internship',
  'Upload Files',
  'Meeting',
  'Evaluation Form',
  'Report Validation',
  'Register',
  'Login',
];

interface JwtPayload {
  role: string;
  lastName: string;
  firstName: string;
  id: string;
}

const DesktopNavbar: FC = () => {
  const { user, handleUserLogout } = useContext(UserContext);

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {navItems.map((item, index) => (
        <Button
          key={index}
          component={Link}
          to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
          sx={{
            color: '#CBB780FF',
            '&:hover': { backgroundColor: '#f0e6d2' },
          }}
        >
          {item}
        </Button>
      ))}

      {user ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: '#CBB780FF', ml: 10, mr: 2 }}
          >
            {user.firstName} {user.lastName}
          </Typography>
          <Button variant="outlined" color="inherit" onClick={handleUserLogout}>
            Sign out
          </Button>
        </div>
      ) : (
        <Button
          component={Link}
          to="/login"
          sx={{
            color: '#CBB780FF',
            '&:hover': { backgroundColor: '#f0e6d2' },
            ml: 2,
          }}
        >
          Connexion
        </Button>
      )}
    </Box>
  );
};

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, handleLogin } = useContext(UserContext);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');

    if (userToken && !user) {
      // Only proceed if there is a token and no user is currently logged in
      try {
        const decodedToken = jwtDecode(userToken) as JwtPayload;

        const userData = {
          token: userToken,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          role: decodedToken.role,
        };

        handleLogin(userData);
      } catch (error) {
        console.error('Error decoding token:', error);
        // Consider adding logic to handle an invalid token here, like redirecting to login
      }
    }
  }, [handleLogin, user]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        style={{ backgroundColor: 'black' }}
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
          <img className="logo" src={logo} alt="Logo" />
          <DesktopNavbar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
