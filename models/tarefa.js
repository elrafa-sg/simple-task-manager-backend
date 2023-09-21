'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Tarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tarefa.belongsTo(models.Usuario);
    }
  }
  Tarefa.init(
    {
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      vencimento: DataTypes.DATE,
      prioridade: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Tarefa',
    }
  );
  return Tarefa;
};
