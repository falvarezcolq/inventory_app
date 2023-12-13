const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const User = require('./user');
const TypeMovement = require('./type_movement');

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
    nit: {
        type: DataTypes.STRING(50)
    },
    razon_social: {
        type: DataTypes.STRING(255)
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2)
    },
    type_movement_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeMovement,
            key: 'type_movement_id'
        }
    },
    movement_type: {
        type: DataTypes.ENUM('IN', 'OUT')
    },
    total_items: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
