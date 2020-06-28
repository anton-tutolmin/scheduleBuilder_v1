'use strict';
module.exports = (sequelize, DataTypes) => {
  const attribute = sequelize.define('attribute', {
    timetableId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    required: DataTypes.BOOLEAN
  }, {});
  attribute.associate = function(models) {
    attribute.belongsTo(models.timetable);
  };
  return attribute;
};