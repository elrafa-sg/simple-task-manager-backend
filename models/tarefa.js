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
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vencimento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      prioridade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idUsuario: {
        type: DataTypes.STRING,
      },
      googleCalendarEventId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Tarefa',
    }
  );
  return Tarefa;
};
