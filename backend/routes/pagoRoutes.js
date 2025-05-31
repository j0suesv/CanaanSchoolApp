import express from 'express';
import {
  getPagos,
  crearPago,
  editarPago,
  eliminarPago,
  getResumenPagos // 👈 Asegúrate de importar
} from '../controllers/pagoController.js';

const router = express.Router();

router.get('/', getPagos);
router.get('/estadisticas', getResumenPagos); 
router.post('/', crearPago);
router.put('/:id', editarPago);
router.delete('/:id', eliminarPago);

export default router;