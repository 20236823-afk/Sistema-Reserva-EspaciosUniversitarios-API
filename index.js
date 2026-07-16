import 'dotenv/config';
import app from './app.js';
import sequelize from './src/config/database.js';

// import a todos los modelos para que Sequelize los registre
// y los tenga en cuenta al sincronizar
import './src/models/usuario.model.js';
import './src/models/local.model.js';
import './src/models/servicio.model.js';
import './src/models/recurso.model.js';
import './src/models/reserva.model.js';
import './src/models/participante.model.js';
import './src/models/noticia.model.js';
import './src/models/horario.model.js';

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
