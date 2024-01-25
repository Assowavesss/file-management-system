import { useState, useCallback, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { Menu } from '@mui/icons-material';

const drawerWidth = 240;
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

interface MobileNavbarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawer: ReactNode;
}

const MobileNavbar: FC<MobileNavbarProps> = ({
  mobileOpen,
  handleDrawerToggle,
  drawer,
}) => {
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  );
};

interface DesktopNavbarProps {
  navItems: string[];
}

const DesktopNavbar: FC<DesktopNavbarProps> = ({ navItems }) => {
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
    </Box>
  );
};

const Navbar: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const drawer = (
    <div className="headerbar">
      <Box sx={{ textAlign: 'center' }}>
        <img className="logo" src={logo} alt="Logo" />
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                sx={{ textAlign: 'center' }}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

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
            <Menu />
          </IconButton>
          <img className="logo" src={logo} alt="Logo" />
          <DesktopNavbar navItems={navItems} />
          <Button color={'primary'}></Button>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <MobileNavbar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawer={drawer}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
