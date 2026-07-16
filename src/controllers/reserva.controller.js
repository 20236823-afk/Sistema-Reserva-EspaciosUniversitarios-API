import reservaRepository from '../repositories/reserva.repository.js';
import Recurso from '../models/recurso.model.js';

const LIMITE_DIARIO_MIN = 120; // maximo 2 horas de reserva por alumno por diaaaa

// Convierte "HH:MM" o "HH:MM:SS" a minutos desde medianoche
const aMinutos = (hora) => {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
};

const findAll = async (req, res) => {
    try {
        const reservas = await reservaRepository.findAll();
        return res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las reservas' });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await reservaRepository.findOne(id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        return res.status(200).json(reserva);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener la reserva' });
    }
};

// Reservas de un usuario especifico (para "Mis reservas" del estudiante)
const findByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const reservas = await reservaRepository.findByUsuario(usuarioId);
        return res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las reservas del usuario' });
    }
};

const create = async (req, res) => {
    try {
        const { usuarioId, servicioId, localId, recursoId, fecha, horaInicio, duracion } = req.body;

        if (!usuarioId || !servicioId || !fecha || !horaInicio || !duracion) {
            return res.status(400).json({ message: 'Faltan datos obligatorios para la reserva' });
        }

        // Regla 1: si se indico un recurso, debe estar Disponible
        if (recursoId) {
            const recurso = await Recurso.findByPk(recursoId);
            if (!recurso) {
                return res.status(404).json({ message: 'Recurso no encontrado' });
            }
            if (recurso.estado !== 'Disponible') {
                return res.status(400).json({ message: 'Este recurso no está disponible para reservar' });
            }
        }

        // Regla 2: no permitir reservas en fecha/hora pasada
        const inicio = new Date(`${fecha}T${horaInicio}`);
        if (inicio < new Date()) {
            return res.status(400).json({ message: 'No puedes reservar en una fecha u hora pasada' });
        }

        // Regla 3: anti-choque de horario en el mismo recurso y fecha
        if (recursoId) {
            const reservasDelDia = await reservaRepository.model.findAll({
                where: { recursoId, fecha }
            });

            const iniNueva = aMinutos(horaInicio);
            const finNueva = iniNueva + Number(duracion);

            const hayChoque = reservasDelDia.some((r) => {
                if (r.estado === 'Cancelado') return false;
                const iniExistente = aMinutos(r.horaInicio);
                const finExistente = iniExistente + r.duracion;
                return iniNueva < finExistente && iniExistente < finNueva;
            });

            if (hayChoque) {
                return res.status(400).json({ message: 'Ese recurso ya tiene una reserva que se cruza con ese horario' });
            }
        }

        // Regla 4: limite de 2 horas de reserva por alumno por dia (no cuentan las canceladas)
        const reservasDelUsuarioEseDia = await reservaRepository.model.findAll({
            where: { usuarioId, fecha }
        });

        const minutosYaReservados = reservasDelUsuarioEseDia
            .filter((r) => r.estado !== 'Cancelado')
            .reduce((total, r) => total + r.duracion, 0);

        if (minutosYaReservados + Number(duracion) > LIMITE_DIARIO_MIN) {
            const restante = LIMITE_DIARIO_MIN - minutosYaReservados;
            return res.status(400).json({
                message: restante <= 0
                    ? 'Ya alcanzaste tu límite de 2 horas de reservas para ese día'
                    : `Solo te quedan ${restante} min disponibles ese día (máximo 2 horas por día)`
            });
        }

        const nuevaReserva = await reservaRepository.create({
            usuarioId, servicioId, localId, recursoId, fecha, horaInicio, duracion,
            estado: 'Pendiente'
        });

        return res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear la reserva' });
    }
};

// Cambia el estado de una reserva (aprobar/confirmar, rechazar/cancelar)
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const cambios = req.body;
        const reservaActualizada = await reservaRepository.update(id, cambios);
        if (!reservaActualizada) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        return res.status(200).json(reservaActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar la reserva' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const reservaEliminada = await reservaRepository.remove(id);
        if (!reservaEliminada) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        return res.status(200).json({ message: 'Reserva eliminada correctamente', reserva: reservaEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar la reserva' });
    }
};

export { findAll, findOne, findByUsuario, create, update, remove };
