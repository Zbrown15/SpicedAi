import React from 'react';
import { Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side */}
          <div className="flex items-center gap-6">
            <span className="text-lg font-bold">SpicedAI</span>
            <span className="text-steel-400">© {currentYear}</span>
            <div className="flex gap-4">
              <a 
                href="/terms" 
                className="text-steel-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </a>
              <a 
                href="/privacy" 
                className="text-steel-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <span className="text-steel-400">Questions right now?</span>
            <a 
              href="mailto:contact@spicedai.com"
              className="text-steel-400 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              contact@spicedai.com
            </a>
            <a 
              href="tel:858-275-4671"
              className="text-steel-400 hover:text-white transition-colors"
            >
              858-275-4671
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}