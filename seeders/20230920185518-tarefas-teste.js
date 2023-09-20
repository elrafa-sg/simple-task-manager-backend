'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('Tarefas', [
      {
        titulo: 'Tarefa um',
        descricao: 'Primeira tarefa da lista',
        vencimento: new Date(),
        prioridade: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        idUsuario: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Tarefas', null, {});
  },
};
