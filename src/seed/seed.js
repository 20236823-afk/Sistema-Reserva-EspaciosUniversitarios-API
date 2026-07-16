
import 'dotenv/config';
import sequelize from '../config/database.js';

import Usuario from '../models/usuario.model.js';
import Local from '../models/local.model.js';
import Servicio from '../models/servicio.model.js';
import Recurso from '../models/recurso.model.js';
import Reserva from '../models/reserva.model.js';
import Noticia from '../models/noticia.model.js';
import Horario from '../models/horario.model.js';

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos. Insertando datos de prueba...');

        // Usuarios
        const [admin] = await Usuario.findOrCreate({
            where: { correo: 'admin@ulima.edu.pe' },
            defaults: {
                nombre: 'Administrador ULima',
                password: 'admin123',
                rol: 'admin',
                codigo: null
            }
        });

        const [alumno] = await Usuario.findOrCreate({
            where: { correo: 'alumno@ulima.edu.pe' },
            defaults: {
                nombre: 'Antonio Sifuentes',
                password: 'alumno123',
                rol: 'estudiante',
                codigo: '20236823'
            }
        });

        // localessssssss
        const [localDeportivo] = await Local.findOrCreate({
            where: { nombre: 'Centro Deportivo Mayorazgo' },
            defaults: { direccion: 'Av. Javier Prado Este' }
        });
        const [localBiblioteca] = await Local.findOrCreate({
            where: { nombre: 'Biblioteca Central' },
            defaults: { direccion: 'Campus Ulima' }
        });
        const [localSercom] = await Local.findOrCreate({
            where: { nombre: 'SERCOM' },
            defaults: { direccion: 'Campus Ulima' }
        });
        const [localLab] = await Local.findOrCreate({
            where: { nombre: 'Pabellón S' },
            defaults: { direccion: 'Campus Ulima' }
        });

        // serviciossssssssss
        const [servicioDeportivo] = await Servicio.findOrCreate({
            where: { nombre: 'Ambientes deportivos' },
            defaults: { descripcion: 'Canchas, piscina y espacios deportivos del campus.', estado: true }
        });
        const [servicioTecnico] = await Servicio.findOrCreate({
            where: { nombre: 'Reserva de ambientes técnicos (SERCOM)' },
            defaults: { descripcion: 'Salas y ambientes técnicos administrados por SERCOM.', estado: true }
        });
        const [servicioLab] = await Servicio.findOrCreate({
            where: { nombre: 'Reserva de Laboratorios' },
            defaults: { descripcion: 'Laboratorios de ciencias e ingeniería.', estado: true }
        });
        const [servicioEquipos] = await Servicio.findOrCreate({
            where: { nombre: 'Préstamo de equipos (SERCOM)' },
            defaults: { descripcion: 'Equipos audiovisuales y de cómputo en préstamo.', estado: true }
        });
        const [servicioCubiculos] = await Servicio.findOrCreate({
            where: { nombre: 'Reserva de cubículos' },
            defaults: { descripcion: 'Cubículos de estudio individuales y grupales en biblioteca.', estado: true }
        });

        //recursos        
        const [canchaFutbol] = await Recurso.findOrCreate({
            where: { nombre: 'Cancha de fútbol', servicioId: servicioDeportivo.id },
            defaults: { capacidad: 22, estado: 'Disponible', localId: localDeportivo.id }
        });
        const [cubiculoA] = await Recurso.findOrCreate({
            where: { nombre: 'Cubículo grupal A', servicioId: servicioCubiculos.id },
            defaults: { capacidad: 6, estado: 'Disponible', localId: localBiblioteca.id }
        });
        const [labCiencias] = await Recurso.findOrCreate({
            where: { nombre: 'Laboratorio de Ciencias', servicioId: servicioLab.id },
            defaults: { capacidad: 20, estado: 'Disponible', localId: localLab.id }
        });

        // reservas
        await Reserva.findOrCreate({
            where: { usuarioId: alumno.id, recursoId: canchaFutbol.id, fecha: '2026-07-20' },
            defaults: {
                servicioId: servicioDeportivo.id,
                localId: localDeportivo.id,
                horaInicio: '07:00:00',
                duracion: 60,
                estado: 'Pendiente'
            }
        });
        await Reserva.findOrCreate({
            where: { usuarioId: alumno.id, recursoId: cubiculoA.id, fecha: '2026-07-21' },
            defaults: {
                servicioId: servicioCubiculos.id,
                localId: localBiblioteca.id,
                horaInicio: '10:00:00',
                duracion: 60,
                estado: 'Confirmado'
            }
        });

        // noticias
        await Noticia.findOrCreate({
            where: { titulo: 'Semana universitaria' },
            defaults: {
                categoria: 'Evento',
                descripcion: 'Actividades deportivas, culturales y académicas organizadas por la universidad.',
                estado: 'Publicada'
            }
        });
        await Noticia.findOrCreate({
            where: { titulo: 'Mantenimiento de laboratorios' },
            defaults: {
                categoria: 'Comunicado',
                descripcion: 'Algunos laboratorios no estarán disponibles durante el mantenimiento programado.',
                estado: 'Publicada'
            }
        });
        await Noticia.findOrCreate({
            where: { titulo: 'Nuevo horario de biblioteca' },
            defaults: {
                categoria: 'Noticia',
                descripcion: 'La biblioteca central amplía su horario de atención durante el ciclo.',
                estado: 'Borrador'
            }
        });

        // horarios
        await Horario.findOrCreate({
            where: { servicioId: servicioDeportivo.id, localId: localDeportivo.id, fecha: '2026-07-20', horaInicio: '07:00:00' },
            defaults: { horaFin: '08:00:00', estado: 'Ocupado' }
        });
        await Horario.findOrCreate({
            where: { servicioId: servicioLab.id, localId: localLab.id, fecha: '2026-07-21', horaInicio: '10:00:00' },
            defaults: { horaFin: '11:00:00', estado: 'Disponible' }
        });
        await Horario.findOrCreate({
            where: { servicioId: servicioCubiculos.id, localId: localBiblioteca.id, fecha: '2026-07-22', horaInicio: '12:00:00' },
            defaults: { horaFin: '13:00:00', estado: 'Bloqueado' }
        });

        console.log('Datos de prueba insertados correctamente.');
        console.log('Usuario admin: admin@ulima.edu.pe / admin123');
        console.log('Usuario alumno: alumno@ulima.edu.pe / alumno123');
        process.exit(0);
    } catch (error) {
        console.error('Error al insertar los datos de prueba:', error);
        process.exit(1);
    }
}

seed();
