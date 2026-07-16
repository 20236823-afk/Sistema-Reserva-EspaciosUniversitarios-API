import localRepository from '../repositories/local.repository.js';

const findAll = async (req, res) => {
    try {
        const locales = await localRepository.findAll();
        return res.status(200).json(locales);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los locales' });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const local = await localRepository.findOne(id);
        if (!local) {
            return res.status(404).json({ message: 'Local no encontrado' });
        }
        return res.status(200).json(local);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener el local' });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, direccion } = req.body;
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ message: 'El nombre del local es obligatorio' });
        }
        const nuevoLocal = await localRepository.create({ nombre, direccion });
        return res.status(201).json(nuevoLocal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el local' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const cambios = req.body;
        const localActualizado = await localRepository.update(id, cambios);
        if (!localActualizado) {
            return res.status(404).json({ message: 'Local no encontrado' });
        }
        return res.status(200).json(localActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el local' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const localEliminado = await localRepository.remove(id);
        if (!localEliminado) {
            return res.status(404).json({ message: 'Local no encontrado' });
        }
        return res.status(200).json({ message: 'Local eliminado correctamente', local: localEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el local' });
    }
};

export { findAll, findOne, create, update, remove };
