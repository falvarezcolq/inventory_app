const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');

class Supplier extends Model {}

Supplier.init({
    // Model attributes are defined here
    supplier_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nit: {
        type: DataTypes.STRING(50)
    },
    razon_social: {
        type: DataTypes.STRING(255)
    },
    supplier_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    contact_person: {
        type: DataTypes.STRING(100)
    },
    contact_email: {
        type: DataTypes.STRING(255)
    },
    contact_phone: {
        type: DataTypes.STRING(20)
    },
    customer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    supplier: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255)
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
    modelName: 'supplier', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Supplier;
