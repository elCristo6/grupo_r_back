const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  cc: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  pass: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  userType: {
    type: DataTypes.ENUM('admin', 'proveedor'),
    allowNull: false,
  },
});

module.exports = User;