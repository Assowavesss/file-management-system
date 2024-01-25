import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Paper,
} from '@mui/material';

interface FormData {
  companyName: string;
  companyAddress: string;
  city: string;
  tutorName: string;
  tutorEmail: string;
  missionDescription: string;
  startDate: string;
  endDate: string;
  salary: string;
}

function InternshipForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companyAddress: '',
    city: '',
    tutorName: '',
    tutorEmail: '',
    missionDescription: '',
    startDate: '',
    endDate: '',
    salary: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/internship',
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 2, mt: 4, border: '3px solid black' }}>
        <Typography variant="h6" gutterBottom>
          Add a New Internship
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Company Section */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="companyName"
                name="companyName"
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="companyAddress"
                name="companyAddress"
                label="Company Address"
                value={formData.companyAddress}
                onChange={handleChange}
              />
            </Grid>
            {/* Contact Section */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="tutorName"
                name="tutorName"
                label="Tutor's Name"
                value={formData.tutorName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="tutorEmail"
                name="tutorEmail"
                label="Tutor's Email"
                value={formData.tutorEmail}
                onChange={handleChange}
              />
            </Grid>
            {/* Internship Section */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="missionDescription"
                name="missionDescription"
                label="Mission Description"
                multiline
                rows={4}
                value={formData.missionDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                id="startDate"
                name="startDate"
                label="Start Date"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                id="endDate"
                name="endDate"
                label="End Date"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                id="salary"
                name="salary"
                label="Salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: '10px' }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default InternshipForm;
