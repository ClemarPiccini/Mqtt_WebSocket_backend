const mqtt = require('mqtt');
const brokerUrl = 'mqtt://broker.mqttdashboard.com';
const client = mqtt.connect(brokerUrl);

const { DataTypes } = require('sequelize');
const sequelize = require('../models/core');
const MqttData = require('../models/mqtt');

client.on('connect', () => {
  console.log('Conexão estabelecida com sucesso!');

  // Subscreve aos tópicos para receber as mensagens
  client.subscribe('casa');
  client.subscribe('calibracao');
  client.subscribe('LigadoMin');
  client.subscribe('BCM365C_2');
  client.subscribe('umidade');

  // Quando uma mensagem é recebida em algum dos tópicos
  client.on('message', async (topic, message) => {
    console.log(new Date().toISOString() + ` - Mensagem recebida no tópico ${topic}: ${message.toString()}`);

    // Converter a mensagem para um valor numérico
    let value = parseFloat(message.toString());
    if (!isNaN(value)) {
      if (topic === 'casa' || topic === 'calibracao') {
        // Multiplicar por 10 para temperatura em oC
        value /= 10;
      }

      // Objeto para inserção no banco de dados
      const dataToInsert = {
        [topic]: value,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        // Inserir os dados na tabela MqttData
        await MqttData.create(dataToInsert);
        console.log(`Dados inseridos no banco de dados para o tópico ${topic}: ${value}`);
      } catch (err) {
        console.error('Erro ao inserir dados no banco de dados:', err);
      }
    }
  });
});

module.exports = client;
