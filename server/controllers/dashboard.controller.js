const db = require('../config/db');

exports.alumnoDashboard = async (req, res) => {
  const id = req.params.id;
  try {
    // Count asesorias del alumno
    const a = await db.query('SELECT COUNT(*) as cnt FROM Asesoria WHERE idAlumno = $1', [id]);
    const totalAses = Number(a.rows[0].cnt || 0);

    // Próxima asesoría
    const p = await db.query("SELECT * FROM Asesoria WHERE idAlumno = $1 AND (datos_cita).fecha >= CURRENT_DATE ORDER BY (datos_cita).fecha, (datos_cita).hora LIMIT 1", [id]);
    const proxima = p.rowCount ? p.rows[0].datos_cita : null;

    // Materias totales
    const m = await db.query('SELECT COUNT(*) as cnt FROM Materia');
    const materias = Number(m.rows[0].cnt || 0);

    // Notificaciones placeholder (0)
    const notificaciones = 0;

    const response = [
      { icon: 'asesorias', title: 'Mis Asesorías', value: totalAses },
      { icon: 'proxima', title: 'Próxima Asesoría', value: proxima ? `${proxima.fecha} ${proxima.hora}` : 'N/A' },
      { icon: 'notificaciones', title: 'Notificaciones', value: notificaciones },
      { icon: 'materias', title: 'Materias', value: materias },
    ];

    return res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};
