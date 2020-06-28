'use strict'

module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    orderId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  notification.associate = function(models) {
    notification.belongsTo(models.order);
  };
  return notification;
};