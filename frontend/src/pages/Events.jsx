import React, { useEffect, useState } from "react";
import api from "../api";

function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loadingEventId, setLoadingEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("❌ Could not load events.");
    }
  };

  const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        console.warn("Token expired");
        return null;
      }
      return decoded;
    } catch {
      console.warn("Invalid token format");
      return null;
    }
  };

  const handleBook = async (eventId, isFull) => {
    if (isFull) return;
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to book an event.");

    try {
      setLoadingEventId(eventId);
      await api.post(
        "/bookings/book",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Event booked successfully!");
      fetchEvents();
    } catch (err) {
      console.error("Booking failed:", err);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoadingEventId(null);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in as admin.");

    try {
      setLoadingEventId(eventId);
      await api.delete(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Event deleted.");
      fetchEvents();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "❌ Could not delete event.");
    } finally {
      setLoadingEventId(null);
    }
  };

  useEffect(() => {
    fetchEvents();
    setUser(decodeToken());
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#F2F2F2] min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#000000] mb-8">
        🎫 Upcoming Events
      </h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="grid gap-8">
        {events.length === 0 && !error && (
          <p className="text-center text-gray-600">No events available.</p>
        )}

        {events.map((event) => {
          const booked = event.Bookings?.length || 0;
          const available = event.capacity ? event.capacity - booked : "N/A";
          const isFull = available !== "N/A" && available <= 0;

          return (
            <div
              key={event.id}
              className="bg-[#EAE4D5] text-center border border-[#B6B09F] rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-2xl font-bold text-[#000000] mb-1">
                {event.title}
              </h3>
              <p className="text-[#333] text-base mb-4">
                {event.description}
              </p>

              <div className="text-sm text-[#444] space-y-1 mb-4">
                <p>
                  📍 <strong>Location:</strong> {event.location}
                </p>
                <p>
                  📅 <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p>
                  🪑 <strong>Capacity:</strong> {event.capacity || "N/A"}
                </p>
                <p>
                  ✅ <strong>Available:</strong> {available}
                </p>
              </div>

              <div className="flex justify-center gap-4 flex-wrap mt-4">
                <button
                  onClick={() => handleBook(event.id, isFull)}
                  disabled={isFull || loadingEventId === event.id}
                  className={`px-6 py-2 rounded-full font-semibold text-sm transition duration-300 ${
                    isFull
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#000000] text-white hover:bg-[#333]"
                  }`}
                >
                  {loadingEventId === event.id
                    ? "Booking..."
                    : isFull
                    ? "Fully Booked"
                    : "Book Event"}
                </button>

                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={loadingEventId === event.id}
                    className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition duration-300"
                  >
                    {loadingEventId === event.id
                      ? "Deleting..."
                      : "Delete Event"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
