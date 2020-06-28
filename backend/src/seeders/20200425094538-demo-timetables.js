'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('timetables', [
      {
        name: 'Baikal schedule',
        numberRow: 10,
        numberColumn: 6,
        periodStart: new Date('Apr 20 2020 10:00:00'),
        periodStop: new Date('Apr 25 2020 20:00:00'),
        slotType: 'Hour',
        createdAt: new Date(),
        updatedAt: new Date(),
       },
      {
        name: 'Ural schedule',
        numberRow: 12,
        numberColumn: 6,
        periodStart: new Date('Apr 22 2020 8:00:00'),
        periodStop: new Date('Apr 27 2020 20:00:00'),
        slotType: 'Hour',
        createdAt: new Date(),
        updatedAt: new Date(),
       },
      {
        name: 'Nocturnal schedule',
        numberRow: 8,
        numberColumn: 6,
        periodStart: new Date('May 5 2020 12:00:00'),
        periodStop: new Date('May 10 2020 20:00:00'),
        slotType: 'Hour',
        createdAt: new Date(),
        updatedAt: new Date(),
       },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('timetable', null, {});
  }
};
