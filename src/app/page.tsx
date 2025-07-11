"use client";

import { useState } from "react";
import axios from "axios";

type Question = {
  bloom_code: string;
  bloom_level: string;
  suggested_verb: string;
  sample_question: string;
};

export default function Home() {
  const [clo, setClo] = useState("");
  const [topic, setTopic] = useState("");
  const [bloomCode, setBloomCode] = useState("");
  const [results, setResults] = useState<Question[]>([]);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setResults([]);

    if (!clo || !topic || !bloomCode) {
      setError("Please fill in all fields (CLO, Topic, and Bloom Level).");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/generate`,
        { clo, topic, bloom_code: bloomCode }
      );
      setResults(response.data.questions); // expects array of 3 questions
      console.log("✅ AI Response:", response.data);
    } catch (err) {
      setError("Failed to generate questions. Please try again.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10 text-gray-800 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">BloomGen: AI-Based Question Generator</h1>

      <label className="block mb-2 font-semibold">Course Learning Outcome (CLO)</label>
      <textarea
        className="w-full h-28 p-4 border border-gray-300 rounded-lg text-lg mb-4"
        placeholder="Enter Course Learning Outcome (CLO)..."
        value={clo}
        onChange={(e) => setClo(e.target.value)}
      />

      <label className="block mb-2 font-semibold">Topic or Context</label>
      <input
        type="text"
        className="w-full p-4 border border-gray-300 rounded-lg text-lg mb-4"
        placeholder="e.g., e-commerce models"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <label className="block mb-2 font-semibold">Bloom Taxonomy Level</label>
      <select
        className="w-full p-4 border border-gray-300 rounded-lg text-lg mb-4"
        value={bloomCode}
        onChange={(e) => setBloomCode(e.target.value)}
      >
        <option value="">Select Bloom Level</option>
        <option value="C1">C1 – Remember</option>
        <option value="C2">C2 – Understand</option>
        <option value="C3">C3 – Apply</option>
        <option value="C4">C4 – Analyze</option>
        <option value="C5">C5 – Evaluate</option>
        <option value="C6">C6 – Create</option>
      </select>

      <button
        onClick={handleGenerate}
        className="mt-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded"
      >
        Generate Questions
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6 space-y-6">
          <h2 className="text-xl font-bold mb-2">Generated Questions:</h2>
          {results.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow border space-y-2">
              <p className="text-sm text-gray-500">Question #{index + 1}</p>
              <p><strong>Bloom Code:</strong> {item.bloom_code}</p>
              <p><strong>Bloom Level:</strong> {item.bloom_level}</p>
              <p><strong>Suggested Verb:</strong> {item.suggested_verb}</p>
              <p><strong>Sample Question:</strong> {item.sample_question}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
