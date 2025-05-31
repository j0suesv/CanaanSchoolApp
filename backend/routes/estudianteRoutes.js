import express from 'express';
import {
  getEstudiantes,
  crearEstudiante,
  editarEstudiante,
  eliminarEstudiante
} from '../controllers/estudianteController.js';

const router = express.Router();

router.get('/', getEstudiantes); // OJO: este es el que debería responder
router.post('/', crearEstudiante);
router.put('/:id', editarEstudiante);
router.delete('/:id', eliminarEstudiante);

console.log("👉 estudianteRoutes cargado");
console.log("👉 getEstudiantes:", getEstudiantes);


export default router;