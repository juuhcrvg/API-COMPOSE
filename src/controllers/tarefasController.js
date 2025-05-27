const service = require('../services/tarefasService');
const logger = require('../utils/logger');

const listar = (req, res) => {
  try {
    const { concluida } = req.query;
    const tarefas = concluida !== undefined
      ? service.listarFiltradas(concluida === 'true')
      : service.listarTodas();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar tarefas.', detalhes: error.message });
  }
};

const listarPorId = (req, res) => {
  try {
    const tarefa = service.listarPorId(req.params.id);
    if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar tarefa.', detalhes: error.message });
  }
};

const criar = (req, res) => {
  try {
    const nova = service.criarTarefa(req.body);
    logger('Tarefa criada com sucesso.');
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar tarefa.', detalhes: error.message });
  }
};

const atualizar = (req, res) => {
  try {
    const atualizada = service.atualizarTarefa(req.params.id, req.body);
    if (!atualizada) return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
    res.json(atualizada);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar tarefa.', detalhes: error.message });
  }
};

const concluir = (req, res) => {
  try {
    const tarefa = service.marcarComoConcluida(req.params.id);
    if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
    res.json({ mensagem: 'Tarefa marcada como concluída.' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao concluir tarefa.', detalhes: error.message });
  }
};

const deletar = (req, res) => {
  try {
    const sucesso = service.deletarTarefa(req.params.id);
    if (!sucesso) return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
    logger('Tarefa deletada.');
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar tarefa.', detalhes: error.message });
  }
};

module.exports = { listar, listarPorId, criar, atualizar, concluir, deletar };