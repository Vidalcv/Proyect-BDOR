const db = require('../config/db');

function mapAsesoriaRow(rw) {
  return {
    idAsesoria: rw.idasesoria,
    idProfesor: rw.idprofesor,
    idAlumno: rw.idalumno,
    idMateria: rw.idmateria,
    datos_cita: rw.datos_cita,
  };
}

exports.getAll = async (req, res) => {
  try {
    const q = `SELECT a.*, p.nombre as profesor_nombre, m.nombre as materia_nombre
               FROM Asesoria a
               LEFT JOIN Profesor p ON p.idUsuario = a.idProfesor
               LEFT JOIN Materia m ON m.idMateria = a.idMateria`;
    const r = await db.query(q);
    const rows = r.rows.map(rw => ({
      ...mapAsesoriaRow(rw),
      profesor: rw.profesor_nombre,
      materia: rw.materia_nombre,
      fecha: rw.datos_cita ? rw.datos_cita.fecha : null,
      estado: rw.datos_cita ? rw.datos_cita.estado : null,
    }));
    return res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.getById = async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM Asesoria WHERE idAsesoria = $1', [req.params.id]);
    if (r.rowCount === 0) return res.status(404).json({ message: 'No encontrado' });
    return res.json(mapAsesoriaRow(r.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.create = async (req, res) => {
  try {
    const { idProfesor, idAlumno, idMateria, datos_cita } = req.body;
    const q = 'INSERT INTO Asesoria (idProfesor, idAlumno, idMateria, datos_cita) VALUES ($1,$2,$3,$4) RETURNING *';
    const r = await db.query(q, [idProfesor, idAlumno, idMateria, datos_cita]);
    return res.status(201).json(mapAsesoriaRow(r.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { idProfesor, idAlumno, idMateria, datos_cita } = req.body;
    await db.query('UPDATE Asesoria SET idProfesor=$1, idAlumno=$2, idMateria=$3, datos_cita=$4 WHERE idAsesoria=$5', [idProfesor, idAlumno, idMateria, datos_cita, id]);
    const r = await db.query('SELECT * FROM Asesoria WHERE idAsesoria=$1', [id]);
    return res.json(mapAsesoriaRow(r.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM Asesoria WHERE idAsesoria = $1', [req.params.id]);
    return res.json({ message: 'Eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.getByProfesor = async (req, res) => {
  try {
    const id = req.params.id;
    const q = `SELECT a.*, p.nombre as profesor_nombre, m.nombre as materia_nombre, u.nombre as alumno_nombre
               FROM Asesoria a
               LEFT JOIN Profesor p ON p.idUsuario = a.idProfesor
               LEFT JOIN Materia m ON m.idMateria = a.idMateria
               LEFT JOIN Alumno al ON al.idUsuario = a.idAlumno
               LEFT JOIN Usuario u ON u.idUsuario = a.idAlumno
               WHERE a.idProfesor = $1`;
    const r = await db.query(q, [id]);
    return res.json(r.rows.map(rw => ({ ...mapAsesoriaRow(rw), profesor: rw.profesor_nombre, materia: rw.materia_nombre, alumno: rw.alumno_nombre })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.getByAlumno = async (req, res) => {
  try {
    const id = req.params.id;
    const q = `SELECT a.*, p.nombre as profesor_nombre, m.nombre as materia_nombre
               FROM Asesoria a
               LEFT JOIN Profesor p ON p.idUsuario = a.idProfesor
               LEFT JOIN Materia m ON m.idMateria = a.idMateria
               WHERE a.idAlumno = $1`;
    const r = await db.query(q, [id]);
    return res.json(r.rows.map(rw => ({ ...mapAsesoriaRow(rw), profesor: rw.profesor_nombre, materia: rw.materia_nombre })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};
