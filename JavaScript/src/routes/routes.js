const express = require('express');
const BCM240_S = require('../models/BCM240_S');
const Calibracao = require('../models/calibracao');

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
      case 'BCM240_S':
        data = await getTableData(BCM240_S);
        break;
      case 'calibracao':
        data = await getTableData(Calibracao);
        break;
      default:
        return res.status(404).json({ message: 'Tabela não encontrada' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados da tabela' });
  }
});

module.exports = router;
