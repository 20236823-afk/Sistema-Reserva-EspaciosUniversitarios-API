import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Servicio from './servicio.model.js';
import Local from './local.model.js';

const Horario = sequelize.define(
    'Horario',
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
        horaFin: {
            type: DataTypes.TIME,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('Disponible', 'Ocupado', 'Bloqueado'),
            allowNull: false,
            defaultValue: 'Disponible'
        }
    },
    {
        tableName: 'horarios',
        timestamps: true
    }
);

Horario.belongsTo(Servicio, { foreignKey: 'servicioId' });
Servicio.hasMany(Horario, { foreignKey: 'servicioId' });

Horario.belongsTo(Local, { foreignKey: 'localId' });
Local.hasMany(Horario, { foreignKey: 'localId' });

export default Horario;
