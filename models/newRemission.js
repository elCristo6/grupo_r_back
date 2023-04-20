const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Articulo = require('./detailsNewRemission');

const Factura = sequelize.define('newRemission', {
  id: {// numero del consecutivo
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ciudad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
  transportador: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ccTransportador: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  placa: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
  despachado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  recibido: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalPeso: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
  },
});

Articulo.belongsTo(Factura);
Factura.hasMany(Articulo);// La factura tiene varios articulos
module.exports = Factura;

