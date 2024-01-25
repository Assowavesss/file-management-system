import axios from 'axios';

export default axios.create({
  // baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`,

  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});
// Envoie les requêtes entre notre back-end et notre front-end.
