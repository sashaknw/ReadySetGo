import express from "express";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://sashaknw.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

const DATA_FILE = join(__dirname, "..", "src", "data", "data.json");

// Read data
app.get("/api/tasks", async (req, res) => {
  try {
    console.log("Reading from:", DATA_FILE);
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
