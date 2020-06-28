'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('users', [
     {
       username: 'adminer',
       email: 'adminer@example.com',
       password: 'adminer',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       username: 'justuser',
       email: 'justuser@exapmle.com',
       password: 'justuser',
       createdAt: new Date(),
       updatedAt: new Date(),
     }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', null, {});
  }
};
