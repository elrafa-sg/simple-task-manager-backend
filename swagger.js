const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Simple Task Manager API',
    description: 'API do projeto de gerenciamento de tarefas integrado com o google calendar'
  },
  host: 'localhost:4000'
}

const outputFile = './swagger.json'
const routes = ['./src/routers/index.ts']

swaggerAutogen(outputFile, routes, doc)
