import Horario from '../models/horario.model.js';
import Servicio from '../models/servicio.model.js';
import Local from '../models/local.model.js';
import RepositoryBase from './RepositoryBase.js';

class HorarioRepository extends RepositoryBase {
    constructor() {
        super(Horario);
    }

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

export default new HorarioRepository();
