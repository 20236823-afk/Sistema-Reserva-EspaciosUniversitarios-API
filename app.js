import express from 'express';
import cors from 'cors';
import servicioRoutes from './src/routes/servicio.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'API del sistema de reservas funcionando'
    });
});

app.use('/api/servicios', servicioRoutes);

export default app;