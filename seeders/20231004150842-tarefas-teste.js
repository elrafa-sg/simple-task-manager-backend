'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('Tarefas', [
      {
        titulo: 'Tarefa um',
        descricao: 'Primeira tarefa da lista',
        vencimento: new Date(),
        prioridade: 'baixa',
        createdAt: new Date(),
        updatedAt: new Date(),
        idUsuario: 1,
      },
      {
        titulo: 'Tarefa dois',
        descricao: 'segunda tarefa da lista',
        vencimento: new Date(),
        prioridade: 'alta',
        createdAt: new Date(),
        updatedAt: new Date(),
        idUsuario: 1,
      },
      {
        titulo: 'Tarefa 1',
        descricao: 'Primeira tarefa da lista',
        vencimento: new Date(),
        prioridade: 'media',
        createdAt: new Date(),
        updatedAt: new Date(),
        idUsuario: 2,
      },
      {
        titulo: 'Tarefa 2',
        descricao: 'Segunda tarefa da lista',
        vencimento: new Date(),
        prioridade: 'media',
        createdAt: new Date(),
        updatedAt: new Date(),
        idUsuario: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Tarefas', null, {});
  },
};
