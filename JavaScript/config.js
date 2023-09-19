const mqtt = require('mqtt');

const brokerUrl = 'mqtt://broker.mqttdashboard.com';
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Conexão estabelecida com sucesso!');

  // Subscreve aos tópicos para receber as mensagens
  client.subscribe('calibracao');
  client.subscribe('BCM240_S');

  // Quando uma mensagem é recebida em algum dos tópicos
  client.on('message', (topic, message) => {
    console.log(new Date().toISOString() + ` - Mensagem recebida no tópico ${topic}: ${message.toString()}`); 
  });
});

module.exports = client;
