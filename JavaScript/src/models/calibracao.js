const Sequelize = require('sequelize');
const sequelize = require('./core');

const Calibracao = sequelize.define('Calibracao', {
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  }
});

Calibracao.sync();

module.exports = Calibracao;
