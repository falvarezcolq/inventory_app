const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const Role = require('./roles');

class User extends Model {}

User.init({
  // Model attributes are defined here
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(255)
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'role_id'
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
  modelName: 'users', // We need to choose the model name
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Add foreign key constraint
User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;
