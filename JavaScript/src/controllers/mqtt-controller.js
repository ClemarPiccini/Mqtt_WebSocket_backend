const client = require('../../config');
const Calibracao = require('../models/calibracao');
const LimiteCalibracao = require('../models/limite-calibracao');
const BCM240_S = require('../models/BCM240_S');
const LimiteBcm = require('../models/limite-BCM')

client.on('message', async function (topic, message) {
  try {
    const data = JSON.parse(message.toString());

    if (topic === 'calibracao') {
      // Passo 1: Consulte a tabela de limites correspondente para obter os valores dos limites
      const limitesModel = LimiteCalibracao; // Usando LimiteCalibracao para o tópico 'calibracao'
      const limites = await limitesModel.findOne({});

      if (limites) {
        // Se limites forem encontrados, crie um registro na tabela correspondente
        let numeroGerado;
        if (data < limites.limite_min_temp) {
          numeroGerado = 25;
          console.log(`O valor está abaixo do limite mínimo.`);
        } else if (data > limites.limite_max_temp) {
          numeroGerado = 75;
          console.log(`O valor está acima do limite máximo.`);
        } else {
          numeroGerado = 50;
          console.log(`O valor está dentro dos limites.`);
        }

        // Create a new record in the 'Calibracao' table with 'numeroGerado'
        const novoRegistro = {
          data,
          limite_min_temp: limites.limite_min_temp,
          limite_max_temp: limites.limite_max_temp,
          numeroGerado, // Add 'numeroGerado' to the record
        };

        await Calibracao.create(novoRegistro);
        console.log(`Dados inseridos com sucesso na tabela ${topic}`);
      } else {
        console.log(`Valores de limites não encontrados na tabela Limites para o tópico ${topic}.`);
      }
    } else if (topic === 'BCM240_S') {
      const limitesModel = LimiteBcm; // Usando LimiteBcm para o tópico 'BCM240_S'
      const limites = await limitesModel.findOne({});

      if (limites) {
        // Faça a comparação de limite para o tópico 'BCM240_S'
        let numeroGerado;
        if (data < limites.limite_min_vibracao) {
          numeroGerado = 25;
          console.log(`O valor está abaixo do limite mínimo.`);
        } else if (data > limites.limite_max_vibracao) {
          numeroGerado = 75;
          console.log(`O valor está acima do limite máximo.`);
        } else {
          numeroGerado = 50;
          console.log(`O valor está dentro dos limites.`);
        }

        // Crie um registro na tabela 'BCM240_S' com 'numeroGerado'
        const novoRegistro = {
          data,
          limite_min_vibracao: limites.limite_min_vibracao,
          limite_max_vibracao: limites.limite_max_vibracao,
          numeroGerado, // Adicione 'numeroGerado' ao registro
        };

        await BCM240_S.create(novoRegistro);
        console.log(`Dados inseridos com sucesso na tabela ${topic}`);
      } else {
        console.log(`Valores de limites não encontrados na tabela Limites para o tópico ${topic}.`);
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
  return data; // Adicione sua lógica de validação aqui, se necessário
}

module.exports = isValidData; // Exportar a função isValidData
