import Reserva from '../models/reserva.model.js';
import Usuario from '../models/usuario.model.js';
import Servicio from '../models/servicio.model.js';
import Local from '../models/local.model.js';
import Recurso from '../models/recurso.model.js';
import RepositoryBase from './RepositoryBase.js';

class ReservaRepository extends RepositoryBase {
    constructor() {
        super(Reserva);
    }

    // la reserva junto con los datos del usuario, servicio, local y recurso
    async findAll() {
        return await this.model.findAll({
            include: [Usuario, Servicio, Local, Recurso],
            order: [['fecha', 'DESC']]
        });
    }

    async findOne(id) {
        return await this.model.findByPk(id, {
            include: [Usuario, Servicio, Local, Recurso]
        });
    }

    // reservas de un usuario especifico 
    async findByUsuario(usuarioId) {
        return await this.model.findAll({
            where: { usuarioId },
            include: [Usuario, Servicio, Local, Recurso],
            order: [['fecha', 'DESC']]
        });
    }
}

export default new ReservaRepository();
