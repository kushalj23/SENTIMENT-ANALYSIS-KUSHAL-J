import React from 'react';
import SentimentAnalyzer from '../components/SentimentAnalyzer/SentimentAnalyzer';

function HomePage() {
  return (
    <>
      <style>{`
        body { margin: 0; }
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #f6f3f3;
          background: linear-gradient(-45deg, #4b0082, #6a1b9a, #7b1fa2, #9c27b0);
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
          text-shadow: 0 0 8px #ba55d3, 0 0 16px #9932cc;
          animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
          0% { text-shadow: 0 0 8px #ba55d3; }
          50% { text-shadow: 0 0 18px #9932cc; }
          100% { text-shadow: 0 0 8px #ba55d3; }
        }
        .description {
          font-size: 1rem;
          color: #fff;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        @media (max-width: 600px) {
          .card {
            padding: 15px;
          }
          .header {
            font-size: 1.8rem;
          }
        }
      `}</style>
      <div className="page">
        <div className="card">
          <h2 className="header">💻 Welcome to Sentiment Analyzer 🤖</h2>
          <p className="description">
            Discover the emotions behind your text with our Sentiment Analyzer! This tool uses advanced algorithms to determine whether your input is positive, negative, or neutral. Key features include:
            - Real-time sentiment analysis
            - Interactive history tracking
            - Easy copy-to-clipboard functionality
            - Dynamic placeholder text for inspiration
          </p>
          <SentimentAnalyzer />
        </div>
      </div>
    </>
  );
}

export default HomePage;