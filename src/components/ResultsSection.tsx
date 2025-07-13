import { BloomResponse } from "./types"; // Adjust path as needed

type ResultsSectionProps = {
  result: BloomResponse[] | null;
  onBack: () => void;
  onGenerateNew: () => void;
};

export default function ResultsSection({ result, onBack, onGenerateNew }: ResultsSectionProps) {
  return (
    result && result.length > 0 && (
      <div className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Generated Questions</h2>
                <button
                  onClick={onBack}
                  className="text-gray-600 hover:text-gray-900 font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Generator
                </button>
              </div>
              
              <div className="space-y-8">
                {result.map((q, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800">Question #{index + 1}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <p className="text-gray-700">
                          <span className="font-semibold">Bloom Code:</span> {q.bloom_code}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Bloom Level:</span> {q.bloom_level}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-700">
                          <span className="font-semibold">Suggested Verb:</span> {q.suggested_verb}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-gray-800 font-medium">
                        <span className="font-semibold">Sample Question:</span> {q.sample_question}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200 flex justify-center">
                <button
                  onClick={onGenerateNew}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-xl flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Generate New Set
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}