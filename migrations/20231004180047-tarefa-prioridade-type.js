'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Tarefas', 'prioridade', {
      type: Sequelize.ENUM(['baixa', 'media', 'alta']),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Tarefas', 'proridade', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
