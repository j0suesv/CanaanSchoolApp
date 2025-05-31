import dotenv from 'dotenv';
import { pool } from '../config/db.js';

dotenv.config();

const seed = async () => {
  try {
    // Insertar responsable (padre)
    const responsableRes = await pool.query(`
      INSERT INTO responsables (nombre, apellido, telefono, email)
      VALUES ('Carlos', 'Gómez', '3001234567', 'carlos.gomez@correo.com')
      RETURNING id
    `);
    const responsable_id = responsableRes.rows[0].id;

    // Insertar estudiante
    const estudianteRes = await pool.query(`
      INSERT INTO estudiantes (
        nombre, apellido, cedula, fecha_nacimiento,
        edad, curso, valor_matricula, valor_mensualidad, saldo, responsable_id
      )
      VALUES (
        'Lucía', 'Gómez', 1041234567, '2010-03-15',
        14, '8B', 250000, 180000, 0, $1
      ) RETURNING id
    `, [responsable_id]);
    const estudiante_id = estudianteRes.rows[0].id;

    // Obtener método de pago (por nombre)
    const metodoRes = await pool.query(`
      SELECT id FROM metodos_pago WHERE nombre = 'Nequi' LIMIT 1
    `);
    const metodo_pago_id = metodoRes.rows[0].id;

    // Insertar pago
    await pool.query(`
      INSERT INTO pagos (
        estudiante_id, fecha, valor_abonado, mes_abonado, metodo_pago_id, comentarios
      ) VALUES (
        $1, NOW(), 180000, 'Mayo', $2, 'Pago realizado desde Nequi'
      )
    `, [estudiante_id, metodo_pago_id]);

    console.log('✅ Datos de prueba insertados correctamente');
    process.exit();
  } catch (err) {
    console.error('❌ Error insertando datos de prueba:', err);
    process.exit(1);
  }
};

seed();