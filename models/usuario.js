'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Usuario.init(
    {
      nome: DataTypes.STRING,
      senha: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Usuario',
    }
  );
  return Usuario;
};
