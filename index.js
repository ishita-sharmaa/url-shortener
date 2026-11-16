
const express = require("express");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = "urls.json";

let urls = {};

if (fs.existsSync(DATA_FILE)) {
  urls = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(urls, null, 2));
}

// Home route
app.get("/", (req, res) => {
  res.send("URL Shortener API is running!");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Create short URL
app.post("/api/shorten", (req, res) => {
  const { originalUrl, customCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({
      error: "Original URL is required"
    });
  }

  let validUrl;

  try {
    validUrl = new URL(originalUrl);
    if (!["http:", "https:"].includes(validUrl.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch {
    return res.status(400).json({
      error: "Please enter a valid HTTP or HTTPS URL"
    });
  }

  const shortCode = customCode || crypto.randomBytes(3).toString("hex");

  if (!/^[a-zA-Z0-9_-]{3,20}$/.test(shortCode)) {
    return res.status(400).json({
      error: "Custom code must be 3-20 letters, numbers, _ or -"
    });
  }

  if (urls[shortCode]) {
    return res.status(409).json({
      error: "Short code already exists"
    });
  }

  urls[shortCode] = {
    originalUrl: validUrl.href,
    shortCode,
    clicks: 0,
    createdAt: new Date().toISOString()
  };

  saveData();

  res.status(201).json({
    message: "Short URL created successfully",
    shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
    details: urls[shortCode]
  });
});

// Get all shortened URLs
app.get("/api/urls", (req, res) => {
  res.json(Object.values(urls));
});

// Get URL statistics
app.get("/api/stats/:code", (req, res) => {
  const url = urls[req.params.code];

  if (!url) {
    return res.status(404).json({
      error: "Short URL not found"
    });
  }

  res.json({
    shortCode: url.shortCode,
    originalUrl: url.originalUrl,
    totalClicks: url.clicks,
    createdAt: url.createdAt
  });
});

// Redirect to original URL
app.get("/:code", (req, res) => {
  const url = urls[req.params.code];

  if (!url) {
    return res.status(404).send("Short URL not found");
  }

  url.clicks++;
  saveData();

  res.redirect(url.originalUrl);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`URL Shortener server running on port ${PORT}`);
});

