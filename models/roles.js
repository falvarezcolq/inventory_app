const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');

// Define the enum type
const movementTypeEnum = sequelize.define('movement_type_enum', {
  type: DataTypes.ENUM('In', 'Out')
});

class InventoryMovement extends Model {}

InventoryMovement.init({
    // Model attributes are defined here
    movement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'product_id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movement_type: {
        type: movementTypeEnum,
        allowNull: false
    },
    movement_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'suppliers',
            key: 'supplier_id'
        }
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
    modelName: 'inventory_movement', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = InventoryMovement;
