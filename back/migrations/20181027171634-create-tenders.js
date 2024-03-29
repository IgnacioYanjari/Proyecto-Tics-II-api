"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tenders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      budget: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      date_ini: {
        allowNull: false,
        type: Sequelize.DATE
      },
      client_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date_fin: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tenders");
  }
};
