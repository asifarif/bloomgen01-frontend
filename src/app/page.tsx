"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import Link from "next/link"; // Removed unused import
import HeroSection from "../components/HeroSection";
import BloomLevelsSection from "../components/BloomLevelsSection";
import GeneratorSection from "../components/GeneratorSection";
import ResultsSection from "../components/ResultsSection";

type BloomResponse = {
  bloom_code: string;
  bloom_level: string;
  suggested_verb: string;
  sample_question: string;
};

const bloomLevels = [
  { code: "C1", level: "Remember", description: "Recall facts and basic concepts" },
  { code: "C2", level: "Understand", description: "Explain ideas or concepts" },
  { code: "C3", level: "Apply", description: "Use information in new situations" },
  { code: "C4", level: "Analyze", description: "Draw connections among ideas" },
  { code: "C5", level: "Evaluate", description: "Justify a stand or decision" },
  { code: "C6", level: "Create", description: "Produce new or original work" },
];

type BloomCode = "C1" | "C2" | "C3" | "C4" | "C5" | "C6";

export default function Home() {
  const [clo, setClo] = useState("");
  const [topic, setTopic] = useState("");
  const [bloomCode, setBloomCode] = useState<BloomCode>("C2");
  const [verbs, setVerbs] = useState<string[]>([]);
  const [selectedVerbs, setSelectedVerbs] = useState<string[]>([]);
  const [result, setResult] = useState<BloomResponse[] | null>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/verbs`)
      .then(res => {
        setVerbs(res.data[bloomCode]?.verbs || []);
      });
  }, [bloomCode]);

  const handleGenerate = async () => {
    if (!clo.trim() || !topic.trim()) {
      setError("Please fill in both CLO and Topic fields");
      return;
    }
    
    setIsGenerating(true);
    setError("");
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
        clo,
        topic,
        bloom_code: bloomCode,
        verbs: selectedVerbs.length > 0 ? selectedVerbs : undefined
      });
      setResult(response.data.questions);
    } catch {
      setError("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleVerb = (verb: string) => {
    if (selectedVerbs.includes(verb)) {
      setSelectedVerbs(selectedVerbs.filter(v => v !== verb));
    } else if (selectedVerbs.length < 3) {
      setSelectedVerbs([...selectedVerbs, verb]);
    }
  };

  const handleBloomCodeChange = (value: string) => {
    setBloomCode(value as BloomCode);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Bloom Levels Section */}
      <BloomLevelsSection levels={bloomLevels} />

      {/* Generator Section */}
      <GeneratorSection
        clo={clo}
        topic={topic}
        bloomCode={bloomCode}
        verbs={verbs}
        selectedVerbs={selectedVerbs}
        isGenerating={isGenerating}
        error={error}
        onCloChange={setClo}
        onTopicChange={setTopic}
        onBloomCodeChange={handleBloomCodeChange}
        onVerbToggle={toggleVerb}
        onGenerate={handleGenerate}
      />

      {/* Results Section */}
      <ResultsSection
        result={result}
        onBack={() => setResult(null)}
        onGenerateNew={handleGenerate}
      />
    </div>
  );
}