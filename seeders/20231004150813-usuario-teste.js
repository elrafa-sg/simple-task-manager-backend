'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('Usuarios', [
      {
        id: 1,
        nome: 'João Doe',
        senha: 'senhasecreta',
        email: 'joaodoe@emaildomain.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nome: 'Maria Foo',
        senha: 'segredoparticular',
        email: 'mariafoo@emaildomain.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Usuarios', null, {});
  },
};
