'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderAttribute = sequelize.define('OrderAttribute', {
    orderId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  OrderAttribute.associate = function(models) {
    OrderAttribute.belongsTo(models.order);
  };
  return OrderAttribute;
};