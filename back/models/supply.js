'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supply = sequelize.define('Supply', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'supplies'
  });
  Supply.associate = function(models) {
    // Un insumo pertenece a un tipo de insumo.
    Supply.belongsTo(models.SupplyType, {foreignKey: 'type_id', as: 'type'});

    // Un insumo pertenece a una tarea.
    // Supply.belongsTo(models.Task);
  };
  return Supply;
};
