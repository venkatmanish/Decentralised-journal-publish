const mongoose = require("mongoose");

const manuscriptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Manuscript = mongoose.model("Manuscript", manuscriptSchema);

module.exports = Manuscript;
