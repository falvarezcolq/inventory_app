const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');


class TypeMovement extends Model {}

TypeMovement.init({
    // Model attributes are defined here
    type_movement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    abbreviation: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: true
    },
    movement_type: {
        type: DataTypes.ENUM('In', 'Out'),
        allowNull: false
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
    modelName: 'type_movements', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


module.exports = TypeMovement;
