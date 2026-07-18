import Sequelize from 'sequelize';
import pg from 'pg';

const hostname = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || '1234';
const database = process.env.DB_NAME || 'sistema_reserva_espacios';
const port = process.env.DB_PORT || 5432;
const dialect = 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port,
    dialect,
    dialectModule: pg,
    logging: false
});

export default sequelize;