const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// User registration route
router.post("/register", userController.register);

// User login route
router.post("/login", userController.login);

// User profile route
router.get(
  "/profile",
  authMiddleware.authenticateUser,
  userController.getProfile
);

module.exports = router;
