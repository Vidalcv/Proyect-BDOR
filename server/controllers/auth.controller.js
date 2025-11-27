const db = require('../config/db');
const jwt = require('../utils/jwt');

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

exports.login = async (req, res) => {
  const { correo } = req.body;
  try {
    const q = `SELECT * FROM Usuario WHERE (contacto).correo = $1`;
    const r = await db.query(q, [correo]);
    if (r.rowCount === 0) return res.status(401).json({ message: 'Usuario no encontrado' });
    const user = mapUser(r.rows[0]);

    const token = jwt.sign({ idUsuario: user.idUsuario, nombre: user.nombre });

    return res.json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno' });
  }
};
