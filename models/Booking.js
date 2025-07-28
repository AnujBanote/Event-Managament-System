const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id"
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "event_id"
  }
}, {
  tableName: "bookings",
  timestamps: true
});

module.exports = Booking;
