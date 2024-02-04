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
  tutorId: number;
  validated: boolean; // Champ de validation ajouté
  // Ajoutez ici d'autres champs de l'internship
}

export default function AllInternships() {
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    // Effectue une requête GET pour récupérer toutes les internships
    axios
      .get('http://localhost:8080/internships')
      .then((response) => {
        // Met à jour le state avec les internships reçues du serveur
        setInternships(response.data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des internships :',
          error
        );
      });
  }, []); // Dépendances vides pour exécuter l'effet une seule fois

  const handleValidationToggle = (internshipId: number) => {
    // Mettez à jour l'état de validation localement en fonction de l'ID de l'internship
    const updatedInternships = internships.map((internship) => {
      if (internship.id === internshipId) {
        return { ...internship, validated: !internship.validated };
      }
      return internship;
    });
    setInternships(updatedInternships);
  };

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#000', // Couleur du texte en noir
          marginBottom: '20px',
          marginTop: '40px',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          backgroundColor: '#fff', // Fond blanc
          border: '2px solid #000', // Bordure solide en noir
          padding: '10px 20px', // Espace intérieur du cadre
          borderRadius: '10px', // Bord arrondi
          display: 'inline-block', // Pour que la largeur soit basée sur le contenu
        }}
      >
        Toutes les Internships
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
              <TableCell>Validation</TableCell> {/* Nouvelle colonne */}
              {/* Ajoutez ici d'autres en-têtes de colonne si nécessaire */}
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
                <TableCell>{internship.tutorId}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={internship.validated ? 'success' : 'error'}
                    onClick={() => handleValidationToggle(internship.id)}
                  >
                    {internship.validated ? 'Validé' : 'Non validé'}
                  </Button>
                </TableCell>
                {/* Affichez ici d'autres champs de l'internship dans des cellules supplémentaires */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
