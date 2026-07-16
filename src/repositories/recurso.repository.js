import Recurso from '../models/recurso.model.js';
import Servicio from '../models/servicio.model.js';
import Local from '../models/local.model.js';
import RepositoryBase from './RepositoryBase.js';

class RecursoRepository extends RepositoryBase {
    constructor() {
        super(Recurso);
    }

    // findAll para traer tambien el nombre del servicio y del local
    async findAll() {
        return await this.model.findAll({
            include: [Servicio, Local]
        });
    }

    async findOne(id) {
        return await this.model.findByPk(id, {
            include: [Servicio, Local]
        });
    }
}

export default new RecursoRepository();
