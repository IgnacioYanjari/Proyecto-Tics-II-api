'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    budget: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'tasks'
  });
  Task.associate = function(models) {
    // Una tarea pertenece a una obra
    Task.belongsTo(models.Work);

    // Una tarea tiene muchos materiales
    Task.hasMany(models.Material);

    // Una tarea tiene muchos insumos
    Task.hasMany(models.Supply);

    // Una tarea tiene muchos equipos
    Task.hasMany(models.Machine);

    // Una tarea tiene mucha mano de obra
    Task.hasMany(models.Workforce);
  };
  return Task;
};
