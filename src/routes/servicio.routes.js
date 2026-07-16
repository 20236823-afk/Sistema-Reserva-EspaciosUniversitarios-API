import { Router } from 'express';
import {findAll,findOne,create,update,remove} from '../controllers/servicio.controller.js';

const router = Router();

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;