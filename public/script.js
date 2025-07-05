async function sendText() {
  const text = document.getElementById("inputText").value;
  const resultBox = document.getElementById("result");

  // Reset classes
  resultBox.className = "result hidden";

  try {
    const res = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (data.sentiment) {
      resultBox.textContent = "Sentiment: " + data.sentiment;
      resultBox.className = "result " + data.sentiment;
    } else {
      resultBox.textContent = "Error: No sentiment returned.";
      resultBox.className = "result";
    }
  } catch (err) {
    resultBox.textContent = "Error connecting to server.";
    resultBox.className = "result";
    console.error(err);
  }
}
