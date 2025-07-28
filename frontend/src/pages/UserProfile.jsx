import React, { useEffect, useState } from "react";
import api from "../api";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setFormData({ name: res.data.name, email: res.data.email, password: "" });
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("❌ Failed to load profile");
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Bookings fetch error:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        "/user/update",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "✅ Profile updated");
      setEditing(false);
      fetchProfile();
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update profile");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account permanently?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete("/user/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Account deleted successfully");
      localStorage.clear();
      window.location.href = "/signup";
    } catch (err) {
      console.error("Account deletion error:", err);
      alert("❌ Failed to delete account");
    }
  };

  const getStatus = (date) => {
    return new Date(date) >= new Date() ? "Upcoming" : "Completed";
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-[#EAE4D5] p-6 rounded-xl shadow-md border border-[#B6B09F]">
        <h2 className="text-3xl font-bold text-[#000000] text-center mb-4">👤 User Profile</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}

        {profile && !editing && (
          <div className="space-y-3 text-center">
            <div className="text-xl font-semibold text-[#000000]">{profile.name}</div>
            <div className="text-gray-700">{profile.email}</div>
            <div className="text-sm text-[#B6B09F] capitalize">{profile.role}</div>
            <div className="text-sm text-gray-600">
              Registered on: {new Date(profile.createdAt).toLocaleDateString()}
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>
        )}

        {editing && (
          <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-[#B6B09F] rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-[#B6B09F] rounded"
              required
            />
            <input
              type="password"
              placeholder="New Password (optional)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border border-[#B6B09F] rounded"
            />
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                disabled={loadingUpdate}
              >
                {loadingUpdate ? "Updating..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bookings */}
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-2xl font-semibold text-[#000000] mb-4 text-center">📅 My Bookings</h3>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">You haven’t booked any events yet.</p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => {
              const event = booking.Event;
              return (
                <div
                  key={booking.id}
                  className="bg-white border border-[#B6B09F] rounded-lg shadow hover:shadow-lg p-5 transition-all duration-200"
                >
                  <h4 className="text-lg font-bold text-[#000000] mb-1">{event?.title}</h4>
                  <p className="text-sm text-gray-700 mb-1">
                    📍 <strong>Location:</strong> {event?.location}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    📅 <strong>Date:</strong>{" "}
                    {new Date(event?.date).toLocaleDateString("en-IN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-[#B6B09F] mt-1">
                    📌 <strong>Status:</strong> {getStatus(event?.date)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
