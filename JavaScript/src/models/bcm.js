const Sequelize = require('sequelize');
const sequelize = require('./core');

const Bcm = sequelize.define('Bcm', {
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  }
});

Bcm.sync();

module.exports = Bcm;
