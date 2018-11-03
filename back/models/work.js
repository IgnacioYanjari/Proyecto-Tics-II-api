'use strict';
module.exports = (sequelize, DataTypes) => {
  const Work = sequelize.define('Work', {
    name: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    general_cost: DataTypes.FLOAT,
    utility: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'works'
  });
  Work.associate = function(models) {
    // Una obra es de un tipo de obra.
    Work.belongsTo(models.WorkType);

    // Una obra es de una licitación.
    Work.belongsTo(models.Tender);

    // Una obra tiene muchas tareas.
    Work.hasMany(models.Task);

    // Calificaciones quedan fuera del alcance.
    Work.belongsToMany(models.Worker, {
      through: {
        model: models.Rating,
        unique: false,
      },
      foreignKey: 'work_id',
      constraints: false
    });
  };
  return Work;
};
