"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("works", {
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
      general_cost: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      budget: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      utility: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      type_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tender_id: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("works");
  }
};
