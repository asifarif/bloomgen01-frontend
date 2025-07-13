"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        className="text-gray-700 hover:text-blue-600 focus:outline-none p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <nav className="px-4 py-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link 
              href="/bloom-levels" 
              className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              📊 Bloom Levels
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              ℹ️ About
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              📞 Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}