import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-steel-200" : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span className="text-2xl font-bold text-charcoal-900">SpicedAI</span>
          </Link>

          {/* Primary CTA - Always Visible */}
          <Link to="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-2xl transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Book a 30-min Strategy Call
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </nav>
    </header>
  );
}