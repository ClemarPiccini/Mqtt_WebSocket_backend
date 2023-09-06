const Sequelize = require('sequelize');
const sequelize = require('./core');

const MqttData = sequelize.define('MqttData', {
  casa: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  calibracao: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  LigadoMin: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  BCM365C_2: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  umidade: {
    type: Sequelize.JSON,
    allowNull: true,
  },
});

MqttData.sync();

module.exports = MqttData;
