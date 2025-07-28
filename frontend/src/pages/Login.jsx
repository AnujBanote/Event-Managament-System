import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("userName", res.data.user.name);

      alert("✅ Login successful!");
      setEmail("");
      setPassword("");
      navigate("/events");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("❌ Invalid email or password.");
      } else {
        setError("❌ Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] px-4">
      <div className="bg-[#EAE4D5] shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#000000]">
          🔐 Login to EventHub
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 text-center rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-[#B6B09F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6B09F] transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-[#B6B09F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6B09F] transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#000000] text-white p-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#222]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
