import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email.trim()) {
      return setError("Email is required");
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return setError("Please enter a valid email address");
    } else if (!password) {
      return setError("Password is required");
    }

    try {
      setIsLoading(true);
      setError(null);

      // Make login request
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Handle successful login
      const { user } = response.data;

      // Update auth context
      setUser(user);

      // Clear form
      setEmail("");
      setPassword("");

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 401) {
          setError("Invalid email or password");
        } else if (error.response.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Login failed. Please try again.");
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
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/80 p-8 rounded shadow-lg w-full max-w-md border border-white/30">
        {/* Title */}
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Login
        </h3>

        {/* Error Display */}
        {/* {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )} */}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleFormSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
            <div className="w-full rounded border border-gray-300 focus-within:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 transition-all bg-gray-50">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full outline-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-all shadow-md ${
              isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <div className="w-1/5 border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="w-1/5 border-t border-gray-300"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
