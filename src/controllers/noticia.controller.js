import noticiaRepository from '../repositories/noticia.repository.js';

const findAll = async (req, res) => {
    try {
        const noticias = await noticiaRepository.findAll();
        return res.status(200).json(noticias);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las noticias' });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = await noticiaRepository.findOne(id);
        if (!noticia) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }
        return res.status(200).json(noticia);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener la noticia' });
    }
};

const create = async (req, res) => {
    try {
        const { titulo, categoria, descripcion } = req.body;
        if (!titulo || titulo.trim() === '' || !descripcion || descripcion.trim() === '') {
            return res.status(400).json({ message: 'El título y la descripción son obligatorios' });
        }
        const nuevaNoticia = await noticiaRepository.create({
            titulo,
            categoria,
            descripcion,
            estado: 'Borrador'
        });
        return res.status(201).json(nuevaNoticia);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear la noticia' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const cambios = req.body;
        const noticiaActualizada = await noticiaRepository.update(id, cambios);
        if (!noticiaActualizada) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }
        return res.status(200).json(noticiaActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar la noticia' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const noticiaEliminada = await noticiaRepository.remove(id);
        if (!noticiaEliminada) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }
        return res.status(200).json({ message: 'Noticia eliminada correctamente', noticia: noticiaEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar la noticia' });
    }
};

export { findAll, findOne, create, update, remove };
