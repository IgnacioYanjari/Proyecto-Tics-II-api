'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClientType = sequelize.define('ClientType', {
    name: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'client_type'
  });
  ClientType.associate = function(models) {
    // Tiene muchos clientes.
    ClientType.hasMany(models.Client);
  };
  return ClientType;
};
