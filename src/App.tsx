import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { trackPageView } from './utils/ga';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ContactPage from './components/ContactPage';
import BookingSuccessPage from './components/BookingSuccessPage';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    // Track page view for Google Analytics with a small delay to ensure gtag is loaded
    setTimeout(() => {
      trackPageView(window.location.pathname);
    }, 100);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<ContactPage />} />
        <Route path="/booking-success" element={<BookingSuccessPage />} />
      </Routes>
      <Footer />
    </div>
  );
}