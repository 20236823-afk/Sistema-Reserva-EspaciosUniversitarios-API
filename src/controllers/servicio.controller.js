import servicioRepository from '../repositories/servicio.repository.js';

const findAll = async (req, res) => {
    try {
        const servicios = await servicioRepository.findAll();

        return res.status(200).json(servicios);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error al obtener los servicios'
        });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;

        const servicio = await servicioRepository.findOne(id);

        if (!servicio) {
            return res.status(404).json({
                message: 'Servicio no encontrado'
            });
        }

        return res.status(200).json(servicio);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error al obtener el servicio'
        });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, descripcion, imagen, estado } = req.body;

        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({
                message: 'El nombre del servicio es obligatorio'
            });
        }

        const nuevoServicio = await servicioRepository.create({
            nombre,
            descripcion,
            imagen,
            estado
        });

        return res.status(201).json(nuevoServicio);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error al crear el servicio'
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const cambios = req.body;

        const servicioActualizado = await servicioRepository.update(
            id,
            cambios
        );

        if (!servicioActualizado) {
            return res.status(404).json({
                message: 'Servicio no encontrado'
            });
        }

        return res.status(200).json(servicioActualizado);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error al actualizar el servicio'
        });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const servicioEliminado = await servicioRepository.remove(id);

        if (!servicioEliminado) {
            return res.status(404).json({
                message: 'Servicio no encontrado'
            });
        }

        return res.status(200).json({
            message: 'Servicio eliminado correctamente',
            servicio: servicioEliminado
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error al eliminar el servicio'
        });
    }
};

export {findAll,findOne,create,update,remove} ;