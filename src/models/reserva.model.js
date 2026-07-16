import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './usuario.model.js';
import Servicio from './servicio.model.js';
import Local from './local.model.js';
import Recurso from './recurso.model.js';

const Reserva = sequelize.define(
    'Reserva',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false
        },
        duracion: {
            type: DataTypes.INTEGER, // minutos
            allowNull: false,
            defaultValue: 60
        },
        estado: {
            type: DataTypes.ENUM('Pendiente', 'Confirmado', 'Cancelado'),
            allowNull: false,
            defaultValue: 'Pendiente'
        }
    },
    {
        tableName: 'reservas',
        timestamps: true
    }
);

Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Reserva, { foreignKey: 'usuarioId' });

Reserva.belongsTo(Servicio, { foreignKey: 'servicioId' });
Servicio.hasMany(Reserva, { foreignKey: 'servicioId' });

Reserva.belongsTo(Local, { foreignKey: 'localId', allowNull: true });
Local.hasMany(Reserva, { foreignKey: 'localId' });

Reserva.belongsTo(Recurso, { foreignKey: 'recursoId', allowNull: true });
Recurso.hasMany(Reserva, { foreignKey: 'recursoId' });

export default Reserva;
