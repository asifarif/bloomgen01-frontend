type GeneratorSectionProps = {
  clo: string;
  topic: string;
  bloomCode: string;
  verbs: string[];
  selectedVerbs: string[];
  isGenerating: boolean;
  error: string;
  onCloChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onBloomCodeChange: (value: string) => void;
  onVerbToggle: (verb: string) => void;
  onGenerate: () => void;
};

export default function GeneratorSection({
  clo,
  topic,
  bloomCode,
  verbs,
  selectedVerbs,
  isGenerating,
  error,
  onCloChange,
  onTopicChange,
  onBloomCodeChange,
  onVerbToggle,
  onGenerate,
}: GeneratorSectionProps) {
  const bloomLevels = [
    { code: "C1", level: "Remember" },
    { code: "C2", level: "Understand" },
    { code: "C3", level: "Apply" },
    { code: "C4", level: "Analyze" },
    { code: "C5", level: "Evaluate" },
    { code: "C6", level: "Create" },
  ];

  return (
    <div className="py-16 generator-section" style={{ padding: '64px 0' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Generate Academic Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Create customized questions based on Bloom&apos;s Taxonomy cognitive levels
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bloom&apos;s Taxonomy Level (Test)
              </label>
              <div className="relative select-container" style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '400px' }}>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                  value={bloomCode}
                  onChange={(e) => onBloomCodeChange(e.target.value)}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    backgroundImage: 'none',
                    paddingRight: '40px',
                    overflow: 'hidden',
                  }}
                >
                  {bloomLevels.map(level => (
                    <option key={level.code} value={level.code}>
                      {level.code} – {level.level}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Selected: {bloomCode.split(' – ')[1]}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Learning Outcome (CLO)
                  </label>
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[120px]"
                    placeholder="e.g., Students will be able to explain the principles of..."
                    value={clo}
                    onChange={(e) => onCloChange(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic or Context
                  </label>
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[120px]"
                    placeholder="e.g., Newton&apos;s Laws of Motion, World War II causes..."
                    value={topic}
                    onChange={(e) => onTopicChange(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Action Verbs (max 3)
                  </label>
                  <div className="bg-gray-50 rounded-xl p-4 min-h-[150px]">
                    {verbs.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {verbs.map((verb) => (
                          <button
                            key={verb}
                            type="button"
                            onClick={() => onVerbToggle(verb)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                              selectedVerbs.includes(verb)
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
                            } ${
                              selectedVerbs.length >= 3 && !selectedVerbs.includes(verb)
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:shadow-sm"
                            }`}
                            disabled={selectedVerbs.length >= 3 && !selectedVerbs.includes(verb)}
                          >
                            {verb}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Loading verbs for selected level...</p>
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                      {selectedVerbs.length > 0 ? (
                        <span>Selected: {selectedVerbs.join(", ")}</span>
                      ) : (
                        <span>No verbs selected - system will choose appropriate verbs</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={onGenerate}
                disabled={isGenerating}
                className={`px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                  isGenerating
                    ? "bg-blue-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 hover:shadow-xl"
                } flex items-center`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Questions"
                )}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}