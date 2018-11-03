'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    rut : DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'users'
  });
  User.associate = function(models) {
    // Un usuario tiene muchos roles
    User.belongsToMany(models.Role, {
      through: {
        model: models.Profile,
        unique: false,
      },
      foreignKey: 'user_id',
      constraints: false
    });

    User.hasMany(models.Profile, { foreignKey : 'user_id', as : 'Profiles'});
  };
  return User;
};
