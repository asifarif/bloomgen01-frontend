"use client";

import { useState } from "react";
import Link from "next/link";

const BLOOM_VERBS = {
  "C1": {
    "name": "Remember",
    "description": "Students recall information and recognize facts, terms, basic concepts, and answers.",
    "icon": "🧠",
    "color": "bg-red-100 text-red-800 border-red-200",
    "verbs": [
      "define", "identify", "describe", "label", "list", "name", "state", "match",
      "recognize", "select", "examine", "locate", "memorize", "quote", "recall",
      "reproduce", "tabulate", "tell", "copy", "discover", "duplicate", "enumerate",
      "highlight", "omit", "recite", "record", "repeat", "relate", "retell", "visualize"
    ],
  },
  // ... (other levels remain the same)
} as const;

type BloomCode = keyof typeof BLOOM_VERBS;

export default function BloomLevels() {
  const [selectedLevel, setSelectedLevel] = useState<BloomCode | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVerbs = (verbs: readonly string[]) => {
    if (!searchTerm) return verbs;
    return verbs.filter(verb => 
      verb.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const totalVerbs = Object.values(BLOOM_VERBS).reduce((sum, level) => sum + level.verbs.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bloom&apos;s Taxonomy Reference
        </h1>
        <p className="text-xl md:text-2xl mb-6 opacity-90">
          Complete Guide to Cognitive Learning Levels
        </p>
        <div className="flex justify-center items-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📊</span>
            <span>6 Cognitive Levels</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎯</span>
            <span>{totalVerbs} Action Verbs</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span>Educational Framework</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              ← Back to Generator
            </Link>
            <span className="text-gray-500">|</span>
            <h2 className="text-xl font-bold text-gray-900">Learning Taxonomy Guide</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search verbs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
            <button
              onClick={() => setSelectedLevel(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Show All
            </button>
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Bloom&apos;s Taxonomy Pyramid</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {Object.entries(BLOOM_VERBS).map(([code, level]) => (
            <div
              key={code}
              onClick={() => setSelectedLevel(selectedLevel === code ? null : code as BloomCode)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedLevel === code
                  ? `${level.color} border-current shadow-lg transform scale-105`
                  : "bg-gray-50 border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{level.icon}</div>
                <div className="font-bold text-sm">{code}</div>
                <div className="text-xs font-medium">{level.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {level.verbs.length} verbs
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Level Information */}
      {selectedLevel ? (
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className={`p-6 rounded-lg ${BLOOM_VERBS[selectedLevel].color} border-2 border-current mb-6`}>
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{BLOOM_VERBS[selectedLevel].icon}</span>
              <div>
                <h3 className="text-2xl font-bold">
                  {selectedLevel} - {BLOOM_VERBS[selectedLevel].name}
                </h3>
                <p className="text-lg opacity-90 mt-2">
                  {BLOOM_VERBS[selectedLevel].description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-gray-900">Action Verbs</h4>
              <span className="text-sm text-gray-500">
                {filteredVerbs(BLOOM_VERBS[selectedLevel].verbs).length} verbs
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredVerbs(BLOOM_VERBS[selectedLevel].verbs).map((verb) => (
                <div
                  key={verb}
                  className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center font-medium"
                >
                  {verb}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* All Levels Display */}
          {Object.entries(BLOOM_VERBS).map(([code, level]) => (
            <div key={code} className="bg-white rounded-xl shadow-md p-8">
              <div className={`p-6 rounded-lg ${level.color} border-2 border-current mb-6`}>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{level.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">
                      {code} - {level.name}
                    </h3>
                    <p className="text-lg opacity-90 mt-2">
                      {level.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLevel(code as BloomCode)}
                    className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-gray-900">Action Verbs</h4>
                  <span className="text-sm text-gray-500">
                    {filteredVerbs(level.verbs).length} verbs
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {filteredVerbs(level.verbs).slice(0, 12).map((verb) => (
                    <div
                      key={verb}
                      className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center font-medium"
                    >
                      {verb}
                    </div>
                  ))}
                  {filteredVerbs(level.verbs).length > 12 && (
                    <button
                      onClick={() => setSelectedLevel(code as BloomCode)}
                      className="px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-100 transition-colors text-center font-medium text-blue-700"
                    >
                      +{filteredVerbs(level.verbs).length - 12} more
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Educational Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-3xl mr-3">💡</span>
          Tips for Using Bloom&apos;s Taxonomy
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-gray-900 mb-2">🎯 Question Design</h4>
              <p className="text-gray-700 text-sm">
                Use higher-order thinking verbs (Analyze, Evaluate, Create) for challenging assessments that promote critical thinking.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-gray-900 mb-2">📈 Progressive Learning</h4>
              <p className="text-gray-700 text-sm">
                Build from lower levels (Remember, Understand) to higher levels (Apply, Analyze) for scaffolded learning.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-900 mb-2">🔄 Balanced Assessment</h4>
              <p className="text-gray-700 text-sm">
                Include questions from multiple levels to comprehensively assess student understanding and skills.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-bold text-gray-900 mb-2">🎓 Learning Objectives</h4>
              <p className="text-gray-700 text-sm">
                Align your questions with specific learning objectives to ensure assessment validity and effectiveness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}