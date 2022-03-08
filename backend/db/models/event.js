'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.Category, { foreignKey: "categoryId" }); // one type has many events
    Event.belongsTo(models.User, { foreignKey: "hostId" }); // one user can host many events
    Event.hasMany(models.Ticket, { foreignKey: "eventId" }); // one event has many tickets
  };
  return Event;
};
