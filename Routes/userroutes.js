const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const upload = require("../utils/multer");
const verifyToken = require("../middleware/token"); // Corrected token middleware

// View employer registration form
router.get("/Employer/register", (req, res) => {
  res.render("register", { role: "employer" });
});

// View job seeker registration form
router.get("/JobSeeker/register", (req, res) => {
  res.render("register", { role: "JobSeeker" });
});

// View login form
router.get("/login", (req, res) => {
  res.render("login");
});

// View the user dashboard (requires authentication)
router.get("/dashboard", verifyToken, (req, res) => {
  res.render("dashboard", { role: req.user.role });
});

// View role selection page
router.get("/registerchoice", (req, res) => {
  res.render("index");
});

// Log the user out
router.get("/logout", userController.logoutUser);

// Register a new user (JobSeeker or Employer)
router.post("/api/user/register", upload.single('validDocument'), userController.registerUser);

// Log in a user
router.post("/api/user/login", userController.loginUser);

module.exports = router;
