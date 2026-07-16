import { Router } from 'express';
import { obtenerIndicadores } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/', obtenerIndicadores); // GET /api/dashboard

export default router;
