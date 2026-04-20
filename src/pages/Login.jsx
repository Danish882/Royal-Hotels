import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../App.jsx";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ FIXED: /api/user/login (not /api/auth/login)
      const response = await axios.post(
        `${backendUrl}/api/user/login`,
        formData,
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (response.data.user.role === "admin") {
          window.location.href = "https://royal-hotels-one.vercel.app";
        } else {
          navigate("/");
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-linear-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">Sign in to continue to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠️</span>
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-lime-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full border-2 border-gray-200 bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:border-lime-400 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FaLock className="text-lime-500" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full border-2 border-gray-200 bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:border-lime-400 transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-lime-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-lime-600 hover:text-lime-700 font-semibold"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-black py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <FaArrowRight />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-lime-600 hover:text-lime-700 font-bold"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-lime-50 border border-lime-200 rounded-xl">
            <p className="text-xs text-gray-600 text-center">
              <span className="font-semibold text-lime-700">Admin Login:</span>{" "}
              admin@royalhotels.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
