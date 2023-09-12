const client = require('../../config');
const Casa = require('../models/casa');
const Calibracao = require('../models/calibracao');
const Bcm = require('../models/bcm');
const LigadoMin = require('../models/ligado');
const Umidade = require('../models/umidade');

client.on('message', async function (topic, message) {
  try {
    const data = JSON.parse(message.toString());

    // Verificar qual tabela deve ser usada com base no tópico
    let model;
    if (topic === 'casa') {
      model = Casa;
    } else if (topic === 'calibracao') {
      model = Calibracao;
    } else if (topic === 'BCM365C_2') {
      model = Bcm;
    } else if (topic === 'LigadoMin') {
      model = LigadoMin;
    } else if (topic === 'umidade') {
      model = Umidade;
    }
    if (model) {
      // Verificar se os dados são válidos antes de criar o registro
      if (isValidData(data)) {
        await model.create({ data });
        console.log(`Dados inseridos com sucesso na tabela ${topic}`);
      } else {
        console.log(`Dados inválidos no tópico ${topic}, não foram inseridos.`);
      }
    } else {
      console.log(`Tópico ${topic} não reconhecido, dados não foram inseridos.`);
    }

  } catch (err) {
    console.error('Ocorreu um erro:', err);
  }
});

// Função para verificar a validade dos dados
function isValidData(data) {
  return !!data;
}

module.exports
