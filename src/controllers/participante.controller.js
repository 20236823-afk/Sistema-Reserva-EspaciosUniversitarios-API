import participanteRepository from '../repositories/participante.repository.js';

const findAll = async (req, res) => {
    try {
        const participantes = await participanteRepository.findAll();
        return res.status(200).json(participantes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los participantes' });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const participante = await participanteRepository.findOne(id);
        if (!participante) {
            return res.status(404).json({ message: 'Participante no encontrado' });
        }
        return res.status(200).json(participante);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener el participante' });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, codigo, reservaId } = req.body;
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ message: 'El nombre del participante es obligatorio' });
        }
        const nuevoParticipante = await participanteRepository.create({ nombre, codigo, reservaId });
        return res.status(201).json(nuevoParticipante);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el participante' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const cambios = req.body;
        const participanteActualizado = await participanteRepository.update(id, cambios);
        if (!participanteActualizado) {
            return res.status(404).json({ message: 'Participante no encontrado' });
        }
        return res.status(200).json(participanteActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el participante' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const participanteEliminado = await participanteRepository.remove(id);
        if (!participanteEliminado) {
            return res.status(404).json({ message: 'Participante no encontrado' });
        }
        return res.status(200).json({ message: 'Participante eliminado correctamente', participante: participanteEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el participante' });
    }
};

export { findAll, findOne, create, update, remove };
