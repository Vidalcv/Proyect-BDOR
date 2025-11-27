const express = require('express');
const router = express.Router();
const asesorias = require('../controllers/asesorias.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, asesorias.getAll);
router.get('/:id', auth, asesorias.getById);
router.post('/', auth, asesorias.create);
router.put('/:id', auth, asesorias.update);
router.delete('/:id', auth, asesorias.remove);

router.get('/profesor/:id', auth, asesorias.getByProfesor);
router.get('/alumno/:id', auth, asesorias.getByAlumno);

module.exports = router;
