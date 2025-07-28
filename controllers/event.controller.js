const Event = require("../models/Event");
const Booking = require("../models/Booking");

// ✅ Create Event - Admin Only + Validate Inputs
exports.createEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create events" });
    }

    const { title, description, date, location, capacity } = req.body;

    if (!title || !description || !date || !location || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof capacity !== "number" || capacity <= 0) {
      return res.status(400).json({ message: "Capacity must be a positive number" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
    });

    res.status(201).json({ message: "✅ Event created", event });
  } catch (err) {
    console.error("❌ Create event error:", err);
    res.status(500).json({
      message: "Failed to create event",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// ✅ Get All Events (Public)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [["date", "ASC"]],
      include: [{ model: Booking }],
    });

    res.status(200).json(events);
  } catch (err) {
    console.error("❌ Fetch events error:", err);
    res.status(500).json({
      message: "Error fetching events",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// ✅ Delete Event - Admin Only
exports.deleteEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete events" });
    }

    const { id } = req.params;

    const deleted = await Event.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "✅ Event deleted successfully" });
  } catch (err) {
    console.error("❌ Delete event error:", err);
    res.status(500).json({
      message: "Error deleting event",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
