'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      timetableId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'timetables'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      periodstart: {
        allowNull: false,
        type: Sequelize.DATE
      },
      periodstop: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};