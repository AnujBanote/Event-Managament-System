const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  bookEvent,
  getUserBookings,
  cancelBooking
} = require("../controllers/booking.controller");

// Book an Event
router.post("/book", authMiddleware, bookEvent);

// Get Current User Bookings
router.get("/my-bookings", authMiddleware, getUserBookings);

// Cancel a Booking
router.delete("/:id", authMiddleware, cancelBooking);

module.exports = router;
 