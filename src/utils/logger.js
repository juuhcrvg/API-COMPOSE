// Função para registrar mensagens no console com data, hora e nível de log
function logger(mensagem, nivel = 'INFO') {
  const data = new Date().toISOString(); // Obtém a data/hora atual no formato ISO
  console.log(`[${data}] [${nivel}] ${mensagem}`); // Exibe o log formatado
}

module.exports = logger; // Exporta a função para uso em outros arquivos