"use strict";
module.exports = (sequelize, DataTypes) => {
  const WorkType = sequelize.define(
    "WorkType",
    {
      name: DataTypes.STRING
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "work_types"
    }
  );
  WorkType.associate = function(models) {
    // Un tipo de obra tiene muchas obras.
    WorkType.hasMany(models.Work);
  };
  return WorkType;
};
