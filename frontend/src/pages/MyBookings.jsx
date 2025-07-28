import React, { useEffect, useState } from "react";
import api from "../api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to see your bookings.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const seen = new Set();
      const uniqueBookings = res.data.filter((b) => {
        const eventId = b.Event?.id;
        if (eventId && !seen.has(eventId)) {
          seen.add(eventId);
          return true;
        }
        return false;
      });

      const sortedBookings = uniqueBookings.sort((a, b) =>
        new Date(a.Event?.date) - new Date(b.Event?.date)
      );

      setBookings(sortedBookings);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setError("Session expired. Please log in again.");
        window.location.href = "/login";
      } else {
        setError("❌ Could not load your bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("Not authorized.");

    try {
      setCancelingId(bookingId);
      await api.delete(`/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Booking cancelled.");
      fetchBookings();
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("❌ Could not cancel booking.");
    } finally {
      setCancelingId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start p-6 bg-[#F2F2F2]">
      <h2 className="text-3xl font-bold mb-6 text-[#000000] text-center">
        📅 My Booked Events
      </h2>

      {loading && (
        <p className="text-gray-600 text-center">⏳ Loading your bookings...</p>
      )}
      {error && (
        <p className="text-red-600 text-center font-medium">{error}</p>
      )}

      {!loading && bookings.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-4">
          You haven’t booked any events yet.
        </p>
      )}

      <div className="w-full max-w-2xl space-y-6">
        {bookings.map((booking) => {
          const event = booking.Event;
          const eventDate = new Date(event?.date);
          const isPast = eventDate < new Date();

          return (
            <div
              key={booking.id}
              className="bg-[#EAE4D5] border border-[#B6B09F] rounded-xl p-6 shadow-md transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-center text-[#000000]">
                {event?.title}
              </h3>
              <p className="text-sm text-center text-gray-700">
                📍 <strong>Location:</strong> {event?.location}
              </p>
              <p className="text-sm text-center text-gray-700">
                📅 <strong>Date:</strong>{" "}
                {eventDate.toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                {isPast && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                    Expired
                  </span>
                )}
              </p>
              <p className="text-center text-gray-600 mt-2 text-sm">
                {event?.description}
              </p>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => handleCancel(booking.id)}
                  disabled={cancelingId === booking.id}
                  className={`px-5 py-2 rounded text-sm font-medium transition-all ${
                    cancelingId === booking.id
                      ? "bg-red-300 text-white cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {cancelingId === booking.id ? "Cancelling..." : "Cancel Booking"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}

export default MyBookings;
