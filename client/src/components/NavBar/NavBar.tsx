import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../UserContext';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import withAuth from '../withAuth/withAuth.tsx';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { handleUserLogout } = useContext(UserContext);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const UserButtons = withAuth(
    () => (
      <>
        <Button onClick={handleUserLogout}>Sign out</Button>
        <Button variant={'contained'} component={Link} to="/profile">
          Profile
        </Button>
      </>
    ),
    () => (
      <>
        <Button component={Link} to="/register">
          Register
        </Button>
        <Button variant={'contained'} component={Link} to="/login">
          Login
        </Button>
      </>
    )
  );

  const itemToLink = (item: string) => item.toLowerCase().replace(/\s+/g, '-');

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
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ flex: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            {[
              'Upload Files',
              'Meeting',
              'Evaluation Form',
              'Report Validation',
              'Internship',
              'All Internships',
            ].map((item, index) => (
              <Button component={Link} to={`/${itemToLink(item)}`} key={index}>
                {item}
              </Button>
            ))}
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <UserButtons />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
