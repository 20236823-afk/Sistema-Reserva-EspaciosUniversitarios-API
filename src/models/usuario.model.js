import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define(
    'Usuario',
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
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rol: {
            type: DataTypes.ENUM('admin', 'estudiante'),
            allowNull: false,
            defaultValue: 'estudiante'
        }
    },
    {
        tableName: 'usuarios',
        timestamps: true
    }
);

export default Usuario;
