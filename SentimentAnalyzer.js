import React, { useState, useEffect } from "react";

function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [placeholder, setPlaceholder] = useState("");

  // Emojis map
  const SENTIMENT_EMOJIS = {
    POSITIVE: "✨🤩",
    NEGATIVE: "💀💔",
    NEUTRAL: "🤔💻",
    DEFAULT: "🤖",
  };

  const samples = [
    "This tool is amazing!",
    "I am not happy today...",
    "It feels okay, nothing special.",
  ];

  // Typing animation for placeholder
  useEffect(() => {
    let index = 0;
    let char = 0;
    const typing = setInterval(() => {
      setPlaceholder(samples[index].substring(0, char + 1));
      char++;
      if (char === samples[index].length) {
        setTimeout(() => {
          char = 0;
          index = (index + 1) % samples.length;
        }, 1500);
      }
    }, 120);
    return () => clearInterval(typing);
  }, []);

  const getSentimentEmoji = () =>
    SENTIMENT_EMOJIS[sentiment] || SENTIMENT_EMOJIS.DEFAULT;

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    setLoading(true);
    setError("");
    setSentiment("");

    try {
      const response = await fetch("http://127.0.0.1:5000/get_sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
      const data = await response.json();
      const result = String(data.sentiment).toUpperCase();
      setSentiment(result);
      setHistory((prev) => [...prev, { text, result }]);
    } catch (e) {
      console.error(e);
      setError("API not responding. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${sentiment} - ${text}`);
    alert("Copied to clipboard!");
  };

  const handleClear = () => {
    setText("");
    setSentiment("");
    setError("");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #f6f3f3;
          background: linear-gradient(-45deg, #4b0082, #ba55d3, #7b1fa2, #ba55d3);
          background-size: 400% 400%;
          animation: gradientShift 10s ease infinite;
          padding: 20px;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .card {
          max-width: 650px;
          width: 100%;
          padding: 25px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          text-align: center;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
          margin-bottom: 20px;
        }
        .header {
          font-size: 2.2rem;
          margin-bottom: 20px;
          color: #d8bfd8;
          text-shadow: 0 0 8px #ba55d3, 0 0 16px #ba55d3;
          animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
          0% { text-shadow: 0 0 8px #ba55d3; }
          50% { text-shadow: 0 0 18px #9932cc; }
          100% { text-shadow: 0 0 8px #ba55d3; }
        }
        textarea {
          width: 100%;
          height: 120px;
          padding: 15px;
          border-radius: 12px;
          border: none;
          resize: vertical;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          font-size: 1rem;
          margin-bottom: 15px;
          outline: none;
        }
        textarea:focus {
          border: 2px solid #ba55d3;
          box-shadow: 0 0 12px #9932cc;
        }
        .buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #ba55d3;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.2s;
        }
        button:hover { background: #9932cc; transform: translateY(-2px); }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
        .result {
          padding: 15px;
          border-radius: 12px;
          margin-top: 10px;
          font-size: 1.3rem;
          animation: popIn 0.6s ease;
        }
        @keyframes popIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .POSITIVE { color: #39FF14; text-shadow: 0 0 12px #39FF14; }
        .NEGATIVE { color: #FF4C4C; text-shadow: 0 0 12px #FF4C4C; }
        .NEUTRAL  { color: #FFD700; text-shadow: 0 0 12px #FFD700; }
        .history {
          width: 100%;
          max-width: 650px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 15px;
          font-size: 0.9rem;
          overflow-y: auto;
          max-height: 200px;
        }
        .history h3 { margin: 0 0 10px 0; }
        .footer {
          margin-top: 20px;
          font-size: 0.85rem;
          opacity: 0.7;
        }
        @media (max-width: 600px) {
          .card {
            padding: 15px;
          }
          .header {
            font-size: 1.8rem;
          }
          textarea {
            height: 100px;
          }
          button {
            padding: 10px;
          }
        }
      `}</style>

      <div className="page">
        <div className="card">
          <h2 className="header">💻 Sentiment Analyzer 🤖</h2>
          <textarea
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          <div className="buttons">
            <button onClick={handleAnalyze} disabled={loading || !text.trim()}>
              {loading ? "ANALYZING..." : "ANALYZE"}
            </button>
            <button onClick={handleClear}>CLEAR</button>
            {sentiment && <button onClick={handleCopy}>COPY</button>}
          </div>
          {error && <p style={{ color: "tomato" }}>{error}</p>}
          {sentiment && (
            <div className={`result ${sentiment}`}>
              RESULT: <strong>{sentiment}</strong> {getSentimentEmoji()}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="history">
            <h3>📜 History</h3>
            {history.map((h, i) => (
              <p key={i}>
                <strong>{h.result}</strong>: {h.text}
              </p>
            ))}
          </div>
        )}

        <p className="footer">✨ MADE BY KUSHAL J VTMT ✨</p>
      </div>
    </>
  );
}

export default SentimentAnalyzer;