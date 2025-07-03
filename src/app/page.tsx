"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [clo, setClo] = useState("");
  type BloomResponse = {
  clo: string;
  suggested_verb: string;
  sample_question: string;
  };
  const [result, setResult] = useState<BloomResponse | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/generate`,
        null,
        {
          params: { clo },
        }
      );
      setResult(response.data);
      setError("");
    } catch (err) {
      setError("Failed to generate question. Please try again.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10 text-gray-800 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">BloomGen: Question Generator</h1>

      <textarea
        className="w-full h-32 p-4 border border-gray-300 rounded-lg text-lg"
        placeholder="Enter Course Learning Outcome (CLO)..."
        value={clo}
        onChange={(e) => setClo(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded"
      >
        Generate Question
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow border">
          <p className="text-lg"><strong>Suggested Verb:</strong> {result.suggested_verb}</p>
          <p className="mt-2 text-lg"><strong>Sample Question:</strong> {result.sample_question}</p>
        </div>
      )}
    </main>
  );
}
