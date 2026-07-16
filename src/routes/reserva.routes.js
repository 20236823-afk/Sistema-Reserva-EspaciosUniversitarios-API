import { Router } from 'express';
import { findAll, findOne, findByUsuario, create, update, remove } from '../controllers/reserva.controller.js';

const router = Router();

router.get('/', findAll);
router.get('/usuario/:usuarioId', findByUsuario); // GET /api/reservas/usuario/5
router.get('/:id', findOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
