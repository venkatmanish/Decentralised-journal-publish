const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const routes = require("./routes");

// Configure environment variables
require("dotenv").config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

// Routes
app.use("/api", routes);

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  // Access the uploaded file using req.file
  // Process the file as needed (e.g., save it to the database)
  res.status(200).json({ message: "File uploaded successfully" });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
