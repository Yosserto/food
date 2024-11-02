const sequelize = require('../config/database');
const Producto = require('./Producto');
const Usuario = require('./Usuario');
const Pedido = require('./Pedido');
const PedidoProducto = require('./PedidoProducto');

// Inicializar relaciones si aún no se han hecho
Producto.sync();
Usuario.sync();
Pedido.sync();
PedidoProducto.sync();

module.exports = {
    sequelize,
    Producto,
    Usuario,
    Pedido,
    PedidoProducto,
};
