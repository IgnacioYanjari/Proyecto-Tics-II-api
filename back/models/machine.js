'use strict';
module.exports = (sequelize, DataTypes) => {
  const Machine = sequelize.define('Machine', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    weight_type: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'machines'
  });
  Machine.associate = function(models) {
    // Una maquina pertenece a un tipo de maquina.
    Machine.belongsTo(models.MachineType, {foreignKey: 'type_id', as: 'type' });

    // Una maquina o equipo pertenece a una tarea
    // Machine.belongsTo(models.Task);

    // Una maquina tiene muchos trabajadores que la usan
    // Machine.belongsToMany(models.Worker, {
    //   through: {
    //     model: models.WorkMachine,
    //     unique: false,
    //   },
    //   foreignKey: 'machine_id',
    //   constraints: false
    // });
  };
  return Machine;
};
