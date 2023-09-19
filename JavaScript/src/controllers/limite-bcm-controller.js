const LimiteBcm = require('../models/limite-BCM');
const BCM240_S = require('../models/BCM240_S');

// Função para comparar os dados com a tabela Limite
async function compararDadosComLimiteBCm(dados) {
  try {
    // Consultar os limites da tabela Limite
    const limites = await LimiteBcm.findOne();

    // Comparar os dados recebidos com os limites
    const comparacoes = {
      data: dados.data >= limites.limite_min_vibracao && dados.data <= limites.limite_max_vibracao,
    };
    return comparacoes;
    
  } catch (error) {
    console.error('Ocorreu um erro ao comparar os dados com o limite:', error);
    throw error;
  }
}

async function createLimite(limite) {
  try {
    limite = await LimiteBcm.create({ ...limite});
    return limite.toJSON();
  } catch (error) {
    console.error('Não foi possível criar o limite: ', error);
    res.status(500).json({ message: 'Erro ao criar o limite' });
  }
}

async function getAllLimite() {
  try {
    limites = await LimiteBcm.findAll();
    return limites.map(limite => limite.toJSON());
  } catch (error) {
    console.error('Não foi possível buscar os limites: ', error);
    res.status(500).json({ message: 'Erro ao buscar os limites' });
  }
}

async function updateLimite(id, data) {
    try {
      const limite = await LimiteBcm.findByPk(id);
      if (limite) {
        const limiteMinAntigo = limite.limite_min_vibracao;
        const limiteMaxAntigo = limite.limite_max_vibracao;
  
        limite.limite_min_vibracao = data.limite_min_vibracao;
        limite.limite_max_vibracao = data.limite_max_vibracao;
  
        await limite.save();
        console.log('Limite atualizado', limite.toJSON());
  
        // Agora, atualize as entradas na tabela Casa que possuem os limites antigos
        await BCM240_S.update(
          { limite_min_vibracao: data.limite_min_vibracao, limite_max_vibracao: data.limite_max_vibracao },
          { where: { limite_min_vibracao: limiteMinAntigo, limite_max_vibracao: limiteMaxAntigo } }
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
    const limite = await LimiteBcm.findByPk(id);
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

module.exports = { createLimite, getAllLimite, updateLimite, deleteLimite, compararDadosComLimiteBCm };
