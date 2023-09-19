const express = require('express');
const controller = require('../controllers/limite-calibracao-controller');

const router = express.Router();

// Rota para criar um novo limite
router.post('/', async (req, res) => {
  try {
    const limite = await controller.createLimite(req.body);
    res.send(limite);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

// Rota para buscar todos os limite
router.get('/', async (req, res) => {
  const limites = await controller.getAllLimite();
  res.send(limites);
});

// Rota para atualizar um limite existente
router.put('/:id', async (req, res) => {
  try {
    const updatedLimite = await controller.updateLimite(req.params.id, req.body);
    res.send(updatedLimite);
  } catch (error) {
    res.status(400).send({ 'message': error.message });
  }
});

// Rota para excluir um limite existente
router.delete('/:id', async (req, res) => {
  try {
    const limite = await controller.deleteLimite(req.params.id);
    res.send(limite);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

module.exports = router;
