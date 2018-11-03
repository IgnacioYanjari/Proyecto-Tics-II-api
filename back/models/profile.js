'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    role_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'profiles'
  });
  Profile.associate = function(models) {
    // Pertenece a un usuario
    Profile.belongsTo(models.User, { foreignKey:'user_id', as : 'Users'});

    // Pertenece a un role
    Profile.belongsTo(models.Role, { foreignKey:'role_id', as : 'Roles'});

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
