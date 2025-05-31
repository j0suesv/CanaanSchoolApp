import express from 'express';
import cors from 'cors';
import estudiantesRoutes from './routes/estudiantes.js';
import pagosRoutes from './routes/pagos.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/pagos', pagosRoutes);

export default app;