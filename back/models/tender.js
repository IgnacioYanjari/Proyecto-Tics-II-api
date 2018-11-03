'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tender = sequelize.define('Tender', {
    name: DataTypes.STRING,
    budget: DataTypes.FLOAT,
    date_ini: DataTypes.DATE,
    date_fin: DataTypes.DATE
  }, {
    underscored: true,
    timestamps: true,
    paranoid : true,
    tableName: 'tenders'
  });
  Tender.associate = function(models) {
    // Licitación tiene muchos tipos de licitación(n:m).
    Tender.belongsToMany(models.TenderType, {
      through: {
        model: models.ListType,
        unique: false,
      },
      foreignKey: 'tender_id',
      constraints: false
    });

    // Licitación pertenece a un tipo de cliente.
    Tender.belongsTo(models.Client);

    // Licitación tiene muchos perfiles permitidos para ver o editar.
    Tender.belongsToMany(models.Profile, {
      through: {
        model: models.ProfileTender,
        unique: false,
      },
      foreignKey: 'tender_id',
      constraints: false
    });

    // Licitación tiene muchas obras
    Tender.hasMany(models.Work);

  };
  return Tender;
};
