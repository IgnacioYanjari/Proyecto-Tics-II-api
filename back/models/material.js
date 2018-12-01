"use strict";
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define(
    "Material",
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      brand: DataTypes.STRING
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "materials"
    }
  );
  Material.associate = function(models) {
    // Un Material pertenece a un tipo de Material.
    Material.belongsTo(models.MaterialType, {
      foreignKey: "type_id",
      as: "type"
    });

    // Un Material pertenece a una tarea especifica.
    // Material.belongsTo(models.Task);
  };
  return Material;
};
