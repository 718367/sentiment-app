const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.json());

app.use(express.static('public'));

// API to receive text input
app.post("/predict", (req, res) => {
  const userInput = req.body.text;

  if (!userInput) {
    return res.status(400).json({ error: "No text provided" });
  }

  // Escape double quotes to prevent errors
  const safeInput = userInput.replace(/"/g, '\\"');

  // Run the Python script
  exec(`python predict.py "${safeInput}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Python error: ${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const result = JSON.parse(stdout);
      res.json(result); // { sentiment: 'positive' }
    } catch (parseErr) {
      console.error("❌ Output parse error:", parseErr);
      res.status(500).json({ error: "Could not parse model output" });
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
