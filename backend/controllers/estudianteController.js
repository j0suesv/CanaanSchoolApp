import { pool } from '../models/db.js';

// GET - listar estudiantes
export const getEstudiantes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener estudiantes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// POST - crear estudiante
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
    const result = await pool.query(
      `INSERT INTO estudiantes 
      (nombre, apellido, cedula, fecha_nacimiento, edad, curso, valor_matricula, valor_mensualidad, saldo, responsable_id) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [nombre, apellido, cedula, fecha_nacimiento, edad, curso, valor_matricula, valor_mensualidad, saldo, responsable_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear estudiante:', err);
    res.status(500).json({ error: 'No se pudo crear el estudiante' });
  }
};

// PUT - editar estudiante
export const editarEstudiante = async (req, res) => {
  const { id } = req.params;
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
    const result = await pool.query(
      `UPDATE estudiantes SET 
      nombre=$1, apellido=$2, cedula=$3, fecha_nacimiento=$4, edad=$5, curso=$6, 
      valor_matricula=$7, valor_mensualidad=$8, saldo=$9, responsable_id=$10 
      WHERE id=$11 RETURNING *`,
      [nombre, apellido, cedula, fecha_nacimiento, edad, curso, valor_matricula, valor_mensualidad, saldo, responsable_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al editar estudiante:', err);
    res.status(500).json({ error: 'No se pudo editar el estudiante' });
  }
};

// DELETE - eliminar estudiante
export const eliminarEstudiante = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM estudiantes WHERE id = $1', [id]);
    res.json({ mensaje: 'Estudiante eliminado' });
  } catch (err) {
    console.error('Error al eliminar estudiante:', err);
    res.status(500).json({ error: 'No se pudo eliminar el estudiante' });
  }
};
