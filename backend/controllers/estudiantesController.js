import { pool } from '../config/db.js';

export const obtenerEstudiantes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM estudiantes ORDER BY nombre');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

export const crearEstudiante = async (req, res) => {
  const {
    nombre,
    apellido,
    cedula,
    fecha_nacimiento,
    edad,
    curso,
    valor_matricula,
    valor_mensualidad,
    saldo,
    responsable_id
  } = req.body;

  try {
    await pool.query(`
      INSERT INTO estudiantes (
        nombre, apellido, cedula, fecha_nacimiento,
        edad, curso, valor_matricula, valor_mensualidad, saldo, responsable_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `, [
      nombre, apellido, cedula, fecha_nacimiento,
      edad, curso, valor_matricula, valor_mensualidad, saldo || 0, responsable_id || null
    ]);
    res.status(201).json({ message: 'Estudiante creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
};