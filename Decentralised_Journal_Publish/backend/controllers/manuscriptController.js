const Manuscript = require("../models/manuscript");
const Comment = require("../models/comment");
const User = require("../models/user");
const web3 = require("web3");

// Upload Manuscript
exports.upload = async (req, res) => {
  try {
    const { title, author, file } = req.body;
    const manuscript = new Manuscript({
      title,
      author,
      fileUrl: req.file.path, // Assuming you're using multer for file uploads
    });
    await manuscript.save();
    res.status(201).json({ message: "Manuscript uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload manuscript" });
  }
};

// Get Manuscript by ID
exports.getManuscript = async (req, res) => {
  try {
    const manuscript = await Manuscript.findById(req.params.id);
    if (!manuscript) {
      return res.status(404).json({ message: "Manuscript not found" });
    }
    res.json(manuscript);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve manuscript" });
  }
};

// Fund Manuscript
exports.fundManuscript = async (req, res) => {
  try {
    const { id, amount } = req.body;
    const user = req.user; // Assuming you have user information from the authentication middleware
    const manuscript = await Manuscript.findById(id);
    if (!manuscript) {
      return res.status(404).json({ message: "Manuscript not found" });
    }
    manuscript.funding += amount;
    await manuscript.save();

    // Perform Ethereum transactions using web3.js

    res.json({ message: "Manuscript funded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fund manuscript" });
  }
};

// Like Manuscript
exports.likeManuscript = async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user; // Assuming you have user information from the authentication middleware
    const manuscript = await Manuscript.findById(id);
    if (!manuscript) {
      return res.status(404).json({ message: "Manuscript not found" });
    }
    manuscript.likes++;
    await manuscript.save();

    // Perform Ethereum transactions using web3.js

    res.json({ message: "Manuscript liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to like manuscript" });
  }
};

// Comment on Manuscript
exports.commentOnManuscript = async (req, res) => {
  try {
    const { id, text } = req.body;
    const user = req.user; // Assuming you have user information from the authentication middleware
    const manuscript = await Manuscript.findById(id);
    if (!manuscript) {
      return res.status(404).json({ message: "Manuscript not found" });
    }
    const comment = new Comment({
      manuscript: id,
      user: user.id,
      text,
    });
    await comment.save();
    manuscript.comments.push(comment);
    await manuscript.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};
