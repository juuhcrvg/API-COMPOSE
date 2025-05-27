const { v4: uuidv4 } = require('uuid');
const { tarefas } = require('../database/fakeDb'); // Certifique-se de que está acessando corretamente o array

function listarTodas() {
  return tarefas;
}

function listarPorId(id) {
  return tarefas.find(t => t.id === id) || null; // Retorna null se não encontrar
}

function listarFiltradas(concluida) {
  return tarefas.filter(t => t.concluida === concluida);
}

function criarTarefa({ titulo, descricao, concluida = false }) {
  if (!titulo || !descricao) {
    throw new Error('Os campos "titulo" e "descricao" são obrigatórios.');
  }
  const nova = { id: uuidv4(), titulo, descricao, concluida }; // Valor padrão para `concluida`
  tarefas.push(nova);
  console.log(`Tarefa criada: ID: ${nova.id}, Título: ${nova.titulo}, Descrição: ${nova.descricao}`);
  return nova;
}

function atualizarTarefa(id, dados) {
  const tarefa = listarPorId(id);
  if (!tarefa) return null;
  Object.assign(tarefa, dados); // Atualiza apenas os campos fornecidos
  console.log(`Tarefa atualizada: ID: ${tarefa.id}, Título: ${tarefa.titulo}, Descrição: ${tarefa.descricao}`);
  return tarefa;
}

function marcarComoConcluida(id) {
  const tarefa = listarPorId(id);
  if (!tarefa) return null;
  tarefa.concluida = true;
  console.log(`Tarefa marcada como concluída: ID: ${tarefa.id}, Título: ${tarefa.titulo}, Descrição: ${tarefa.descricao}`);
  return tarefa;
}

function deletarTarefa(id) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return false;
  const [tarefaDeletada] = tarefas.splice(index, 1); // Remove a tarefa do array
  console.log(`Tarefa deletada: ID: ${tarefaDeletada.id}, Título: ${tarefaDeletada.titulo}, Descrição: ${tarefaDeletada.descricao}`);
  return true;
}

module.exports = {
  listarTodas,
  listarPorId,
  listarFiltradas,
  criarTarefa,
  atualizarTarefa,
  marcarComoConcluida,
  deletarTarefa,
};