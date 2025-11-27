const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcrypt'); // Añadir bcrypt

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';

const pool = new Pool({ connectionString });

module.exports = {
  // Función auxiliar para hashear contraseñas antes de guardarlas
  hashPassword: (password) => bcrypt.hash(password, 10), 
  // Función auxiliar para verificar la contraseña
  comparePassword: (password, hash) => bcrypt.compare(password, hash), 
  
  query: (text, params) => pool.query(text, params),
  pool,
};