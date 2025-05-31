import express from 'express';
import {
  obtenerPagos,
  crearPago
} from '../controllers/pagosController.js';

const router = express.Router();

router.get('/', obtenerPagos);
router.post('/', crearPago);

export default router;