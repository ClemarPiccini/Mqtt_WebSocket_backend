const Sequelize = require('sequelize');
const sequelize = require('./core');

const LigadoMin = sequelize.define('LigadoMin', {
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  }
});

LigadoMin.sync();

module.exports = LigadoMin;
