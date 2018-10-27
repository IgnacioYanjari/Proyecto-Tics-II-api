'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    rut : DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
