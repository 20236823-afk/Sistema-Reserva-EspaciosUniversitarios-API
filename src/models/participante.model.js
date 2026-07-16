import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Reserva from './reserva.model.js';

// Participantes adicionales de una reserva (ej: companeros en un cubiculo grupal)
const Participante = sequelize.define(
    'Participante',
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
        codigo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'participantes',
        timestamps: true
    }
);

Participante.belongsTo(Reserva, { foreignKey: 'reservaId' });
Reserva.hasMany(Participante, { foreignKey: 'reservaId' });

export default Participante;
