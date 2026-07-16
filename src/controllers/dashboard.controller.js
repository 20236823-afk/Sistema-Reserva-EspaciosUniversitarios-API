import dashboardRepository from '../repositories/dashboard.repository.js';

// devuelve los indicadores reales para el AdminDashboard
const obtenerIndicadores = async (req, res) => {
    try {
        const indicadores = await dashboardRepository.obtenerIndicadores();
        return res.status(200).json(indicadores);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los indicadores del panel' });
    }
};

export { obtenerIndicadores };
