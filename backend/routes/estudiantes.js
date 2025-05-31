import express from 'express';
import {
  obtenerEstudiantes,
  crearEstudiante
} from '../controllers/estudiantesController.js';

const router = express.Router();

router.get('/', obtenerEstudiantes);
router.post('/', crearEstudiante);

export default router;