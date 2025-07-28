const Booking = require("../models/Booking");
const Event = require("../models/Event");

// ✅ Book Event with Capacity & Duplication Check
const bookEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ✅ Check if already booked
    const existingBooking = await Booking.findOne({
      where: { userId: req.user.id, eventId },
    });

    if (existingBooking) {
      return res.status(409).json({ message: "You have already booked this event" });
    }

    const bookingCount = await Booking.count({ where: { eventId } });
    if (bookingCount >= event.capacity) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    const booking = await Booking.create({
      eventId,
      userId: req.user.id,
    });

    res.status(201).json({ message: "✅ Event booked", booking });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({
      message: "Booking failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Get all bookings for current user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [{ model: Event }],
    });

    res.json(bookings);
  } catch (error) {
    console.error("❌ Booking fetch failed:", error);
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Booking.destroy({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Booking not found or unauthorized" });
    }

    res.status(200).json({ message: "✅ Booking cancelled" });
  } catch (error) {
    console.error("❌ Cancel Booking Error:", error);
    res.status(500).json({
      message: "Failed to cancel booking",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = { bookEvent, getUserBookings, cancelBooking };
