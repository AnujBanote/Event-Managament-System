const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createEvent,
  getAllEvents,
  deleteEvent
} = require("../controllers/event.controller");

// Public: Get All Events
router.get("/", getAllEvents);

// Admin: Create Event
router.post("/create", authMiddleware, createEvent);

// Admin: Delete Event
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
