const Sequelize = require('sequelize');
const sequelize = require('./core');

const Umidade = sequelize.define('Umidade', {
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  }
});

Umidade.sync();

module.exports = Umidade;
