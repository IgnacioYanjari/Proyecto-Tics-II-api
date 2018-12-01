"use strict";
module.exports = (sequelize, DataTypes) => {
  const SupplyType = sequelize.define(
    "SupplyType",
    {
      name: DataTypes.STRING
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "supply_types"
    }
  );
  SupplyType.associate = function(models) {
    // Un tipo de insumo tiene muchos insumos.
    SupplyType.hasMany(models.Supply, {foreignKey: "type_id"});
  };
  return SupplyType;
};
