const express = require("express");
const { Pool } = require("pg");
const yaml = require("js-yaml");
const fs = require("fs");

const app = express();

// Load configmap.yaml
let config;
try {
  config = yaml.load(fs.readFileSync("config.yaml", "utf8"));
} catch (err) {
  console.error("Error loading config.yaml:", err);
  process.exit(1);
}

// PostgreSQL connection
const pool = new Pool({
  user: config.database.user,          // Use 'config' here instead of 'configmap'
  host: config.database.host,
  database: config.database.name,
  password: config.database.password,
  port: config.database.port,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Database error");
  }
});

// Set server port from config, fallback to 3000 if not defined
const port = config.server.port || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
