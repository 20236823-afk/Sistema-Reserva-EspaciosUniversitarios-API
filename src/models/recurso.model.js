import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Servicio from './servicio.model.js';
import Local from './local.model.js';

//  recurso es un elemento reservable especifico dentro de un servicio
const Recurso = sequelize.define(
    'Recurso',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        estado: {
            type: DataTypes.ENUM('Disponible', 'En mantenimiento', 'Fuera de servicio'),
            allowNull: false,
            defaultValue: 'Disponible'
        }
    },
    {
        tableName: 'recursos',
        timestamps: true
    }
);

Recurso.belongsTo(Servicio, { foreignKey: 'servicioId' });
Servicio.hasMany(Recurso, { foreignKey: 'servicioId' });

Recurso.belongsTo(Local, { foreignKey: 'localId' });
Local.hasMany(Recurso, { foreignKey: 'localId' });

export default Recurso;
