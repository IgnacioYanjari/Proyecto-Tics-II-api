'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true
  });
  Role.associate = function(models) {
    // Tiene muchos usuarios
    Role.belongsToMany(models.User, {
      through: {
        model: models.Profile,
        unique: false,
      },
      foreignKey: 'role_id',
      constraints: false
    });

  };
  return Role;
};
