import request from 'supertest';
import app from '../server';

describe('POST /upload', () => {
  it('should upload a file', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('file', '__tests__/testfiles/yourtestfile.jpg')
      .expect(200);

    expect(res.text).toEqual('Fichier téléchargé avec succès');
  });

  it('should fail on upload a non-allowed file type', async () => {
    await request(app)
      .post('/upload')
      .attach('file', '__tests__/testfiles/yourtestfile.txt')
      .expect(400);
  });
});
