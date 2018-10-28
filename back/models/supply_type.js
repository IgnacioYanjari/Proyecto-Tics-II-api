'use strict';
module.exports = (sequelize, DataTypes) => {
  const SupplyType = sequelize.define('SupplyType', {
    name: DataTypes.STRING,
    real_price: DataTypes.FLOAT,
    industry_price: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true
  });
  SupplyType.associate = function(models) {
    // Un tipo de insumo tiene muchos insumos.
    SupplyType.hasMany(models.Supply);
  };
  return SupplyType;
};
