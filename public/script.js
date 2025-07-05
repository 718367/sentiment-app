async function sendText() {
  const text = document.getElementById("inputText").value;
  const resultBox = document.getElementById("result");

  // Reset classes
  resultBox.className = "hidden";

  try {
    const res = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (data.sentiment) {
      resultBox.textContent = "Sentiment: " + data.sentiment;

      if (data.sentiment === "positive") {
        resultBox.className = "positive";
      } else if (data.sentiment === "negative") {
        resultBox.className = "negative";
      } else {
        resultBox.className = "neutral";
      }
    } else {
      resultBox.textContent = "Error: No sentiment returned.";
      resultBox.className = "";
    }
  } catch (err) {
    resultBox.textContent = "Error connecting to server.";
    resultBox.className = "";
    console.error(err);
  }
}
