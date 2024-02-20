const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const SchoolModel = require("./models/School");
const Inventory = require("./models/AddInventory");
const RequestModel = require("./models/Request");
const UpdateModel = require("./models/Update");
const InventoryUpdate = require("./models/UpdateInventory");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cors());

require("dotenv").config();

const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongo_uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

// app.post("/register", (req, res) => {
//   SchoolModel.create(req.body)
//     .then((schools) => res.json(schools))
//     .catch((err) => console.log(err));
// });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  SchoolModel.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ message: "Success", schoolName: user.schoolName });
        console.log(res.json());
      } else {
        res.json({ message: "The Password is incorrect" });
      }
    } else {
      res.json({ message: "No record existed" });
    }
  });
});

// Endpoint to get inventory data by schoolName
app.get("/api/inventory/:schoolName", async (req, res) => {
  try {
    const { schoolName } = req.params;
    const inventory = await Inventory.find({ school: schoolName }).sort({
      updatedDate: -1,
    });
    res.json(inventory);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/request", upload.single("fileInput"), async (req, res) => {
  try {
    const newRequest = {
      user: req.body.userId,
      schoolName: req.body.schoolName,
      schoolId: req.body.schoolId,
      inventory: req.body.inventory,
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      selectedFile: req.file ? req.file.filename : "",
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

app.post("/api/update/", async (req, res) => {
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

app.get("/api/updates/:school", async (req, res) => {
  try {
    const { school } = req.params;
    const updates = await UpdateModel.find({ school: school })
      .limit(5)
      .sort({ updatedDate: -1 })
      .select("school title newTotalQuantity updatedDate reason source");
    res.json(updates);
  } catch (error) {
    console.error("Error fetching updates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get inventory data by schoolName and title
app.get("/api/inventory/:school/:title", async (req, res) => {
  try {
    const { school, title } = req.params;
    const inventory = await Inventory.findOne({
      school: school,
      title: title,
    }).sort({
      updatedDate: -1,
    });
    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }
    res.json(inventory);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update inventory
app.post("/api/updateinventory/:school/:title", async (req, res) => {
  try {
    const { school, title } = req.params;
    const {
      updatedDate,
      newTotalQuantity,
      totalAddQuantity,
      available,
      distributed,
      reason,
      source,
      updatedBy,
    } = req.body;

    const newInventory = new InventoryUpdate({
      school,
      title,
      updatedDate,
      newTotalQuantity,
      totalAddQuantity,
      available,
      distributed,
      reason,
      source,
      updatedBy,
    });

    await newInventory.save();

    res.json({ message: "Inventory created successfully" });
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update total quantity in inventory
app.post("/api/inventory/:school/:title", async (req, res) => {
  try {
    const { school, title } = req.params;
    const { totalAddQuantity, available, distributed } = req.body;

    const newInventory = new Inventory({
      school,
      title,
      totalAddQuantity,
      available,
      distributed,
    });

    await newInventory.save();

    res.json({ message: "Inventory created successfully" });
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
