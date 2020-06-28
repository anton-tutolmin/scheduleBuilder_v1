'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('timetables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      numberRow: {
        type: Sequelize.INTEGER,
      },
      numberColumn: {
        type: Sequelize.INTEGER,
      },
      periodStart: {
        type: Sequelize.DATE,
      },
      periodStop: {
        type: Sequelize.DATE,
      },
      slotType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('timetables');
  },
};
