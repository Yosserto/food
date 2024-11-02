require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/productos', productRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/carrito', carritoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    try {
        await sequelize.sync();
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
});
