const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config_sequelize');
const User = require('./user');

class PersonalInformation extends Model {}

PersonalInformation.init({
  // Model attributes are defined here
  personal_information_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
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
  document: {
    type: DataTypes.STRING(30)
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: User,
      key: 'user_id'
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
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'personal_information', // We need to choose the model name
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Add foreign key constraint
PersonalInformation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = PersonalInformation;
