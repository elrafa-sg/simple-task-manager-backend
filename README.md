# Simple Task Manager

## Descrição:

Gerenciador de tarefas integrado ao google calendar.

##### Tecnologias utilizadas:

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- JWT (JSON Web Tokens)
- Swagger

## Como usar:

1. Clone o repositório:
   ```
   git clone git@github.com:elrafa-sg/simple-task-manager-backend.git
   ```
2. Dentro da pasta do projeto, instale as dependências\*:
   ```
   npm install
   ```
3. Configure o acesso ao banco de dados no arquivo config/config.json.
4. Instale o banco de dados:
   ```
   npx sequelize-cli db:migrate
   ```
5. (opcional) Popule banco de dados com dados de teste:
   ```
   npx sequelize-cli db:seed:all
   ```
6. Execute projeto\*\* (versão para desenvolvimento):
   ```
   npm run dev
   ```
7. Crie uma build:
   ```
   npm run build
   ```
8. Execute o projeto\*\* (versão para produção):
   ```
   npm run start
   ```

#### \* Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

#### \*\* Antes de executar o projeto, versão teste ou produção, certifique-se de preencher as variáveis de ambiente no arquivo /src/config.ts

## Documentação da API:

1. A documentação pode ser acessada após a execução do projeto na rota url:porta/swagger (ex: http://localhost:4000/swagger)
