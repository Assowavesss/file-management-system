const express = require('express');
const { loginUser } = require('../controllers/login.controller'); // adjust the path as necessary

const router = express.Router();

router.post('/login', loginUser);

module.exports = router;
