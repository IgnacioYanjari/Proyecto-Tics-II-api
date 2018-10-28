'use strict';
module.exports = (sequelize, DataTypes) => {
  const MachineType = sequelize.define('MachineType', {
    name: DataTypes.STRING,
    quantity: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true
  });
  MachineType.associate = function(models) {
    // Un tipo de maquina tiene muchas maquinas asociadas.
    MachineType.hasMany(models.Machine);

    // Un tipo de maquina puede ser usada por muchos trabajadores.
    MachineType.belongsToMany(models.Worker, {
      through: {
        model: models.WorkerUse,
        unique: false,
      },
      foreignKey: 'type_id',
      constraints: false
    });
  };
  return MachineType;
};
