const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Producto = require('./Producto');

const Pedido = sequelize.define('Pedido', {
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'Pendiente',
    },
}, {
    timestamps: true,
});

Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });

Pedido.belongsToMany(Producto, { through: 'PedidoProducto', foreignKey: 'pedidoId' });
Producto.belongsToMany(Pedido, { through: 'PedidoProducto', foreignKey: 'productoId' });

module.exports = Pedido;