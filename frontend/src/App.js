// src/App.js
import Home from "./pages/Home";
import React from "react";
import Footer from "./components/Footer";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserProfile from "./pages/UserProfile";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import AddEvent from "./pages/AddEvent";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  return token && role === "admin" ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen text-gray-800">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/my-bookings"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-event"
              element={
                <AdminRoute>
                  <AddEvent />
                </AdminRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="*"
              element={
                <div className="text-center py-12">
                  <h1 className="text-3xl font-semibold text-red-600 mb-2">
                    404
                  </h1>
                  <p className="text-gray-600">Page Not Found</p>
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
  
}

export default App;
