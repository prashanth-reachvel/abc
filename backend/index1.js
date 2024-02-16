const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SchoolModel = require("./models/School");
const RequestModel = require("./models/Request");
const UpdateModel = require("./models/Update"); // Assuming the file path is correct

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cors());

mongoose.connect("mongodb://localhost:27017/school");

app.post("/register", (req, res) => {
  SchoolModel.create(req.body)
    .then((schools) => res.json(schools))
    .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  SchoolModel.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The Password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/api/request", async (req, res) => {
  try {
    // const currentDate = new Date().toDateString();
    const newRequest = {
      user: req.body.userId, // Assuming you're passing the user ID from the frontend
      schoolName: req.body.schoolName,
      schoolId: req.body.schoolId,
      inventory: req.body.inventory,
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      selectedFile: req.body.selectedFile,
      date: req.body.date,
      status: "Pending",
    };

    await RequestModel.create(newRequest);

    res.status(201).json({ message: "Request submitted successfully" });
  } catch (error) {
    console.error("Error submitting request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/update", async (req, res) => {
  try {
    const updateData = req.body;

    // Create a new document for each update
    const newUpdate = await UpdateModel.create(updateData);

    res
      .status(201)
      .json({ message: "Update stored successfully", update: newUpdate });
  } catch (error) {
    console.error("Error storing update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/requests", async (req, res) => {
  try {
    const requests = await RequestModel.find(
      {},
      { inventory: 1, quantity: 1, date: 1, status: 1 },
      { limit: 5, sort: { date: -1 } } // Limit to latest 5 and sort by date descending
    );
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/updates", async (req, res) => {
  try {
    const updates = await UpdateModel.find(
      {},
      { inventory: 1, quantity: 1, date: 1, reason: 1, source: 1 },
      { limit: 5, sort: { date: -1 } }
    );
    res.json(updates);
  } catch (error) {
    console.error("Error Fetching Updates:", error);
    rres.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
