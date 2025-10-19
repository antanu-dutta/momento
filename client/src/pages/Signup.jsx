import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    if (!fullname.trim()) {
      return setError("Name is required");
    } else if (!email.trim()) {
      return setError("Email is required");
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return setError("Please enter a valid email address");
    } else if (!password) {
      return setError("Password is required");
    } else if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    } else if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post("/auth/signup", {
        fullname,
        email,
        password,
      });

      // Handle successful signup
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Update auth context
      login({ ...user, token });

      // Clear form
      setfullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 409) {
          setError("Email is already registered");
        } else if (error.response.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else if (error.request) {
        // Request was made but no response
        setError(
          "Cannot connect to server. Please check your internet connection."
        );
      } else {
        // Something else went wrong
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/80 p-8 rounded shadow-lg w-full max-w-md border border-white/30">
        {/* Title */}
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Create Account
        </h3>

        {/* Form */}

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
              className="w-full rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 transition-all bg-gray-50"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 transition-all bg-gray-50"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 transition-all bg-gray-50"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-semibold mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 transition-all bg-gray-50"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-all shadow-md ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <div className="w-1/5 border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="w-1/5 border-t border-gray-300"></div>
        </div>

        {/* Login Redirect */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
