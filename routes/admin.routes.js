const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// Admin Stats
router.get("/stats", adminController.getAdminStats);

// User Management
router.get("/users", adminController.getAllUsers);
router.get("/users/:userId/bookings", adminController.getUserBookings);

// Chart Data for Dashboard
router.get("/charts", adminController.getChartData);

module.exports = router;
