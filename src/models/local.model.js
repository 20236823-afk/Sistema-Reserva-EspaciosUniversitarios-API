import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Local = sequelize.define(
    'Local',
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
        direccion: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'locales',
        timestamps: true
    }
);

export default Local;
