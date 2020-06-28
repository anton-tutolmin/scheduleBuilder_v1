'use strict';

module.exports = (sequelize, DataTypes) => {
  const timetable = sequelize.define(
    'timetable',
    {
      name: DataTypes.STRING,
      numberRow: DataTypes.INTEGER,
      numberColumn: DataTypes.INTEGER,
      periodStart: DataTypes.DATE,
      periodStop: DataTypes.DATE,
      slotType: DataTypes.STRING,
    },
    {},
  );

  timetable.associate = function(models) {
    timetable.hasMany(models.order);
  };
  return timetable;
};
