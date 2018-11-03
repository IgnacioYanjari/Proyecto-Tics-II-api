'use strict';
module.exports = (sequelize, DataTypes) => {
  const MaterialType = sequelize.define('MaterialType', {
    name: DataTypes.STRING,
    real_price: DataTypes.FLOAT,
    industry_price: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'material_types'
  });
  MaterialType.associate = function(models) {
    // Un tipo de material tiene muchos materiales asociados.
    MaterialType.hasMany(models.Material);
  };
  return MaterialType;
};
