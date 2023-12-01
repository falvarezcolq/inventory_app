const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const Order = require('./order');

class Payment extends Model {}

Payment.init({
    // Model attributes are defined here
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'order_id'
        }
    },
    payment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method: {
        type: DataTypes.STRING(50),
        allowNull: false
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
    modelName: 'payment', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Payment;
