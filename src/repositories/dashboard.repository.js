import Reserva from '../models/reserva.model.js';
import Servicio from '../models/servicio.model.js';
import Noticia from '../models/noticia.model.js';

// Este repositorio no es CRUD: calcula los indicadores reales
// que muestra el AdminDashboard, contando filas de la base de datos
class DashboardRepository {
    async obtenerIndicadores() {
        const totalReservas = await Reserva.count();
        const confirmadas = await Reserva.count({ where: { estado: 'Confirmado' } });
        const pendientes = await Reserva.count({ where: { estado: 'Pendiente' } });
        const canceladas = await Reserva.count({ where: { estado: 'Cancelado' } });
        const serviciosDisponibles = await Servicio.count({ where: { estado: true } });
        const noticiasPublicadas = await Noticia.count({ where: { estado: 'Publicada' } });

        return {
            totalReservas,
            confirmadas,
            pendientes,
            canceladas,
            serviciosDisponibles,
            noticiasPublicadas
        };
    }
}

export default new DashboardRepository();
