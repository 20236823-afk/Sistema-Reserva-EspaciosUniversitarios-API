import Sequelize from 'sequelize';
import pg from 'pg';
import 'dotenv/config';

const hostname = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME || 'sistema_reserva_espacios';
const port = process.env.DB_PORT || 5432;
const dialect = 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    dialectModule: pg,
    logging: false
});

export default sequelize;
