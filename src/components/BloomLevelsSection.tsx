import Link from "next/link";

type BloomLevel = {
  code: string;
  level: string;
  description: string;
};

type BloomLevelsSectionProps = {
  levels: BloomLevel[];
};

export default function BloomLevelsSection({ levels }: BloomLevelsSectionProps) {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bloom's Taxonomy Levels</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a cognitive level to learn more about it and generate targeted questions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => (
            <Link
              key={level.code}
              href="/bloom-levels"
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-4">
                    <span className="text-xl font-bold">{level.code}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{level.level}</h3>
                </div>
                <p className="text-gray-600 mb-6">{level.description}</p>
                <div className="flex items-center">
                  <span className="learn-more">
                    Learn more <span className="css-arrow"></span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}