const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Articulo = require('./detailsNewRemission');
const User = require('./usuarios');

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
  userCC: { // Cambio en el nombre del campo
    type: DataTypes.STRING, // Asegúrate de que coincida con el tipo de dato correcto para la identificación del usuario
    allowNull: false
  },
  empresa: { 
    type: DataTypes.STRING, 
     allowNull: false
  }
});
Factura.belongsTo(User, {
  foreignKey: 'userCC',
  as: 'usuario'
});

User.hasMany(Factura, {
  foreignKey: 'userCC',
  as: 'factura'
});

Articulo.belongsTo(Factura);
Factura.hasMany(Articulo);// La factura tiene varios articulos
module.exports = Factura;

