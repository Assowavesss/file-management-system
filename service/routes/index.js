import express from 'express';
import documentApi from './document.js';
import registerApi from './register.js';
import loginApi from './login.js';
import internshipAPI from './internship.js';
import profilAPI from './profil.js';
const router = express.Router();

router.use(documentApi);
router.use(registerApi);
router.use(loginApi);
router.use(internshipAPI);
router.use(profilAPI);
export default router;
