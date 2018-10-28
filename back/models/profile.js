'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    role_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true
  });
  Profile.associate = function(models) {
    // Pertenece a un usuario
    Profile.belongsTo(models.User);

    // Pertenece a un role
    Profile.belongsTo(models.Role);

    // Puede ver muchas licitaciones.
    Profile.belongsToMany(models.Tender, {
      through: {
        model: models.ProfileTender,
        unique: false,
      },
      foreignKey: 'profile_id',
      constraints: false
    });
  };
  return Profile;
};
