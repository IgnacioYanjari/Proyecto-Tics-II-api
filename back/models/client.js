'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true
  });
  Client.associate = function(models) {
    // Un Cliente tiene un solo tipo de Cliente.
    Client.belongsTo(models.Client_type);

    // Un Cliente tiene muchas licitaciones
    Client.hasMany(models.Tender);
  };
  return Client;
};
