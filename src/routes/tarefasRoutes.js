const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefasController');
const validateTarefa = require('../middlewares/validateTarefa');

// Rotas de tarefas
router.get('/', controller.listar); // Lista todas as tarefas
router.get('/:id', controller.listarPorId); // Lista uma tarefa por ID
router.post('/', validateTarefa, controller.criar); // Cria uma nova tarefa
router.put('/:id', validateTarefa, controller.atualizar); // Atualiza uma tarefa por ID
router.patch('/:id/concluir', controller.concluir); // Marca uma tarefa como concluída
router.delete('/:id', controller.deletar); // Deleta uma tarefa por ID

module.exports = router;