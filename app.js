import express from 'express';
import cors from 'cors';

import servicioRoutes from './src/routes/servicio.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';
import localRoutes from './src/routes/local.routes.js';
import recursoRoutes from './src/routes/recurso.routes.js';
import reservaRoutes from './src/routes/reserva.routes.js';
import noticiaRoutes from './src/routes/noticia.routes.js';
import horarioRoutes from './src/routes/horario.routes.js';
import participanteRoutes from './src/routes/participante.routes.js';
import dashboardRoutes from './src/routes/dashboard.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'API del sistema de reservas funcionando'
    });
});

app.use('/api/servicios', servicioRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/locales', localRoutes);
app.use('/api/recursos', recursoRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/participantes', participanteRoutes);
app.use('/api/dashboard', dashboardRoutes);

export default app;
