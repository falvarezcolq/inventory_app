const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');

class Unit extends Model {
    serialize(){
        return {
            unit_id: this.unit_id,
            name: this.name,
            abbreviation: this.abbreviation,
            active: this.active,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}

Unit.init({
    // Model attributes are defined here
    unit_id: {
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
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
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
    }
   
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'unit', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Unit;
