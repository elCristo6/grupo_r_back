const Sequelize = require('sequelize');
//const sequelize = new Sequelize('mysql://root:91120152349.@localhost/database_r');
//const sequelize = new Sequelize('mysql://root:91120152349.@database-1.ctzhw4x51qx3.us-east-1.rds.amazonaws.com/database_r');
const sequelize = new Sequelize('mysql://root:91120152349.@grupoempresarialrdatabasefree.cihf10rmhl2c.us-east-1.rds.amazonaws.com/database_r');
module.exports = sequelize;
