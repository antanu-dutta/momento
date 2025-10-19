import express from "express";
import { signup, login } from "../controller/auth.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// GET /api/auth/me - Protected route example
router.get("/me", verifyUser, (req, res) => {
  res.json({ user: req.user });
});

export default router;
