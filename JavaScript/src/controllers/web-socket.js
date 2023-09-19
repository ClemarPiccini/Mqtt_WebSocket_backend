const WebSocket = require('ws');
const mqtt = require('mqtt');
const message = require('./mqtt-controller');
const mqttClient = mqtt.connect('mqtt://broker.mqttdashboard.com');
const wss = new WebSocket.Server({ port: 8081 });
const BCM240_S = require('../models/BCM240_S');
const Calibracao = require('../models/calibracao');

// Função para enviar dados de uma tabela específica para todos os clientes WebSocket
async function sendTableDataToClients(tableModel, tableName) {
  try {
    const data = await tableModel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        // Envie os dados para os clientes em formato JSON
        client.send(JSON.stringify({ tableName, data }));
      }
    });
  } catch (error) {
    console.error(`Erro ao consultar e enviar dados da tabela ${tableName}:`, error);
  }
}
wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');
    // Envie os dados das tabelas para o cliente quando ele se conectar
    sendTableDataToClients(BCM240_S, 'BCM240_S');
    sendTableDataToClients(Calibracao, 'calibracao');
    
  ws.send(JSON.stringify(message));
  console.log(message)
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

mqttClient.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  mqttClient.subscribe('BCM240_S');
  mqttClient.subscribe('calibracao');

  mqttClient.on('message', (topic, message) => {
    const teste = '{"'+ topic + '":' + message+'}'; //  variavel que envia pro web socket 
    const data = JSON.parse(teste);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
});

module.exports