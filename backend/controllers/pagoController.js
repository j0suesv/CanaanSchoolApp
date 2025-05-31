import { pool } from '../models/db.js';

// GET - listar todos los pagos
export const getPagos = async (req, res) => {
  try {
    const result = await pool.query('SELECT p.*, e.nombre,e.apellido, m.nombre as metodo_pago FROM pagos p JOIN estudiantes e on p.estudiante_id =e.id JOIN metodos_pago m ON p.metodo_pago_id = m.id ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener pagos:', err);
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
};

// GET - Estadísticas de pagos para gráficos
export const getResumenPagos = async (req, res) => {
  try {
    const resumen = await pool.query(`
      SELECT 
        TO_CHAR(p.fecha, 'YYYY-MM') AS mes,
        m.nombre AS metodo_pago,
        SUM(p.valor_abonado) AS total
      FROM pagos p
      JOIN metodos_pago m ON p.metodo_pago_id = m.id
      GROUP BY mes, metodo_pago
      ORDER BY mes
    `);

    const rows = resumen.rows;

    // Agrupar por método de pago
    const totalPorMetodo = {};
    // Agrupar por mes
    const ingresosPorMes = {};

    rows.forEach(({ metodo_pago, mes, total }) => {
      // total por método
      totalPorMetodo[metodo_pago] = (totalPorMetodo[metodo_pago] || 0) + Number(total);

      // total por mes
      ingresosPorMes[mes] = (ingresosPorMes[mes] || 0) + Number(total);
    });
     // Total general
    const totalGeneralResult = await pool.query(`
      SELECT COALESCE(SUM(valor_abonado), 0) AS total_general FROM pagos
    `);
    const totalGeneral = parseInt(totalGeneralResult.rows[0].total_general);

    res.json({
      totalPorMetodo: totalPorMetodo,
      ingresosPorMes: ingresosPorMes,
      totalGeneral: totalGeneral
    });

  } catch (err) {
    console.error('Error al obtener estadísticas de pagos:', err);
    res.status(500).json({ error: 'Error al obtener estadísticas de pagos' });
  }
};

// POST - registrar nuevo pago
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
    const result = await pool.query(
      `INSERT INTO pagos (estudiante_id, fecha, valor_abonado, mes_abonado, metodo_pago_id, comentarios)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [estudiante_id, fecha, valor_abonado, mes_abonado, metodo_pago_id, comentarios]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al registrar pago:', err);
    res.status(500).json({ error: 'No se pudo registrar el pago' });
  }
};

// PUT - editar pago
export const editarPago = async (req, res) => {
  const { id } = req.params;
  const {
    estudiante_id,
    fecha,
    valor_abonado,
    mes_abonado,
    metodo_pago_id,
    comentarios
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE pagos
       SET estudiante_id = $1,
           fecha = $2,
           valor_abonado = $3,
           mes_abonado = $4,
           metodo_pago_id = $5,
           comentarios = $6
       WHERE id = $7
       RETURNING *`,
      [estudiante_id, fecha, valor_abonado, mes_abonado, metodo_pago_id, comentarios, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al editar pago:', err);
    res.status(500).json({ error: 'No se pudo editar el pago' });
  }
};

// DELETE - eliminar pago
export const eliminarPago = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM pagos WHERE id = $1', [id]);
    res.json({ mensaje: 'Pago eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar pago:', err);
    res.status(500).json({ error: 'No se pudo eliminar el pago' });
  }
};