const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const auth = require('../middleware/auth.middleware');

// GET /api/usuarios/  - requires auth to return current user
router.get('/', auth, usuariosController.getAll);
router.get('/:id', auth, usuariosController.getById);
router.post('/', usuariosController.createUser);
router.put('/:id', auth, usuariosController.updateUser);

module.exports = router;
