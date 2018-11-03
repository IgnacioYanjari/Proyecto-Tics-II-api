'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supply = sequelize.define('Supply', {
    name: DataTypes.STRING,
    quantity: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'supplies'
  });
  Supply.associate = function(models) {
    // Un insumo pertenece a un tipo de insumo.
    Supply.belongsTo(models.SupplyType);

    // Un insumo pertenece a una tarea.
    Supply.belongsTo(models.Task);
  };
  return Supply;
};
