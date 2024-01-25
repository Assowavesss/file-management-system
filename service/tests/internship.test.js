const { createInternship } = require('../controllers/internship.controller');
const { Internship, Company, User } = require('../models');

// Mockez les dépendances (facultatif)
jest.mock('../models', () => ({
  Internship: {
    create: jest.fn(),
  },
  Company: {
    findOrCreate: jest.fn(),
  },
  User: {
    findByPk: jest.fn(),
  },
}));

describe('createInternship', () => {
  it('should create an internship', async () => {
    // Mockez les données de la requête
    const req = {
      headers: {
        authorization: 'valid_jwt_token',
      },
      body: {
        // ... Les données de la requête ...
      },
    };

    // Mockez le résultat attendu pour les modèles Sequelize
    const mockCompany = { id: 1 };
    const mockInternship = { id: 1, ...req.body };

    // Configuration des mocks pour les modèles Sequelize
    Company.findOrCreate.mockResolvedValue([mockCompany, true]);
    Internship.create.mockResolvedValue(mockInternship);
    User.findByPk.mockResolvedValue({ id: 4 }); // Utilisateur fictif avec l'ID 4

    // Mockez la réponse HTTP
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Appelez la fonction du contrôleur
    await createInternship(req, res);

    // Vérifiez les appels de fonctions et la réponse HTTP
    expect(Company.findOrCreate).toHaveBeenCalledWith({
      where: { name: req.body.companyName },
      defaults: {
        address: req.body.companyAddress,
        // ... Autres champs de l'entreprise ...
      },
    });
    expect(User.findByPk).toHaveBeenCalledWith(4); // Assurez-vous de l'ID correct
    expect(Internship.create).toHaveBeenCalledWith({
      title: req.body.internshipTitle,
      description: req.body.internshipDescription,
      startDate: req.body.internshipStartDate,
      endDate: req.body.internshipEndDate,
      salary: req.body.internshipSalary,
      CompanyId: mockCompany.id,
      UserId: 4, // Utilisez l'ID de l'utilisateur fictif
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockInternship);
  });

  // Vous pouvez ajouter d'autres tests pour gérer d'autres cas de figure
});
