const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Simple Task Manager API',
    description:
      'API do projeto de gerenciamento de tarefas integrado com o google calendar',
  },
  tags: ['Usuario', 'Tarefa'],
  definitions: {
    Usuario: {
      nome: '',
      senha: '',
      email: '',
      createdAt: '',
      updatedAt: '',
    },
    UsuarioLogin: {
      $nome: '',
      $senha: '',
    },
    UsuarioToken: {
      access_token: '',
    },
    UsuarioCriar: {
      $nome: '',
      $senha: '',
      $email: '',
    },
    TarefaCriar: {
      $titulo: '',
      $descricao: '',
      $vencimento: '',
      $prioridade: 0,
    },
    TarefaAtualizar: {
      $id: '',
      $titulo: '',
      $descricao: '',
      $vencimento: '',
      $prioridade: 0,
    },
    TarefaDeletar: {
      $id: '',
    },
    Tarefa: {
      $id: '',
      $titulo: '',
      $descricao: '',
      $vencimento: '',
      $prioridade: 0,
      idUsuario: '',
      googleCalendarEventId: '',
      createdAt: '',
      updatedAt: '',
    },
    ListaTarefas: [{ $ref: '#/definitions/Tarefa' }],
    RespostaPadrao: {
      message: '',
    },
  },
  host: 'localhost:4000',
};

const outputFile = './swagger.json';
const routes = ['./src/routers/index.ts'];

swaggerAutogen(outputFile, routes, doc);
