import express from "express";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Construct the path to data.json
const DATA_FILE = join(__dirname, "..", "src", "data", "data.json");

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Read data
app.get("/api/tasks", async (req, res) => {
  try {
    console.log("Reading from:", DATA_FILE); // Debug log
    const data = await fs.readFile(DATA_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Error reading data" });
  }
});

// Update data
app.put("/api/tasks", async (req, res) => {
  try {
    const newData = req.body;
    await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).json({ error: "Error writing data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Data file location:", DATA_FILE);
});
