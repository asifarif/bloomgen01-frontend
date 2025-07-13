import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="bg-blue-800 text-white py-20 pt-24">
      <div className="container text-center">
        <div className="inline-block bg-blue-700 px-4 py-1 rounded-full mb-4">
        </div>
        <h1 className="text-4xl font-bold mb-6">Bloom's Taxonomy Question Generator</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Create targeted academic questions that assess different cognitive levels
        </p>
      </div>
    </div>
  );
}