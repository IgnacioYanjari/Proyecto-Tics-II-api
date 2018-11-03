'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkforceType = sequelize.define('WorkforceType', {
    name: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'workforce_types'
  });
  WorkforceType.associate = function(models) {
    // Un tipo de mano de obra tiene muchas manos de obra.
    WorkforceType.hasMany(models.Workforce)
  };
  return WorkforceType;
};
