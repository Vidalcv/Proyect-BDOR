const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM Materia');
    return res.json(r.rows.map(rw => ({ idMateria: rw.idmateria, nombre: rw.nombre })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.getById = async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM Materia WHERE idMateria = $1', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ message: 'Materia no encontrada' });
    const rw = r.rows[0];
    return res.json({ idMateria: rw.idmateria, nombre: rw.nombre });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const r = await db.query('INSERT INTO Materia (nombre) VALUES ($1) RETURNING *', [nombre]);
    const rw = r.rows[0];
    return res.status(201).json({ idMateria: rw.idmateria, nombre: rw.nombre });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.update = async (req, res) => {
  try {
    const { nombre } = req.body;
    await db.query('UPDATE Materia SET nombre = $1 WHERE idMateria = $2', [nombre, req.params.id]);
    const r = await db.query('SELECT * FROM Materia WHERE idMateria = $1', [req.params.id]);
    const rw = r.rows[0];
    return res.json({ idMateria: rw.idmateria, nombre: rw.nombre });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM Materia WHERE idMateria = $1', [req.params.id]);
    return res.json({ message: 'Eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};
