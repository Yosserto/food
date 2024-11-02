const Producto = require('../models/Producto');

exports.getAllProducts = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { nombre, precio, imagen, descripcion } = req.body;
        const producto = await Producto.create({ nombre, precio, imagen, descripcion });
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};
