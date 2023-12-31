const Sequelize = require('sequelize');
const sequelize = require('./core');

const Calibracao = sequelize.define('Calibracao', {
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  limite_min_temp: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'LimiteCalibracaos',
      key: 'limite_min_temp',
    },
    onUpdate: 'CASCADE',
  },
  limite_max_temp: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'LimiteCalibracaos',
      key: 'limite_max_temp',
    },
    onUpdate: 'CASCADE',
  },
  numeroGerado: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

Calibracao.sync();

module.exports = Calibracao;
