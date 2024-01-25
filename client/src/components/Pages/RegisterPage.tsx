import { useState, FormEvent } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';

export default function RegisterForm() {
  const [emailError, setEmailError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const email = data.get('email') as string;

    // Vérification simple de l'email
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError(true);
      return;
    }

    const user = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: email,
      password: data.get('password') as string,
    };
    console.log(user);
    axios
      .post('http://localhost:8080/api/v1/register', user)
      .then((response) => {
        console.log('Registration successful:', response.data);
        setOpenSnackbar(true);
        setEmailError(false);
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setEmailError(false);
      });
    console.log(user);
  };

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
    <Container component="main" maxWidth="sm" style={{ paddingTop: '40px' }}>
      <Paper
        elevation={6}
        style={{ padding: '20px', border: '3px solid black' }}
      >
        <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
          Registration Form
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailError}
                helperText={emailError ? 'Invalid email address' : ''}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: 2, backgroundColor: '#CBB780FF' }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Registration Successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}
