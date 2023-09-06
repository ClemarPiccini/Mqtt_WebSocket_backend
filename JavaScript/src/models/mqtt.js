const Sequelize = require('sequelize');
const sequelize = require('./core');

const MqttData = sequelize.define('MqttData', {
  dados: {
    type: Sequelize.JSON,
    allowNull: false,
  }
});

MqttData.sync();

module.exports = MqttData;