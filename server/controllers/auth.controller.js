const db = require('../config/db');
const jwt = require('../utils/jwt');
// Asegúrate de instalar y usar bcrypt para la seguridad real
// const bcrypt = require('bcrypt'); 

function mapUser(row) {
  return {
    idUsuario: row.idusuario,
    nombre: row.nombre,
    contacto: row.contacto,
    departamento: row.departamento,
    carrera: row.carrera,
    semestre: row.semestre,
    fecha_registro: row.fecha_registro,
    // CRÍTICO: Añadimos la columna de hash para la verificación de seguridad
    password_hash: row.password_hash 
  };
}

exports.login = async (req, res) => {
  const { correo, password } = req.body; // CAPTURA LA CONTRASEÑA

  try {
    // 1. Consulta SQL: Busca al usuario por correo usando el UDT (Polimorfismo)
    const q = `
        SELECT * FROM Usuario 
        WHERE (contacto).correo = $1
    `;
    const r = await db.query(q, [correo]);
    
    if (r.rowCount === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    
    const userWithHash = mapUser(r.rows[0]);

    // 2. Verificación de Contraseña (CRÍTICO: Aquí estaba el fallo)
    // En producción, usarías:
    // const passwordMatch = await bcrypt.compare(password, userWithHash.password_hash);
    
    // TEMPORAL: Simulación de verificación si aún no usas bcrypt y tienes la columna 'password_hash'
    // IMPORTANTE: Debes tener un usuario en la DB con 'password_valida' o la contraseña que estés usando.
    const passwordMatch = (password === userWithHash.password_hash); 
    // Si estás usando la inserción sin hasheo (como en el script de usuarios.controller.js), la contraseña debe coincidir directamente.
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // 3. Éxito: Generar Token (Eliminamos el hash antes de devolver el objeto)
    delete userWithHash.password_hash;
    const user = userWithHash;

    const token = jwt.sign({ idUsuario: user.idUsuario, nombre: user.nombre }, jwt.SECRET); // Usar jwt.SECRET
    
    // 4. Devolver la respuesta al cliente
    return res.json({ user, token });

  } catch (err) {
    // Si ocurre un error de DB (ej. columna password_hash no existe), cae aquí.
    console.error("Error FATAL en el proceso de login:", err);
    return res.status(500).json({ message: 'Error interno en el servidor. Verifique la estructura de la DB (password_hash).' });
  }
};