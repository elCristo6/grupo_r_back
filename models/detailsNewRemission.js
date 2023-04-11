const Sequelize = require('sequelize');
const sequelize = require('./database');
const Remision = require('./newRemission');

const DetalleFactura = sequelize.define('detailsNewRemission', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  producto: {
    type: Sequelize.STRING
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  peso: {
    type: Sequelize.DECIMAL(10,2)
  }
});
// Definir relación uno a muchos entre Remisión y Producto
newRemission.hasMany(DetalleFactura);
DetalleFactura.belongsTo(newRemission);

module.exports = DetalleFactura;
