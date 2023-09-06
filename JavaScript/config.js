const mqtt = require('mqtt');

const brokerUrl = 'mqtt://broker.mqttdashboard.com';
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Conexão estabelecida com sucesso!');

  // Subscreve aos tópicos para receber as mensagens
  client.subscribe('casa');
  client.subscribe('calibracao');
  client.subscribe('LigadoMin');
  client.subscribe('BCM365C_2');
  client.subscribe('umidade');

  // Quando uma mensagem é recebida em algum dos tópicos
  client.on('message', (topic, message) => {
    console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
    if (
      topic === 'casa' ||
      topic === 'calibracao' ||
      topic === 'LigadoMin' ||
      topic === 'BCM365C_2' ||
      topic === 'umidade'
    ) {
      // Faça algo com a mensagem recebida aqui
      console.log(`Mensagem recebida no tópico ${topic}: ${message}`);
    }
  });
});

module.exports = client;
