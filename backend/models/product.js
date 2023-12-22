const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const Category = require('./category');
const Supplier = require('./supplier');
const User = require('./user');
const Unit = require('./unit');

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
    purchase_price: {
        type: DataTypes.DECIMAL(15, 7),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    barcode: {
        type: DataTypes.STRING(50)
    },
    manufacturer: {
        type: DataTypes.STRING(100)
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id'
        }
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
            key: 'supplier_id'
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
    unit_abbreviation: {
        type: DataTypes.STRING(10),
        allowNull: false
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
    discount: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.00
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    is_active: {
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
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'products', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}); 

// Define associations
Product.belongsTo(Category, { foreignKey: 'category_id' });
Product.belongsTo(Supplier, { foreignKey: 'supplier_id' });
Product.belongsTo(Unit, { foreignKey: 'unit_id' });
Product.belongsTo(User, { as: 'createdBy', foreignKey: 'created_by' });
Product.belongsTo(User, { as: 'updatedBy', foreignKey: 'updated_by' });

module.exports = Product;
