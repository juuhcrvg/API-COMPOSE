
#API com Docker Compose

<p>Este projeto consiste no desenvolvimento de uma API RESTful  utilizando Node.js, Express e o ORM Sequelize,  <br>
com integração a um banco de dados PostgreSQL. A aplicação é orquestrada com Docker Compose para facilitar o desenvolvimento,  <br>
a execução e a implantação.</p>

## Descrição da Tarefa
<p> O objetivo desta tarefa é aprofundar os conhecimentos sobre Docker e Docker Compose para criar uma API completa e preparada para produção.  <br>
API interage com um banco de dados para persistir os dados de usuários e implementa um tratamento de erros adequado, além de paginação nos resultados.
 </p>
 
Este é um projeto de API para gerenciamento de tarefas, desenvolvido com **Node.js** e **Express**.

## 🚀 Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS recomendada, ex: 18.x)
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/) (geralmente incluído no Docker Desktop)
* Um cliente Git (para clonar o repositório, se aplicável)

## Configuração do Ambiente de Desenvolvimento 🛠️

1.  **Clone o repositório (se estiver no GitHub):**
    ```bash
    git clone <url-do-seu-repositorio-github>
    cd api-node-docker
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Copie o arquivo `.env.example` para um novo arquivo chamado `.env` na raiz do projeto.
    ```bash
    cp .env.example .env
    ```
    Abra o arquivo `.env` e ajuste as variáveis conforme necessário (especialmente `DB_PASSWORD` e `PORT` se desejar portas diferentes). O conteúdo padrão do `.env.example` pode ser:
    ```ini
    # Configurações da Aplicação
    NODE_ENV=development
    PORT=3000

    # Configurações do Banco de Dados PostgreSQL
    DB_HOST=db
    DB_USER=postgres
    DB_PASSWORD=mysecretpassword # ALTERE PARA UMA SENHA SEGURA
    DB_NAME=apidb
    DB_PORT=5432
    DB_EXTERNAL_PORT=5433 # Porta para acesso externo ao BD (opcional)
    ```
    **Importante:** Adicione o arquivo `.env` ao seu `.gitignore` para não versionar informações sensíveis.

3.  **(Opcional, se usar `entrypoint.sh`) Torne o script de entrypoint executável:**
    ```bash
    chmod +x entrypoint.sh
    ```

## Executando a Aplicação com Docker Compose 🚀

1.  **Construa as imagens e inicie os contêineres:**
    No diretório raiz do projeto (onde está o `docker-compose.yml`), execute:
    ```bash
    docker compose up --build
    ```
    O parâmetro `--build` força a reconstrução das imagens. Para execuções subsequentes sem alterações no `Dockerfile` ou dependências, `docker compose up` é suficiente.
    Para rodar em segundo plano (detached mode):
    ```bash
    docker compose up -d --build
    ```

2.  **Execução das Migrações:**
    Se você estiver usando um `entrypoint.sh` configurado no `Dockerfile` para rodar as migrações automaticamente ao  <br>
    iniciar o contêiner `app` (após o banco estar pronto), elas já devem ter sido executadas.
    Caso precise executar manualmente (com os contêineres rodando após `docker compose up -d`):
    ```bash
    docker compose exec app npx sequelize-cli db:migrate
    ```

3.  **Acessando a API:**
    * A API estará disponível em: `http://localhost:3000` (ou a porta configurada na variável `PORT`).
    * A documentação Swagger/OpenAPI (se implementada) geralmente fica em `http://localhost:3000/api-docs`.

4.  **Parando a Aplicação:**
    * Se estiver rodando em primeiro plano, pressione `Ctrl+C` no terminal onde `docker compose up` foi executado.
    * Para parar os contêineres (se rodando em detached mode ou de outro terminal):
        ```bash
        docker compose down
        ```
    * Para parar e remover os volumes (ATENÇÃO: isso apagará os dados do banco de dados):
        ```bash
        docker compose down -v
        ```

O servidor será iniciado em: `http://localhost:3000`

## 🌍 Endpoints disponíveis:

