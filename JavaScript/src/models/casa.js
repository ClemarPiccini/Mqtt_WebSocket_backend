const Sequelize = require('sequelize');
const sequelize = require('./core');

const Casa = sequelize.define('Casa', {
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  }
});

Casa.sync();

module.exports = Casa;
