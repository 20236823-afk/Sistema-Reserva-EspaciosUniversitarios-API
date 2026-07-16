import 'dotenv/config';
import app from './app.js';
import sequelize from './src/config/database.js';
import './src/models/servicio.model.js';

const port = process.env.PORT || 3005;

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL establecida correctamente');

        await sequelize.sync({ force: false });
        console.log('Base de datos sincronizada');

        app.listen(port, () => {
            console.log(`Servidor ejecutándose en http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

main();