import { useState, useEffect } from 'react';

import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import './Design/InternshipsAllPage.css';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface Company {
  id: number;
  name: string;
}

interface Tutor {
  id: number;
  user: User;
}

interface Internship {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  salary: number;
  student: User;
  company: Company;
  tutor: Tutor;
  validated: boolean;
}

export default function AllInternships() {
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/internships')
      .then((response) => {
        setInternships(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des stages :', error);
      });
  }, []);

  const handleValidationToggle = (internshipId: number) => {
    setInternships(
      internships.map((internship) => {
        if (internship.id === internshipId) {
          return { ...internship, validated: !internship.validated };
        }
        return internship;
      })
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#000',
          marginBottom: '20px',
          marginTop: '40px',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          backgroundColor: '#fff',
          border: '2px solid #000',
          padding: '10px 20px',
          borderRadius: '10px',
          display: 'inline-block',
          alignItems: 'center',
        }}
      >
        All Internships
      </Typography>

      <TableContainer
        component={Paper}
        style={{ maxWidth: '95%', margin: '20px' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Tutor</TableCell>
              <TableCell>Validation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internships.map((internship) => (
              <TableRow key={internship.id}>
                <TableCell>{internship.title}</TableCell>
                <TableCell>{internship.description}</TableCell>
                <TableCell>{internship.startDate}</TableCell>
                <TableCell>{internship.endDate}</TableCell>
                <TableCell>{internship.salary}</TableCell>
                <TableCell>
                  {internship.student
                    ? `${internship.student.firstName} ${internship.student.lastName}`
                    : 'Chargement...'}
                </TableCell>
                <TableCell>{internship.company.name}</TableCell>
                <TableCell>{`${internship.tutor.user.firstName} ${internship.tutor.user.lastName}`}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={internship.validated ? 'success' : 'error'}
                    onClick={() => handleValidationToggle(internship.id)}
                  >
                    {internship.validated ? 'Validated' : 'Not Validated'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
