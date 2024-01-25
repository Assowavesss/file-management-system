const express = require('express');
const documentApi = require('./document.routes');
const registerApi = require('./register.routes');
const loginApi = require('./login.routes');
const internshipAPI = require('./internship.routes');

const router = express.Router();

router.use(documentApi);
router.use(registerApi);
router.use(loginApi);
router.use(internshipAPI);
module.exports = router;
