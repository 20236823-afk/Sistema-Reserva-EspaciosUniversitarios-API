import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Noticia = sequelize.define(
    'Noticia',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoria: {
            type: DataTypes.ENUM(
                'Noticia',
                'Comunicado',
                'Evento',
                'Deportes'
            ),
            allowNull: false,
            defaultValue: 'Noticia'
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('Publicada', 'Borrador'),
            allowNull: false,
            defaultValue: 'Borrador'
        }
    },
    {
        tableName: 'noticias',
        timestamps: true
    }
);

export default Noticia;