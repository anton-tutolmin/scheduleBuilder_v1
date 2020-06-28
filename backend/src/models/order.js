'use strict'

module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    authorId: DataTypes.INTEGER,
    periodstart: DataTypes.DATE,
    periodstop: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  
  order.associate = function(models) {
    order.belongsTo(models.timetable);
    order.hasMany(models.OrderAttribute);
  };

  return order;
};