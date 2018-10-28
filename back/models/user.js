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
    paranoid : true
  });
  User.associate = function(models) {
    // Un usuario tiene muchos roles
    User.belongsToMany(models.role, {
      through: {
        model: models.profile,
        unique: false,
      },
      foreignKey: 'user_id',
      constraints: false
    });
  };
  return User;
};
