"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProfileTender = sequelize.define(
    "ProfileTender",
    {
      profile_id: DataTypes.INTEGER,
      tender_id: DataTypes.INTEGER
    },
    {
      underscored: true,
      timestamps: true,
      paranoid: true,
      tableName: "profile_tenders"
    }
  );
  ProfileTender.associate = function(models) {
    // Pertenece a un perfil
    ProfileTender.belongsTo(models.Profile);

    // Pertenece a una licitación.
    ProfileTender.belongsTo(models.Tender);
  };
  return ProfileTender;
};
