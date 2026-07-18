import 'dotenv/config';

import sequelize from '../config/database.js';
import Usuario from '../models/usuario.model.js';
import Servicio from '../models/servicio.model.js';
import Local from '../models/local.model.js';
import Recurso from '../models/recurso.model.js';
import Horario from '../models/horario.model.js';
import Reserva from '../models/reserva.model.js';
import Participante from '../models/participante.model.js';
import Noticia from '../models/noticia.model.js';

const usuarios = [
    { id: 1, nombre: 'Administrador ULima', correo: 'admin@ulima.edu.pe', password: 'admin123', codigo: null, rol: 'admin' },
    { id: 2, nombre: 'Antonio Sifuentes', correo: 'alumno@ulima.edu.pe', password: 'alumno123', codigo: '20236823', rol: 'estudiante' }
];

const servicios = [
    { id: 1, nombre: 'Ambientes deportivos', descripcion: 'Reserva espacios deportivos disponibles dentro de la universidad.', imagen: 'ambientes_deportivos.jpg', estado: true },
    { id: 2, nombre: 'Reserva de ambientes técnicos (SERCOM)', descripcion: 'Reserva ambientes técnicos para actividades académicas o prácticas.', imagen: 'espacios_tecnicos.webp', estado: true },
    { id: 3, nombre: 'Reserva de Laboratorios', descripcion: 'Solicita laboratorios especializados según tu necesidad académica.', imagen: 'reserva_lab.jpg', estado: true },
    { id: 4, nombre: 'Préstamo de equipos (SERCOM)', descripcion: 'Solicita equipos disponibles para uso académico o audiovisual.', imagen: 'reserva_equipos.jpg', estado: true },
    { id: 5, nombre: 'Reserva de cubículos', descripcion: 'Reserva espacios individuales o grupales para estudio.', imagen: 'reserva_cubiculos.webp', estado: true }
];

const locales = [
    { id: 1, nombre: 'Centro Deportivo Mayorazgo', campus: 'Mayorazgo' },
    { id: 2, nombre: 'Biblioteca Central', campus: 'Mayorazgo' },
    { id: 3, nombre: 'Laboratorio de Cómputo', campus: 'Mayorazgo' },
    { id: 4, nombre: 'Pabellón S', campus: 'Monterrico' },
    { id: 5, nombre: 'SERCOM', campus: 'Monterrico' }
];

const recursos = [
    { id: 1, nombre: 'Basket cancha completa', servicioId: 1, localId: 1 },
    { id: 2, nombre: 'Basket media cancha', servicioId: 1, localId: 1 },
    { id: 3, nombre: 'Piscina', servicioId: 1, localId: 1 },
    { id: 4, nombre: 'Cubículo de estudio', servicioId: 5, localId: 2 },
    { id: 5, nombre: 'Sala de estudio grupal', servicioId: 5, localId: 2 },
    { id: 6, nombre: 'Equipo de laboratorio', servicioId: 3, localId: 3 }
];

