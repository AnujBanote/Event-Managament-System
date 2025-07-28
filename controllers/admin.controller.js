//controllers/admin.controller.js

const { User, Booking, Event } = require("../models");
const { Sequelize } = require("sequelize");

 
exports.getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalEvents, totalBookings] = await Promise.all([
      User.count(),
      Event.count(),
      Booking.count(),
    ]);

    const recentUsers = await User.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: ["id", "name", "email", "createdAt"],
    });

    const recentBookings = await Booking.findAll({
      include: [User, Event],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json({
      totalUsers,
      totalEvents,
      totalBookings,
      recentUsers,
      recentBookings,
    });
  } catch (err) {
    console.error("Admin stats fetch error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    res.json(users);
  } catch (err) {
    console.error("Failed to get users:", err);
    res.status(500).json({ message: "Failed to get users", error: err });
  }
};

// Get bookings by user ID
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    const bookings = await Booking.findAll({
      where: { userId },
      include: [
        {
          model: Event,
          attributes: ["title", "date"],
        },
      ],
    });

    res.json(bookings);
  } catch (err) {
    console.error("Failed to get user bookings:", err);
    res.status(500).json({ message: "Failed to get user bookings", error: err });
  }
};

// ✅ Chart data
exports.getChartData = async (req, res) => {
  console.log("📊 /charts route HIT");
  try {
    const bookingsPerEvent = await Booking.findAll({
      attributes: [
        [Sequelize.col("event_id"), "eventId"],
        [Sequelize.fn("COUNT", Sequelize.col("event_id")), "bookingCount"]
      ],
      group: ["event_id"],
      include: [{ model: Event, attributes: ["title"] }]
    });

    const userRegistrationsByDate = await User.findAll({
      attributes: [
        [Sequelize.literal("DATE(`createdAt`)"), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("*")), "count"]
      ],
      group: [Sequelize.literal("DATE(`createdAt`)")],
      order: [[Sequelize.literal("DATE(`createdAt`)"), "ASC"]]
    });

    const bookingsOverTime = await Booking.findAll({
      attributes: [
        [Sequelize.literal("DATE(`createdAt`)"), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("*")), "count"]
      ],
      group: [Sequelize.literal("DATE(`createdAt`)")],
      order: [[Sequelize.literal("DATE(`createdAt`)"), "ASC"]]
    });

    res.json({
      bookingsPerEvent,
      userRegistrationsByDate,
      bookingsOverTime,
    });
  } catch (err) {
    console.error("Chart data fetch error:", err);
    res.status(500).json({ message: "Failed to fetch chart data" });
  }
};
