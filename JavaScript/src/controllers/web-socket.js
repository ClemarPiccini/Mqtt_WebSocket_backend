const WebSocket = require('ws');
const mqtt = require('mqtt');
const data = require('./mqtt-controller');

const mqttClient = mqtt.connect('mqtt://broker.mqttdashboard.com');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');
  
  ws.send(JSON.stringify(data)); 

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

mqttClient.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  mqttClient.subscribe('casa');
  mqttClient.subscribe('calibracao');
  mqttClient.subscribe('LigadoMin');
  mqttClient.subscribe('BCM365C_2');
  mqttClient.subscribe('umidade');
  mqttClient.on('message', (topic, message) => {
    const newData = JSON.parse(message);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newData));
      }
    });
  });
});
