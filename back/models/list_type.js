"use strict";
module.exports = (sequelize, DataTypes) => {
  const ListType = sequelize.define(
    "ListType",
    {
      tender_id: {
        type: DataTypes.INTEGER
      },
      type_id: {
        type: DataTypes.INTEGER
      }
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "list_types"
    }
  );
  ListType.associate = function(models) {
    // Tiene una licitacion
    ListType.belongsTo(models.Tender, {foreignKey: "tender_id"});

    // Tiene un tipo de licitación
    ListType.belongsTo(models.TenderType, {foreignKey: "type_id"});
  };
  return ListType;
};
