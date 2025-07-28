import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => pwd.length >= 6;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError("❌ Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/signup", { name, email, password });
      alert("✅ Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      const message =
        err.response?.data?.message || "❌ Signup failed. Please try again.";
      setError(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border border-[#B6B09F]">
        <h2 className="text-3xl font-bold mb-4 text-center text-[#000000]">Create Account</h2>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 p-2 mb-4 rounded text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-[#B6B09F] rounded bg-[#EAE4D5] focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-[#B6B09F] rounded bg-[#EAE4D5] focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-[#B6B09F] rounded bg-[#EAE4D5] focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-medium transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#000000] hover:bg-[#333333]"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
