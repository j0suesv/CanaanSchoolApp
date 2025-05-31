import { pool } from '../config/db.js';

export const obtenerPagos = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT pagos.*, e.nombre, e.apellido
      FROM pagos
      JOIN estudiantes e ON pagos.estudiante_id = e.id
      ORDER BY fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
};

export const crearPago = async (req, res) => {
  const {
    estudiante_id,
    fecha,
    valor_abonado,
    mes_abonado,
    metodo_pago_id,
    comentarios
  } = req.body;

  try {
    await pool.query(`
      INSERT INTO pagos (
        estudiante_id, fecha, valor_abonado,
        mes_abonado, metodo_pago_id, comentarios
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      estudiante_id,
      fecha,
      valor_abonado,
      mes_abonado,
      metodo_pago_id,
      comentarios || null
    ]);

    res.status(201).json({ message: 'Pago registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar pago:', error);
    res.status(500).json({ error: 'Error al registrar pago' });
  }
};