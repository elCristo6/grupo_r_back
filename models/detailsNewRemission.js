const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const DetalleFactura = sequelize.define('detailsNewRemission', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  material: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cantidad :{
    type: Sequelize.INTEGER,
  }
});

module.exports = DetalleFactura;
