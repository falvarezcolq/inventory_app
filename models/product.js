const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const Category = require('./category');
const Supplier = require('./supplier');
const User = require('./user');

class Product extends Model {}

Product.init({
    // Model attributes are defined here
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id'
        }
    },
    barcode: {
        type: DataTypes.STRING(50)
    },
    manufacturer: {
        type: DataTypes.STRING(100)
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Supplier,
            key: 'supplier_id'
        }
    },
    image_url: {
        type: DataTypes.TEXT
    },
    product_code: {
        type: DataTypes.STRING(50)
    },
    weight: {
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
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    updated_by: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    discount: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.00
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'product', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Define associations
Product.belongsTo(Category, { foreignKey: 'category_id' });
Product.belongsTo(Supplier, { foreignKey: 'supplier_id' });
Product.belongsTo(User, { as: 'createdBy', foreignKey: 'created_by' });
Product.belongsTo(User, { as: 'updatedBy', foreignKey: 'updated_by' });

module.exports = Product;
