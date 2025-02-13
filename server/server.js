import express from "express";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://sashaknw.github.io",
  "https://sashaknw.github.io/ReadySetGo",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: "50mb" }));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "ReadySetGo API is running",
    endpoints: {
      getTasks: "/api/tasks",
      health: "/api/health",
    },
  });
});

const DATA_FILE = join(__dirname, "data.json");

// Read data
app.get("/api/tasks", async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading file:", error);
    res.json({
      tasks: [],
      categories: ["Social Media", "Selection", "Networking", "Research"],
      statuses: ["todo", "in-progress", "review", "done"],
    });
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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
