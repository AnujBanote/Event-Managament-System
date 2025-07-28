// src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import api from "../api";
import UserBarChart from "../charts/UserBarChart";
import EventBarChart from "../charts/EventBarChart";
import BookingLineChart from "../charts/BookingLineChart";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/charts"),
        ]);
        setStats(statsRes.data);
        setCharts(chartRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("❌ Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return <p className="p-6 text-center text-gray-700">⏳ Loading admin dashboard...</p>;

  if (error)
    return <p className="p-6 text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 space-y-8 bg-[#F2F2F2] min-h-screen">
      <h2 className="text-3xl font-bold text-[#000000] text-center mb-2">📊 Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "Total Users", value: stats.totalUsers },
          { title: "Total Events", value: stats.totalEvents },
          { title: "Total Bookings", value: stats.totalBookings },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-[#EAE4D5] hover:shadow-xl transition-all rounded-xl p-5 text-center shadow-md"
          >
            <h4 className="text-gray-600 text-sm">{card.title}</h4>
            <p className="text-3xl font-bold text-[#000000]">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <section>
        <h3 className="text-xl font-semibold mb-3 text-[#000000]">🧑‍💻 Recent Users</h3>
        <div className="bg-white rounded-xl shadow p-4 space-y-2">
          {stats.recentUsers.map((user) => (
            <div key={user.id} className="text-sm border-b pb-2 last:border-b-0 text-[#000000]">
              <strong>{user.name}</strong> ({user.email}) -{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          ))}
        </div>
      </section>

      {/* Recent Bookings */}
      <section>
        <h3 className="text-xl font-semibold mb-3 text-[#000000]">📅 Recent Bookings</h3>
        <div className="bg-white rounded-xl shadow p-4 space-y-2">
          {stats.recentBookings.map((booking) => (
            <div key={booking.id} className="text-sm border-b pb-2 last:border-b-0 text-[#000000]">
              <strong>{booking.User?.name}</strong> booked{" "}
              <strong>{booking.Event?.title}</strong> on{" "}
              {new Date(booking.createdAt).toLocaleDateString()}
            </div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <h3 className="text-xl font-semibold text-[#000000] mb-4">📈 Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#EAE4D5] p-4 rounded-xl shadow hover:shadow-lg h-[320px]">
            <UserBarChart data={charts.userRegistrationsByDate} />
          </div>
          <div className="bg-[#EAE4D5] p-4 rounded-xl shadow hover:shadow-lg h-[320px]">
            <EventBarChart data={charts.bookingsPerEvent} />
          </div>
          <div className="bg-[#EAE4D5] p-4 rounded-xl shadow hover:shadow-lg h-[320px]">
            <BookingLineChart data={charts.bookingsOverTime} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
