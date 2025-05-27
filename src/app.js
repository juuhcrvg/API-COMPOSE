console.log('Iniciando o app...');
const express = require('express');
const tarefasRoutes = require('./routes/tarefasRoutes'); // <-- Importa as rotas

const app = express();

app.use(express.json());

// Usa as rotas da API de tarefas com prefixo
app.use('/tarefas', tarefasRoutes);

// Rota inicial só pra teste
app.get('/', (req, res) => {
  res.send('API de Tarefas funcionando!');
});

// Rota 404 para endpoints inválidos
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

// Middleware para erros genéricos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensagem: 'Erro interno do servidor.' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});