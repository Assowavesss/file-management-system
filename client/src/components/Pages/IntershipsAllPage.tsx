import { useState, useEffect } from 'react';
import axios from 'axios';

interface Internship {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  salary: number;
  studentId: number;
  companyId: number;
  tutorId: number; // Ajouté
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

  return (
    <div>
      <h1>Toutes les Internships</h1>
      <ul>
        {internships.map((internship) => (
          <li key={internship.id}>
            <h2>{internship.title}</h2>
            <p>{internship.description}</p>
            <p>Début : {internship.startDate}</p>
            <p>Fin : {internship.endDate}</p>
            <p>Salaire : {internship.salary} EUR</p>
            <p>Student ID : {internship.studentId}</p>
            <p>Company ID : {internship.companyId}</p>
            <p>Tutor ID : {internship.tutorId}</p> {/* Ajouté */}
            {/* Affichez ici d'autres champs de l'internship */}
          </li>
        ))}
      </ul>
    </div>
  );
}
