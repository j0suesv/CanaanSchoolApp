import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import estudianteRoutes from './routes/estudianteRoutes.js';
import pagoRoutes from './routes/pagoRoutes.js'; // lo usaremos después

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/pagos', pagoRoutes); // se activará después

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});