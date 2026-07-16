import { Router } from 'express';
import { findAll, findOne, create, update, remove } from '../controllers/noticia.controller.js';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
