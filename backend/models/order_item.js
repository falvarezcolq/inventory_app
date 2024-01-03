const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const Order = require('./order');
const Product = require('./product');
const Unit = require('./unit');
const InventoryMovement = require('./inventory_movement');

class OrderItem extends Model {}


OrderItem.init({
    // Model attributes are defined here
    order_item_id: {
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
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        }
    },
    movement_id: {  
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: InventoryMovement,
            key: 'movement_id'
        }
    },
    price: {
        type: DataTypes.DECIMAL(15,7),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2)
    },
    lote: {
        type: DataTypes.STRING(50)
    },
    expiration_date: {
        type: DataTypes.DATE
    },
    unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Unit,
            key: 'unit_id'
        }
    },
    type_movement_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movement_type: {
        type: DataTypes.ENUM('movement_type_enum')
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
        defaultValue: DataTypes.CURRENT_TIMESTAMP
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
    modelName: 'order_item', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Define associations
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
OrderItem.belongsTo(Unit, { foreignKey: 'unit_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.hasOne(InventoryMovement, { foreignKey: 'movement_id' });

// In your Product model definition
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });


module.exports = OrderItem;
