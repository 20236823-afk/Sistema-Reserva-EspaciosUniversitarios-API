import Sequelize from 'sequelize';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pg = require('pg');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // necesario para Neon
        }
    }
});

export default sequelize;