const express = require("express");
const router = express.Router();
const manuscriptController = require("../controllers/manuscriptController");
const authMiddleware = require("../middlewares/authMiddleware");

// Manuscript upload route
router.post(
  "/upload",
  authMiddleware.authenticateUser,
  manuscriptController.upload
);

// Manuscript retrieval routes
router.get("/", manuscriptController.getAllManuscripts);
router.get("/:id", manuscriptController.getManuscriptById);

// Manuscript funding route
router.post(
  "/:id/fund",
  authMiddleware.authenticateUser,
  manuscriptController.fundManuscript
);

// Manuscript liking route
router.post(
  "/:id/like",
  authMiddleware.authenticateUser,
  manuscriptController.likeManuscript
);

// Manuscript commenting route
router.post(
  "/:id/comment",
  authMiddleware.authenticateUser,
  manuscriptController.commentOnManuscript
);

module.exports = router;
