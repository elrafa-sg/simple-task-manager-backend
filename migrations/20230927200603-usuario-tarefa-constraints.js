'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // ATUALIZANDO USUARIO
    await queryInterface.changeColumn('Usuarios', 'nome', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Usuarios', 'senha', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Usuarios', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    // ATUALIZANDO TAREFA
    await queryInterface.changeColumn('Tarefas', 'titulo', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Tarefas', 'descricao', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Tarefas', 'vencimento', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Tarefas', 'prioridade', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // ATUALIZANDO USUARIO
    await queryInterface.changeColumn('Usuarios', 'nome', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Usuarios', 'senha', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Usuarios', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    // ATUALIZANDO TAREFA
    await queryInterface.changeColumn('Tarefas', 'titulo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Tarefas', 'descricao', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Tarefas', 'vencimento', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Tarefas', 'prioridade', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
