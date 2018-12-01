"use strict";
module.exports = (sequelize, DataTypes) => {
  const TenderType = sequelize.define(
    "TenderType",
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "tender_types"
    }
  );
  TenderType.associate = function(models) {
    // Un tipo de licitación tiene muchas licitaciones(n:m).
    TenderType.belongsToMany(models.Tender, {
      through: {
        model: models.ListType,
        unique: false
      },
      foreignKey: "type_id",
      constraints: false
    });
  };
  return TenderType;
};
