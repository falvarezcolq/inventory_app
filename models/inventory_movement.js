const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const Product = require('./product');
const User = require('./user');
const Supplier = require('./supplier');

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
            model: Product,
            key: 'product_id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movement_type: {
        type: DataTypes.ENUM('In', 'Out')
    },
    movement_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Supplier,
            key: 'supplier_id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    modelName: 'inventory_movements', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Define associations
InventoryMovement.belongsTo(Product, { foreignKey: 'product_id' });
InventoryMovement.belongsTo(User, { foreignKey: 'user_id' });
InventoryMovement.belongsTo(Supplier, { foreignKey: 'supplier_id' });

module.exports = InventoryMovement;
