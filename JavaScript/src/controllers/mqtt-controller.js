const { DataTypes } = require('sequelize');
const client = require('../../config');
const MqttData = require('../models/mqtt');

client.on('message', async function (topic, message) {
  try {
    const data = JSON.parse(message.toString());

    // Armazenar dados na tabela MqttData
    await MqttData.create({ dados: data });
    
  } catch (err) {
    console.error('Ocorreu um erro:', err);
  }
});

module.exports