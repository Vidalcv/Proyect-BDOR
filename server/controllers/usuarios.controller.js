const db = require('../config/db');

function mapUser(row) {
  return {
    idUsuario: row.idusuario,
    nombre: row.nombre,
    contacto: row.contacto,
    departamento: row.departamento,
    carrera: row.carrera,
    semestre: row.semestre,
    fecha_registro: row.fecha_registro,
  };
}

exports.getAll = async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM Usuario');
    return res.json(r.rows.map(mapUser));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

// GET /api/usuarios/:id?  -> if id missing or 'undefined', return current user from token
exports.getById = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id || id === 'undefined') {
      // try from token
      id = req.user?.idUsuario;
      if (!id) return res.status(400).json({ message: 'No id provided' });
    }

    const r = await db.query('SELECT * FROM Usuario WHERE idUsuario = $1', [id]);
    if (r.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.json(mapUser(r.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.createUser = async (req, res) => {
  const { nombre, contacto, departamento, carrera, semestre } = req.body;
  try {
    const q = 'INSERT INTO Usuario (nombre, contacto) VALUES ($1, $2) RETURNING *';
    const r = await db.query(q, [nombre, contacto]);
    const user = r.rows[0];

    // if professor or alumno insert into child tables
    if (departamento) {
      await db.query('INSERT INTO Profesor (idUsuario, nombre, contacto, departamento) VALUES ($1, $2, $3, $4)', [user.idusuario, nombre, contacto, departamento]);
    }
    if (carrera) {
      await db.query('INSERT INTO Alumno (idUsuario, nombre, contacto, carrera, semestre) VALUES ($1, $2, $3, $4, $5)', [user.idusuario, nombre, contacto, carrera, semestre]);
    }

    return res.status(201).json(mapUser(user));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    // update Usuario (only nombre and contacto)
    await db.query('UPDATE Usuario SET nombre = $1, contacto = $2 WHERE idUsuario = $3', [payload.nombre, payload.contacto, id]);
    // update child tables if present
    if (payload.departamento) {
      await db.query('UPDATE Profesor SET departamento = $1 WHERE idUsuario = $2', [payload.departamento, id]);
    }
    if (payload.carrera) {
      await db.query('UPDATE Alumno SET carrera = $1, semestre = $2 WHERE idUsuario = $3', [payload.carrera, payload.semestre, id]);
    }

    const r = await db.query('SELECT * FROM Usuario WHERE idUsuario = $1', [id]);
    return res.json(mapUser(r.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};