const horarios = [
    { id: 1, fecha: '2026-08-03', horaInicio: '07:00:00', horaFin: '07:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 2, fecha: '2026-08-03', horaInicio: '08:00:00', horaFin: '08:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 3, fecha: '2026-08-03', horaInicio: '09:00:00', horaFin: '09:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 4, fecha: '2026-08-04', horaInicio: '10:00:00', horaFin: '10:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 5, fecha: '2026-08-04', horaInicio: '11:00:00', horaFin: '11:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 6, fecha: '2026-08-04', horaInicio: '12:00:00', horaFin: '12:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 7, fecha: '2026-08-05', horaInicio: '10:00:00', horaFin: '10:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 8, fecha: '2026-08-05', horaInicio: '11:00:00', horaFin: '11:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 9, fecha: '2026-08-05', horaInicio: '12:00:00', horaFin: '12:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 10, fecha: '2026-08-06', horaInicio: '10:00:00', horaFin: '10:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 11, fecha: '2026-08-06', horaInicio: '11:00:00', horaFin: '11:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 12, fecha: '2026-08-06', horaInicio: '12:00:00', horaFin: '12:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 13, fecha: '2026-08-10', horaInicio: '07:00:00', horaFin: '07:50:00', estado: 'Disponible', servicioId: 1, localId: 1 },
    { id: 14, fecha: '2026-08-10', horaInicio: '08:00:00', horaFin: '08:50:00', estado: 'Ocupado', servicioId: 1, localId: 1 },
    { id: 15, fecha: '2026-08-11', horaInicio: '10:00:00', horaFin: '10:50:00', estado: 'Disponible', servicioId: 3, localId: 4 },
    { id: 16, fecha: '2026-08-11', horaInicio: '12:00:00', horaFin: '13:00:00', estado: 'Bloqueado', servicioId: 5, localId: 2 },
    { id: 17, fecha: '2026-08-12', horaInicio: '09:00:00', horaFin: '09:50:00', estado: 'Disponible', servicioId: 4, localId: 5 },
    { id: 18, fecha: '2026-08-12', horaInicio: '15:00:00', horaFin: '15:50:00', estado: 'Ocupado', servicioId: 3, localId: 4 }
];

const reservas = [
    { id: 1, usuarioId: 2, servicioId: 1, localId: 1, recursoId: 1, fecha: '2026-08-03', horaInicio: '07:00:00', duracion: 50, estado: 'Cancelado' },
    { id: 2, usuarioId: 2, servicioId: 1, localId: 1, recursoId: 2, fecha: '2026-05-29', horaInicio: '10:00:00', duracion: 50, estado: 'Cancelado' },
    { id: 3, usuarioId: 2, servicioId: 1, localId: 1, recursoId: 3, fecha: '2026-05-28', horaInicio: '15:00:00', duracion: 50, estado: 'Confirmado' },
    { id: 4, usuarioId: 2, servicioId: 5, localId: 2, recursoId: 4, fecha: '2026-08-05', horaInicio: '12:00:00', duracion: 60, estado: 'Pendiente' }
];

const participantes = [
    { id: 1, codigo: '20236823', nombre: 'Antonio Sifuentes Linares', reservaId: 4 }
];

const noticias = [
    { id: 1, titulo: 'Semana universitaria', categoria: 'Evento', fecha: '2026-08-10', descripcion: 'Participa en actividades deportivas, culturales y académicas organizadas por la universidad.', estado: 'Publicada' },
    { id: 2, titulo: 'Mantenimiento de laboratorios', categoria: 'Comunicado', fecha: '2026-08-15', descripcion: 'Algunos laboratorios no estarán disponibles durante el mantenimiento programado.', estado: 'Publicada' },
    { id: 3, titulo: 'Torneo interno de fulbito', categoria: 'Deportes', fecha: '2026-08-20', descripcion: 'Inscríbete con tu equipo y participa en el torneo deportivo del ciclo académico.', estado: 'Publicada' },
    { id: 4, titulo: 'Nuevo horario de biblioteca', categoria: 'Noticia', fecha: '2026-08-20', descripcion: 'La biblioteca central amplía su horario de atención durante el ciclo.', estado: 'Borrador' }
];

async function migrate() {
    try {
        await sequelize.sync({ force: true });


        await Usuario.bulkCreate(usuarios);
        await Servicio.bulkCreate(servicios);
        await Local.bulkCreate(locales);
        await Recurso.bulkCreate(recursos);
        await Horario.bulkCreate(horarios);
        await Reserva.bulkCreate(reservas);
        await Participante.bulkCreate(participantes);
        await Noticia.bulkCreate(noticias);

        const tablas = [
            'usuarios',
            'servicios',
            'locales',
            'recursos',
            'horarios',
            'reservas',
            'participantes',
            'noticias'
        ];

        for (const tabla of tablas) {
            await sequelize.query(
                `SELECT setval(pg_get_serial_sequence('${tabla}', 'id'), (SELECT MAX(id) FROM ${tabla}))`
            );
        }

        console.log('Migración completada correctamente.');
    } catch (error) {
        console.error('Error durante la migración:', error);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

migrate();