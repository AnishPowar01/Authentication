const express = require("express");

const router = express.Router();

// Handler

const { login, signup } = require("../controllers/Auth");

const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// protected route

router.get("/test", auth, (req, res) => {
  res.json({
    succes: true,
    message: "Welcome to the Testing dashboard",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    succes: true,
    message: "Welcome to the student dashboard",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    succes: true,
    message: "Welcome to the Admin dashboard",
  });
});

module.exports = router;
