const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');

class Category extends Model {
    serialize(){
        return {
            category_id: this.category_id,
            name: this.name,
        }
    }
}

Category.init({
    // Model attributes are defined here
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
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
    },
   
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'category', // We need to choose the model name
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Category;
