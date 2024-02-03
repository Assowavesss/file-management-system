import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
} from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../../UserContext';

const theme = createTheme();

interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  token: string;
  firstName: string;
  lastName: string;
  role: string;
}

export default function LoginPage() {
  const { user, handleLogin, handleUserLogout } = useContext(UserContext);
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<UserData>(
        'http://localhost:8080/api/v1/login',
        loginData
      );

      handleLogin(response.data.token);

      setOpenSnackbar(false);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setSnackbarMessage(
        'Échec de la connexion. Veuillez vérifier vos identifiants.'
      );
      setOpenSnackbar(true);
    }
  };
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    if (isLoggedOut) {
      handleUserLogout();
      setIsLoggedOut(false);
    }
  }, [isLoggedOut, handleLogin, handleUserLogout]);

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" style={{ paddingTop: '40px' }}>
        <Paper
          elevation={6}
          style={{ padding: '20px', border: '3px solid black' }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: 'center' }}
          >
            Login Form
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            component="form"
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Adresse e-mail"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: 2,
                backgroundColor: '#CBB780FF',
              }}
            >
              Sign in
            </Button>
            {user ? (
              <Button
                onClick={handleUserLogout}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: '#CBB780FF',
                }}
              >
                Sign out
              </Button>
            ) : (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      mb: 2,
                      borderRadius: 2,
                      backgroundColor: '#CBB780FF',
                    }}
                  >
                    <NavLink
                      to="/register"
                      style={{ color: '#ffffff', textDecoration: 'none' }}
                    >
                      Register
                    </NavLink>
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
