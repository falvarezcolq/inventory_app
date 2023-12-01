const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const User = require('./user');

class Order extends Model {}

Order.init({
    // Model attributes are defined here
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    updated_by: {
        type: DataTypes.INTEGER
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'order', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Order;
