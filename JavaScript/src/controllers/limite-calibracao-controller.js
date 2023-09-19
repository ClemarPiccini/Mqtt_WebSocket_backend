const LimiteCalibracao = require('../models/limite-calibracao');
const Calibracao = require('../models/calibracao');

// Função para comparar os dados com a tabela Limite
async function compararDadosComLimite(dados) {
  try {
    // Consultar os limites da tabela Limite
    const limites = await LimiteCalibracao.findOne();

    // Comparar os dados recebidos com os limites
    const comparacoes = {
      data: dados.data >= limites.limite_min_temp && dados.data <= limites.limite_max_temp,
    };
    return comparacoes;
    
  } catch (error) {
    console.error('Ocorreu um erro ao comparar os dados com o limite:', error);
    throw error;
  } 
}

async function createLimite(limite) {
  try {
    limite = await LimiteCalibracao.create({ ...limite});
    return limite.toJSON();
  } catch (error) {
    console.error('Não foi possível criar o limite: ', error);
    res.status(500).json({ message: 'Erro ao criar o limite' });
  }
}

async function getAllLimite() {
  try {
    limites = await LimiteCalibracao.findAll();
    return limites.map(limite => limite.toJSON());
  } catch (error) {
    console.error('Não foi possível buscar os limites: ', error);
    res.status(500).json({ message: 'Erro ao buscar os limites' });
  }
}

async function updateLimite(id, data) {
    try {
      const limite = await LimiteCalibracao.findByPk(id);
      if (limite) {
        const limiteMinAntigo = limite.limite_min_temp;
        const limiteMaxAntigo = limite.limite_max_temp;
  
        limite.limite_min_temp = data.limite_min_temp;
        limite.limite_max_temp = data.limite_max_temp;
  
        await limite.save();
        console.log('Limite atualizado', limite.toJSON());
  
        // Agora, atualize as entradas na tabela Casa que possuem os limites antigos
        await Calibracao.update(
          { limite_min_temp: data.limite_min_temp, limite_max_temp: data.limite_max_temp },
          { where: { limite_min_temp: limiteMinAntigo, limite_max_temp: limiteMaxAntigo } }
        );
  
        console.log('Entradas na tabela Casa atualizadas com os novos limites');
      } else {
        res.status(404).json({ message: 'Limite não encontrado' });
      }
    } catch (error) {
      console.error('Não foi possível atualizar o limite: ', error);
      res.status(500).json({ message: 'Erro ao atualizar o limite' });
    }
  }

async function deleteLimite(id) {
  try {
    const limite = await LimiteCalibracao.findByPk(id);
    if (limite) {
      await limite.destroy();
      console.log('Limite excluido: ', limite.toJSON());
    } else {
      console.log('Limite não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir o limite: ', error);
  }
}

module.exports = { createLimite, getAllLimite, updateLimite, deleteLimite, compararDadosComLimite };
