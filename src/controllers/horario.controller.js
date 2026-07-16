import horarioRepository from '../repositories/horario.repository.js';

const findAll = async (req, res) => {
    try {
        const horarios = await horarioRepository.findAll();
        return res.status(200).json(horarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los horarios' });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const horario = await horarioRepository.findOne(id);
        if (!horario) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        return res.status(200).json(horario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener el horario' });
    }
};

const create = async (req, res) => {
    try {
        const { fecha, horaInicio, horaFin, estado, servicioId, localId } = req.body;
        if (!fecha || !horaInicio || !horaFin) {
            return res.status(400).json({ message: 'Fecha, hora de inicio y hora de fin son obligatorias' });
        }
        const nuevoHorario = await horarioRepository.create({
            fecha, horaInicio, horaFin, estado, servicioId, localId
        });
        return res.status(201).json(nuevoHorario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el horario' });
    }
};

// cambia el estado del horario: dispo (liberar), ocupado, bloqueado
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const cambios = req.body;
        const horarioActualizado = await horarioRepository.update(id, cambios);
        if (!horarioActualizado) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        return res.status(200).json(horarioActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el horario' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const horarioEliminado = await horarioRepository.remove(id);
        if (!horarioEliminado) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        return res.status(200).json({ message: 'Horario eliminado correctamente', horario: horarioEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el horario' });
    }
};

export { findAll, findOne, create, update, remove };
