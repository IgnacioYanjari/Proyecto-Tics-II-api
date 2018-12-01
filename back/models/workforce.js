"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workforce = sequelize.define(
    "Workforce",
    {
      payment: DataTypes.STRING
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "workforces"
    }
  );
  Workforce.associate = function(models) {
    // Pertenece a un tipo de mano de obra
    Workforce.belongsTo(models.WorkforceType);

    // Pertenece a una tarea
    Workforce.belongsTo(models.Task);

    // Pertenece a un trabajador
    Workforce.belongsTo(models.Worker);
  };
  return Workforce;
};
