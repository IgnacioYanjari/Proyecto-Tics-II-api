"use strict";
module.exports = (sequelize, DataTypes) => {
  const WorkMachine = sequelize.define(
    "WorkMachine",
    {
      worker_id: DataTypes.INTEGER,
      machine_id: DataTypes.INTEGER
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "work_machines"
    }
  );
  WorkMachine.associate = function(models) {
    // Pertenece a un trabajador
    WorkMachine.belongsTo(models.Worker);

    // Pertenece a un trabajador
    WorkMachine.belongsTo(models.Machine);
  };
  return WorkMachine;
};
