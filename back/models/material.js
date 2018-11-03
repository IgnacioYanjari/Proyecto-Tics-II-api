'use strict';
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    name: DataTypes.STRING,
    quantity: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'materials'
  });
  Material.associate = function(models) {
    // Un Material pertenece a un tipo de Material.
    Material.belongsTo(models.MaterialType);

    // Un Material pertenece a una tarea especifica.
    Material.belongsTo(models.Task);
  };
  return Material;
};
