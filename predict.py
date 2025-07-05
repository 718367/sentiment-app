import sys
import joblib
import json

# Load input from Node.js
input_text = sys.argv[1]

# Load model and tools
model = joblib.load('SentimentModels/logistic_regression_model.pkl')
vectorizer = joblib.load('SentimentModels/tfidf_vectorizer.pkl')
label_encoder = joblib.load('SentimentModels/label_encoder.pkl')

# Transform input
X_input = vectorizer.transform([input_text])
y_pred = model.predict(X_input)
sentiment = label_encoder.inverse_transform(y_pred)[0]

# Return the sentiment
print(json.dumps({"sentiment": sentiment}))