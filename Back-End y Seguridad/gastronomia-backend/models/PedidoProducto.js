const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PedidoProducto = sequelize.define('PedidoProducto', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = PedidoProducto;