import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const verifyUser = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Find user by id
      const user = await User.findById(decoded.id).select("-password");

      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Token is not valid" });
    }
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
