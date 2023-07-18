const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/journal-publishing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define routes
const manuscriptRoutes = require("./routes/manuscriptRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/manuscripts", manuscriptRoutes);
app.use("/api/users", userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
