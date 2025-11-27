const db = require('../config/db');

function mapUser(row) {
  // Aseguramos que el mapeo use los nombres de columna correctos de la DB (snake_case a camelCase)
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

// 1. EXPORTACIÓN DE getAll (Corregido)
exports.getAll = async (req, res) => {
  try {
    // Consulta Polimórfica para obtener todos los usuarios, incluyendo las propiedades de las subclases
    // SELECT * FROM Usuario; obtiene todas las columnas de Usuario, Profesor y Alumno (por herencia).
    const r = await db.query('SELECT * FROM Usuario');
    return res.json(r.rows.map(mapUser));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

// 2. EXPORTACIÓN de getById (Corregido)
exports.getById = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id || id === 'undefined') {
      // try from token
      id = req.user?.idUsuario;
      if (!id) return res.status(400).json({ message: 'No id provided' });
    }

    // Consulta Polimórfica
    const r = await db.query('SELECT * FROM Usuario WHERE idUsuario = $1', [id]);
    if (r.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.json(mapUser(r.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};


exports.createUser = async (req, res) => {
    // ASUME que el contacto ya viene como un objeto JSON para el UDT
    // ASUME que el payload de contacto incluye correo y teléfono
    const { nombre, contacto, departamento, carrera, semestre, password } = req.body; 
    let user;

    try {
        // En un escenario real, hashearías la contraseña aquí:
        // const password_hash = await db.hashPassword(password);
        
        // El driver 'node-postgres' debería mapear el objeto JSON de contacto a TipoContacto si está configurado.
        
        if (departamento) {
            // 1. INSERTA SOLO EN LA TABLA HIJA PROFESOR (PostgreSQL crea el registro en Usuario)
            // IMPORTANTE: Se asume que has añadido la columna password_hash en tu script SQL.
            const q = `
                INSERT INTO Profesor (nombre, contacto, departamento, password_hash) 
                VALUES ($1, $2, $3, $4) 
                RETURNING *
            `;
            const r = await db.query(q, [nombre, contacto, departamento, password]); 
            user = r.rows[0];

        } else if (carrera) {
            // 2. INSERTA SOLO EN LA TABLA HIJA ALUMNO
            const q = `
                INSERT INTO Alumno (nombre, contacto, carrera, semestre, password_hash) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *
            `;
            const r = await db.query(q, [nombre, contacto, carrera, semestre, password]);
            user = r.rows[0];

        } else {
            // 3. Usuario base (ej. Admin)
            const q = `
                INSERT INTO Usuario (nombre, contacto, password_hash) 
                VALUES ($1, $2, $3) 
                RETURNING *
            `;
            const r = await db.query(q, [nombre, contacto, password]);
            user = r.rows[0];
        }


        if (!user) return res.status(400).json({ message: 'Error al crear usuario.' });
        return res.status(201).json(mapUser(user));

    } catch (err) {
        console.error("Error al crear usuario:", err);
        // Si hay un error de ORDBMS, se captura aquí.
        res.status(500).json({ message: 'Error interno al crear el usuario. Revise las inserciones ORDBMS.' });
    }
};

exports.updateUser = async (req, res) => {
    // La lógica de UPDATE está OK, ya que actualiza la tabla base y luego las tablas hijas si existen.
    // Solo debes asegurar que los campos de payload existan.
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