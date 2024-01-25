const express = require('express');
const { registerUser } = require('../controllers/register.controller'); // Adjust the path as necessary

const router = express.Router();

router.post('/register', registerUser);

module.exports = router;
