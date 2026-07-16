import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Servicio = sequelize.define(
    'Servicio',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: 'servicios',
        timestamps: true
    }
);

export default Servicio;