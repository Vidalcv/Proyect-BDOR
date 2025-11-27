const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboard.controller');
const auth = require('../middleware/auth.middleware');

router.get('/alumno/:id', auth, dashboard.alumnoDashboard);

module.exports = router;
