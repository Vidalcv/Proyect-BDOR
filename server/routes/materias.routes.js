const express = require('express');
const router = express.Router();
const materias = require('../controllers/materias.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, materias.getAll);
router.get('/:id', auth, materias.getById);
router.post('/', auth, materias.create);
router.put('/:id', auth, materias.update);
router.delete('/:id', auth, materias.remove);

module.exports = router;
