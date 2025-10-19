import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!fullName) {
      return setError("Name is required");
    } else if (!email) {
      return setError("Email is required");
    } else if (!password) {
      return setError("Password is required");
    } else if (password !== confirmPassword) {
      return setError(`Password did not match`);
    }

    try {
      setError(null);
    } catch (error) {
      console.error(error);
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-all shadow-md"
          >
            Sign Up
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
