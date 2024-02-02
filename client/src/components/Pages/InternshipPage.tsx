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

export default function CreateInternshipForm() {
  const [internshipTitle, setInternshipTitle] = useState('');
  const [internshipDescription, setInternshipDescription] = useState('');
  const [internshipStartDate, setInternshipStartDate] = useState('');
  const [internshipEndDate, setInternshipEndDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyTutorFirstName, setCompanyTutorFirstName] = useState('');
  const [companyTutorLastName, setCompanyTutorLastName] = useState('');
  const [companyTutorEmail, setCompanyTutorEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [internshipSalary, setInternshipSalary] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const internshipData = {
      internshipTitle,
      internshipDescription,
      internshipStartDate,
      internshipEndDate,
      companyName,
      companyTutorFirstName,
      companyTutorLastName,
      companyTutorEmail,
      internshipSalary,
    };

    // Utilisation de la fonction getToken pour obtenir le token
    function getToken() {
      return localStorage.getItem('userToken'); // Remplacez 'token' par la clé réelle utilisée pour stocker le token
    }

    // Utilisation de la fonction getToken pour obtenir le token
    const token = getToken();
    axios
      .post('http://localhost:8080/api/v1/internship', internshipData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Internship created successfully:', response.data);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error('Error during internship creation:', error);
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
          Create Internship
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
                required
                fullWidth
                id="internshipTitle"
                label="Title"
                name="internshipTitle"
                value={internshipTitle}
                onChange={(e) => setInternshipTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="internshipDescription"
                label="Description"
                name="internshipDescription"
                multiline
                rows={4}
                value={internshipDescription}
                onChange={(e) => setInternshipDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="internshipStartDate"
                label="Start Date"
                name="internshipStartDate"
                type="date"
                value={internshipStartDate}
                onChange={(e) => setInternshipStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="internshipEndDate"
                label="End Date"
                name="internshipEndDate"
                type="date"
                value={internshipEndDate}
                onChange={(e) => setInternshipEndDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="companyName"
                label="Company Name"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="companyTutorFirstName"
                label="Company Tutor First Name"
                name="companyTutorFirstName"
                value={companyTutorFirstName}
                onChange={(e) => setCompanyTutorFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="companyTutorLastName"
                label="Company Tutor Last Name"
                name="companyTutorLastName"
                value={companyTutorLastName}
                onChange={(e) => setCompanyTutorLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="companyTutorEmail"
                label="Company Tutor Email"
                name="companyTutorEmail"
                type="email"
                value={companyTutorEmail}
                onChange={(e) => setCompanyTutorEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="salary"
                label="Salary"
                name="salary"
                type="number" // Utilisation du type "number" pour les valeurs monétaires
                value={internshipSalary}
                onChange={(e) => setInternshipSalary(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: 2, backgroundColor: '#CBB780FF' }}
          >
            Create Internship
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
          Internship Creation Successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}
