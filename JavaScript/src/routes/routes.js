const express = require('express');
const Casa = require('../models/casa');
const Calibracao = require('../models/calibracao');
const Bcm = require('../models/bcm');
const LigadoMin = require('../models/ligado');
const Umidade = require('../models/umidade');

const router = express.Router();

// Função para buscar dados de uma tabela específica
async function getTableData(model) {
  try {
    const data = await model.findAll();
    return data.map(item => item.toJSON());
  } catch (error) {
    console.error('Não foi possível buscar os dados da tabela: ', error);
    throw error;
  }
}

router.get('/:tableName', async (req, res) => {
  const { tableName } = req.params;
  let data;

  try {
    switch (tableName) {
      case 'casa':
        data = await getTableData(Casa);
        break;
      case 'calibracao':
        data = await getTableData(Calibracao);
        break;
      case 'bcm':
        data = await getTableData(Bcm);
        break;
      case 'ligado':
        data = await getTableData(LigadoMin);
        break;
      case 'umidade':
        data = await getTableData(Umidade);
        break;
      default:
        return res.status(404).json({ message: 'Tabela não encontrada' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados da tabela' });
  }
});

router.get('/', async (req, res) => {
    try {
      const casaData = await getTableData(Casa);
      const calibracaoData = await getTableData(Calibracao);
      const bcmData = await getTableData(Bcm);
      const ligadoMinData = await getTableData(LigadoMin);
      const umidadeData = await getTableData(Umidade);
  
      // Combina todos os dados em um único objeto
      const allData = {
        casa: casaData,
        calibracao: calibracaoData,
        bcm: bcmData,
        ligadoMin: ligadoMinData,
        umidade: umidadeData,
      };
  
      res.json(allData);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dados das tabelas' });
    }
  });

module.exports = router;
