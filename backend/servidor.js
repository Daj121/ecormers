const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conectarBDMongo = require('./src/configuracion/baseDatos'); // MongoDB
const pool = require('./src/configuracion/baseDatosPostgres'); // Importamos el pool directamente
const middlewareAutenticacion = require('./src/middleware/middlewareAutenticacion');

// Configuración del entorno
dotenv.config();

const app = express();

// Middlewares para JSON
app.use(express.json());

// configuracion espesifica de CORS
app.use(cors({
    origin:'http://localhost:3000',// permite solicitudes solo dedes el forntend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true,             // Habilitar cookies o encabezados personalizados
}))

// Conexión a MongoDB
conectarBDMongo();

// Verificar conexión a PostgreSQL
pool.connect()
    
    .catch(err => console.error('Error al conectar a PostgreSQL:', err.message));

// Rutas
app.use('/api/productos', require('./src/rutas/rutasProducto'));
app.use('/api/usuarios', require('./src/rutas/rutasUsuario'));
app.use('/api/ordenes', require('./src/rutas/rutasOrden'));
app.use('/api/carrito', require('./src/rutas/rutasCarrito'));
app.use('/api/categorias', require('./src/rutas/rutasCategoria'));

// Ruta protegida (perfil del usuario)
app.get('/api/usuarios/perfil', middlewareAutenticacion, (req, res) => {
    res.status(200).json({ mensaje: 'Perfil de usuario', usuario: req.user });
});

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
