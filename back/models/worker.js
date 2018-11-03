'use strict';
module.exports = (sequelize, DataTypes) => {
  const Worker = sequelize.define('Worker', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    rut: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'workers'
  });
  Worker.associate = function(models) {
    // Tiene muchos mano de obra
    Worker.hasMany(models.Workforce);

    // Tiene muchas calificaciones a traves de califications a obras,
    Worker.belongsToMany(models.Work, {
      through: {
        model: models.Rating,
        unique: false,
      },
      foreignKey: 'worker_id',
      constraints: false
    });

    // Tiene muchos equipos asignados.
    Worker.belongsToMany(models.Machine, {
      through: {
        model: models.WorkMachine,
        unique: false,
      },
      foreignKey: 'worker_id',
      constraints: false
    });

    // Tiene muchos tipos de equipos que puede usar.
    Worker.belongsToMany(models.MachineType, {
      through: {
        model: models.WorkerUse,
        unique: false,
      },
      foreignKey: 'worker_id',
      constraints: false
    });

  };
  return Worker;
};