### 1️⃣ Rota Inicial
- **Método:** `GET`
- **URL:** `/`
- **Descrição:** Testa se a API está funcionando.
- **Resposta:** `"API de tarefas funcionando!"`

### 2️⃣ Listar todas as tarefas
- **Método:** `GET`
- **URL:** `/tarefas`
- **Descrição:** Retorna todas as tarefas cadastradas.

### 3️⃣ Listar uma tarefa por ID
- **Método:** `GET`
- **URL:** `/tarefas/:id`
- **Descrição:** Retorna uma tarefa específica pelo ID.

### 4️⃣ Criar uma nova tarefa
- **Método:** `POST`
- **URL:** `/tarefas`
- **Descrição:** Cria uma nova tarefa.
- **Corpo da requisição (JSON):**
  ```json
  {
    "titulo": "Nova Tarefa",
    "descricao": "Descrição da nova tarefa",
    "concluida": false
  }
  ```

### 5️⃣ Atualizar uma tarefa por ID
- **Método:** `PUT`
- **URL:** `/tarefas/:id`
- **Descrição:** Atualiza uma tarefa específica pelo ID.
- **Corpo da requisição (JSON):**
  ```json
  {
    "titulo": "Tarefa Atualizada",
    "descricao": "Descrição atualizada",
    "concluida": true
  }
  ```

### 6️⃣ Marcar uma tarefa como concluída
- **Método:** `PATCH`
- **URL:** `/tarefas/:id/concluir`
- **Descrição:** Marca uma tarefa como concluída.

### 7️⃣ Deletar uma tarefa por ID
- **Método:** `DELETE`
- **URL:** `/tarefas/:id`
- **Descrição:** Remove uma tarefa específica pelo ID.

### 8️⃣ Rota inválida (404)
- **Descrição:** Qualquer rota não definida retornará:
  ```json
  {
    "mensagem": "Rota não encontrada."
  }
  ```

## Tecnologias Utilizadas ⚙️

* **Node.js:** Ambiente de execução JavaScript no servidor.
* **Express:** Framework web para Node.js, utilizado para construir a API.
* **Sequelize:** ORM (Object-Relational Mapper) para Node.js, facilitando a interação com o banco de dados PostgreSQL.
* **PostgreSQL:** Banco de dados relacional utilizado para persistir os dados.
* **Docker:** Plataforma de contêineres para empacotar e distribuir a aplicação.
* **Docker Compose:** Ferramenta para definir e executar aplicações Docker multi-contêiner.
* **Dotenv:** Para gerenciamento de variáveis de ambiente.
* **Express-validator:** Para validação dos dados de entrada.
* **(Opcional) Swagger/OpenAPI:** Para documentação da API (se implementado).

## Funcionalidades e Endpoints da API 🚀

A API expõe os seguintes endpoints para gerenciamento de usuários:

* **`GET /api/usuarios`**: Retorna uma lista de usuários paginada (10 usuários por página por padrão).
    * Query Params: `page` (número da página), `limit` (itens por página).
* **`GET /api/usuarios/:id`**: Retorna um usuário específico pelo ID.
* **`POST /api/usuarios`**: Cria um novo usuário.
    * Corpo da requisição (JSON): `{ "name": "string", "email": "string (email válido)", "password": "string (mín. 6 caracteres)" }`
* **`PUT /api/usuarios/:id`**: Atualiza um usuário existente pelo ID.
    * Corpo da requisição (JSON): `{ "name": "string", "email": "string (email válido)", "password": "string (mín. 6 caracteres)" }` (campos opcionais)
* **`DELETE /api/usuarios/:id`**: Exclui um usuário pelo ID.

### Tratamento de Erros e Validações

* Validação de dados para criação e atualização de usuários (campos obrigatórios, formato de email, tamanho mínimo de senha).
* Retorno de códigos de status HTTP apropriados (200, 201, 400, 404, 409, 422, 500).
* Mensagens de erro descritivas em formato JSON.
envolvimento)
>>>>>>> f0d09a7 (Primeiro commit: API de Tarefas)
=======
# api-tarefas
API para gerenciamento de tarefas com Node.js e Express.
>>>>>>> 3d512f7 (Initial commit)
