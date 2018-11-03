'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkerUse = sequelize.define('WorkerUse', {
    worker_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'worker_uses'
  });
  WorkerUse.associate = function(models) {
    // Pertenece a un trabajador
    WorkerUse.belongsTo(models.Worker);

    // Pertenece a un tipo de maquinaria.
    WorkerUse.belongsTo(models.MachineType, {foreignKey: 'type_id'});

  };
  return WorkerUse;
};
