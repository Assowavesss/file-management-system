// __tests__/documentRoutes.test.js
const request = require('supertest');
const app = require('../server'); // Assurez-vous que cela pointe vers votre fichier app.js

describe('POST /upload', () => {
  it('should upload a file', async () => {
    const res = await request(app)
      .post('/upload') // Assurez-vous que le chemin est correct
      .attach('file', '__tests__/testfiles/yourtestfile.jpg') // Remplacez par le chemin de votre fichier de test
      .expect(200);

    expect(res.text).toEqual('Fichier téléchargé avec succès');
  });

  it('should fail on upload a non-allowed file type', async () => {
    await request(app)
      .post('/upload')
      .attach('file', '__tests__/testfiles/yourtestfile.txt') // Un type de fichier non autorisé
      .expect(400);
  });
});
