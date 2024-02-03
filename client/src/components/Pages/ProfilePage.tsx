import React, { useState, FormEvent, useEffect } from 'react';
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
import { UserContext } from '../../../UserContext';
export default function ProfileEditForm() {
  const { user } = React.useContext(UserContext);
  const [emailError, setEmailError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: '', // Laissez vide pour ne pas modifier le mot de passe
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '', // Leave it blank to keep the current password
      });
    }
  }, [user]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const email = data.get('email') as string;

    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError(true);
      return;
    }

    const updatedUser = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: email,
      password: data.get('password') as string,
    };
    console.log('formData:', formData);

    axios
      .put('http://localhost:8080/api/v1/profile', updatedUser, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        console.log('Profile updated:', response.data);
        // Log the new token
        setOpenSnackbar(true);
        setEmailError(false);
        // Update the token in the user context
      })
      .catch((error) => {
        console.error('Error during profile update:', error);
        setEmailError(false);
      });
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
          Edit Profile
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
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
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
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="Leave blank to keep current password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: 2, backgroundColor: '#CBB780FF' }}
          >
            Update Profile
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
          Profile Updated!
        </Alert>
      </Snackbar>
    </Container>
  );
}
