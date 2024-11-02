const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

router.get('/', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, precio, imagen, descripcion } = req.body;
        const producto = await Producto.create({ nombre, precio, imagen, descripcion });
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

module.exports = router;