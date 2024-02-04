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

interface Internship {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  salary: number;
  studentId: number;
  companyId: number;
  tutorId: number; // Utiliser tutorId pour stocker l'ID du tuteur
  validated: boolean;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export default function AllInternships() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Effectue une requête GET pour récupérer toutes les internships
    axios
      .get('http://localhost:8080/internships')
      .then((response) => {
        setInternships(response.data);
        // Récupérer les informations sur les utilisateurs
        const tutorIds = response.data.map(
          (internship: Internship) => internship.tutorId
        );
        fetchUsers(tutorIds);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des internships :',
          error
        );
      });
  }, []); // Dépendances vides pour exécuter l'effet une seule fois

  // Fonction pour récupérer les informations des utilisateurs en fonction des IDs
  const fetchUsers = (tutorIds: number[]) => {
    axios
      .get(`http://localhost:8080/users?id=${tutorIds.join(',')}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des utilisateurs :',
          error
        );
      });
  };

  // Associer les informations sur l'utilisateur à l'internship en fonction de l'ID du tuteur
  const getUserName = (tutorId: number) => {
    const user = users.find((user) => user.id === tutorId);
    return user ? `${user.firstName} ${user.lastName}` : 'Pas de tuteur';
  };

  const handleValidationToggle = (internshipId: number) => {
    const updatedInternships = internships.map((internship) => {
      if (internship.id === internshipId) {
        return { ...internship, validated: !internship.validated };
      }
      return internship;
    });
    setInternships(updatedInternships);
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
        Internships
      </Typography>

      <TableContainer
        component={Paper}
        style={{ maxWidth: '1800px', margin: '0 auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Début</TableCell>
              <TableCell>Fin</TableCell>
              <TableCell>Salaire (EUR)</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Company ID</TableCell>
              <TableCell>Tutor ID</TableCell>
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
                <TableCell>{internship.studentId}</TableCell>
                <TableCell>{internship.companyId}</TableCell>
                <TableCell>{getUserName(internship.tutorId)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={internship.validated ? 'success' : 'error'}
                    onClick={() => handleValidationToggle(internship.id)}
                  >
                    {internship.validated ? 'Validé' : 'Non validé'}
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
