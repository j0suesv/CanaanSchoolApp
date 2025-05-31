import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false // Railway interno no requiere SSL
});

const script = `
CREATE TABLE IF NOT EXISTS responsables (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    telefono TEXT,
    email TEXT
);

CREATE TABLE IF NOT EXISTS estudiantes (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    cedula BIGINT UNIQUE NOT NULL,
    fecha_nacimiento DATE,
    edad INT,
    curso TEXT,
    valor_matricula INT,
    valor_mensualidad INT,
    saldo INT DEFAULT 0,
    responsable_id INT REFERENCES responsables(id)
);

CREATE TABLE IF NOT EXISTS metodos_pago (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pagos (
    id SERIAL PRIMARY KEY,
    estudiante_id INT REFERENCES estudiantes(id),
    fecha DATE NOT NULL,
    valor_abonado INT NOT NULL,
    mes_abonado TEXT NOT NULL,
    metodo_pago_id INT REFERENCES metodos_pago(id),
    comentarios TEXT
);

INSERT INTO metodos_pago (nombre) VALUES 
  ('Efectivo'), 
  ('Nequi'), 
  ('Bancolombia'), 
  ('Transfiya'), 
  ('Davivienda')
ON CONFLICT DO NOTHING;
`;

(async () => {
  try {
    await pool.query(script);
    console.log("✅ Tablas creadas correctamente.");
    process.exit();
  } catch (err) {
    console.error("❌ Error creando tablas:", err);
    process.exit(1);
  }
})();