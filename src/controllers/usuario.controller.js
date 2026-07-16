import usuarioRepository from '../repositories/usuario.repository.js';
import Usuario from '../models/usuario.model.js';

const findAll = async (req, res) => {
    try {
        const usuarios = await usuarioRepository.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioRepository.findOne(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

// Registro de un nuevo alumno (rol siempre 'estudiante' desde el registro publico)
const create = async (req, res) => {
    try {
        const { nombre, correo, password, codigo } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios' });
        }

        const existente = await Usuario.findOne({ where: { correo: correo.trim().toLowerCase() } });
        if (existente) {
            return res.status(400).json({ message: 'Ese correo ya está registrado' });
        }

        const nuevoUsuario = await usuarioRepository.create({
            nombre,
            correo: correo.trim().toLowerCase(),
            password,
            codigo,
            rol: 'estudiante'
        });

        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const cambios = req.body;
        const usuarioActualizado = await usuarioRepository.update(id, cambios);
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await usuarioRepository.remove(id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: 'Usuario eliminado correctamente', usuario: usuarioEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

// valida correo y contraseña devuelve el usuario si coincide
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({ message: 'Completa tu correo y contraseña' });
        }

        const usuario = await Usuario.findOne({
            where: { correo: correo.trim().toLowerCase() }
        });

        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

export { findAll, findOne, create, update, remove, login };
