'use strict';
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    'session',
    {
      userId: DataTypes.INTEGER,
    },
    {},
  );
  session.associate = function(models) {
    session.belongsTo(models.user);
  };
  return session;
};
