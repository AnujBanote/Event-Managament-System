import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { title, description, date, location, capacity } = formData;
    if (new Date(date) < new Date().setHours(0, 0, 0, 0))
      return setError("❌ Event date cannot be in the past.");
    if (capacity <= 0) return setError("❌ Capacity must be greater than 0.");

    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in again.");

    try {
      setLoading(true);
      await api.post(
        "/events/create",
        {
          title: title.trim(),
          description: description.trim(),
          date,
          location: location.trim(),
          capacity: Number(capacity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Event created!");
      navigate("/events");
    } catch (err) {
      console.error("Create event error:", err);
      setError(err.response?.data?.message || "❌ Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-start pt-10 px-4 bg-[#F2F2F2] min-h-screen transition-all duration-300">
      <div className="w-full max-w-lg bg-[#EAE4D5] shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-[#000000] mb-6 text-center tracking-wide">
          🎉 Create New Event
        </h2>

        {error && (
          <p className="text-red-700 bg-red-100 border border-red-300 p-3 mb-4 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {["title", "location", "capacity"].map((field) => (
            <input
              key={field}
              type={field === "capacity" ? "number" : "text"}
              name={field}
              placeholder={
                field === "title"
                  ? "Event Title"
                  : field === "location"
                  ? "Location"
                  : "Capacity"
              }
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-[#B6B09F] bg-white text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B6B09F] transition duration-200 hover:shadow-md"
            />
          ))}

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-[#B6B09F] bg-white text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B6B09F] transition duration-200 hover:shadow-md"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={minDate}
            required
            className="w-full px-4 py-2 rounded-md border border-[#B6B09F] bg-white text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#B6B09F] transition duration-200 hover:shadow-md"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition duration-300 ease-in-out transform ${
              loading
                ? "bg-[#B6B09F] cursor-not-allowed"
                : "bg-[#000000] hover:bg-[#333333] hover:scale-[1.01]"
            }`}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
