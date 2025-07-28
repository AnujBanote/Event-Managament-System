import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const name = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    alert("🚪 Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-[#000000] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold text-[#B6B09F] hover:text-[#EAE4D5] transition-colors"
        >
          EventHub
        </Link>

        <div className="flex flex-wrap items-center gap-4 mt-3 sm:mt-0">
          <Link to="/events" className="hover:text-[#EAE4D5] font-medium">
            Events
          </Link>

          {token && role === "user" && (
            <Link
              to="/my-bookings"
              className="hover:text-[#EAE4D5] font-medium"
            >
              My Bookings
            </Link>
          )}

          {token && role === "admin" && (
            <>
              <Link
                to="/add-event"
                className="hover:text-[#EAE4D5] font-medium"
              >
                Add Event
              </Link>
              <Link
                to="/admin-dashboard"
                className="hover:text-[#EAE4D5] font-medium"
              >
                Admin Dashboard
              </Link>
            </>
          )}
          {token && (
            <Link to="/profile" className="hover:text-blue-300">
              Profile
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className="hover:text-[#EAE4D5] font-medium">
                Login
              </Link>
              <Link to="/signup" className="hover:text-[#EAE4D5] font-medium">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-gray-300">
                👤 {name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
