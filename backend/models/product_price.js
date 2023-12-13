const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const Product = require('./product');
const Unit = require('./unit');

class ProductPrice extends Model {}

ProductPrice.init({
    // Model attributes are defined here
    product_price_id: {
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
    unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Unit,
            key: 'unit_id'
        }
    },
    price: {
        type: DataTypes.DECIMAL(15, 7),
        allowNull: false
    },
    product_price_type: {
        type: DataTypes.ENUM('Purchase', 'Sale')
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE
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
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'product_prices', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Define associations
ProductPrice.belongsTo(Product, { foreignKey: 'product_id' });
ProductPrice.belongsTo(Unit, { foreignKey: 'unit_id' });

module.exports = ProductPrice;
