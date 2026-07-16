import recursoRepository from '../repositories/recurso.repository.js';

const findAll = async (req, res) => {
    try {
        const recursos = await recursoRepository.findAll();
        return res.status(200).json(recursos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los recursos' });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const recurso = await recursoRepository.findOne(id);
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        return res.status(200).json(recurso);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener el recurso' });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, capacidad, estado, servicioId, localId } = req.body;
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ message: 'El nombre del recurso es obligatorio' });
        }
        const nuevoRecurso = await recursoRepository.create({
            nombre, capacidad, estado, servicioId, localId
        });
        return res.status(201).json(nuevoRecurso);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el recurso' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const cambios = req.body;
        const recursoActualizado = await recursoRepository.update(id, cambios);
        if (!recursoActualizado) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        return res.status(200).json(recursoActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el recurso' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const recursoEliminado = await recursoRepository.remove(id);
        if (!recursoEliminado) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        return res.status(200).json({ message: 'Recurso eliminado correctamente', recurso: recursoEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el recurso' });
    }
};

export { findAll, findOne, create, update, remove };
