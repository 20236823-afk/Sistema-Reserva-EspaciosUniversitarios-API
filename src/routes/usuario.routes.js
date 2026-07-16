import { Router } from 'express';
import { findAll, findOne, create, update, remove, login } from '../controllers/usuario.controller.js';

const router = Router();

router.post('/login', login);   // POST /api/usuarios/login
router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', create);       // registro de alumno
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
