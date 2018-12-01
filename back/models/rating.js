"use strict";
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      worker_id: DataTypes.INTEGER,
      work_id: DataTypes.INTEGER,
      points: DataTypes.INTEGER
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "ratings"
    }
  );
  Rating.associate = function(models) {
    // Pertenece a una obra
    Rating.belongsTo(models.Work);

    // Pertenece a un trabajador
    Rating.belongsTo(models.Worker);
  };
  return Rating;
};
