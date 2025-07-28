const sequelize = require("../config/db");
const User = require("./User");
const Event = require("./Event");
const Booking = require("./Booking");

// ✅ Associations must be here — and only here
User.hasMany(Booking, { foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "userId" });

Event.hasMany(Booking, { foreignKey: "eventId", onDelete: "CASCADE" });
Booking.belongsTo(Event, { foreignKey: "eventId" });

module.exports = {
  sequelize,
  User,
  Event,
  Booking
};
