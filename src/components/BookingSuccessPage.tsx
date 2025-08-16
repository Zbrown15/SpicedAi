import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Mail, Phone, ArrowRight, Download, User, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BookingSuccessPage() {
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    {
      icon: Mail,
      title: 'Confirmation Email Sent',
      description: 'Check your inbox for meeting details and calendar invite',
      time: 'Within 2 minutes'
    },
    {
      icon: Calendar,
      title: 'Calendar Invite Added',
      description: 'Meeting automatically added to your calendar',
      time: 'Immediate'
    },
    {
      icon: User,
      title: 'Meet Your AI Specialist',
      description: 'Zach will call you at the scheduled time',
      time: 'At meeting time'
    }
  ];

  const preparationItems = [
    'Brief overview of your current business challenges',
    'Your goals for AI automation',
    'Any specific questions about our services',
    'Information about your target audience and industry'
  ];

  const ConfettiAnimation = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            transition: {
              duration: Math.random() * 2 + 3,
              ease: "easeOut"
            }
          }}
          style={{
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-20 px-4 relative">
      {confetti && <ConfettiAnimation />}
      
      <div className="container mx-auto max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/30 rounded-full blur-xl animate-pulse" />
              <div className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-primary" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            Booking Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Your AI consultation has been successfully scheduled. We're excited to help transform your business with cutting-edge automation!
          </motion.p>
        </motion.div>

        {/* Meeting Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-8 mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Your Meeting Details</h2>
            <p className="text-gray-400">15-Minute AI Consultation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Date & Time</h3>
              <p className="text-gray-400 text-sm">Check your email for exact details</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Call Type</h3>
              <p className="text-gray-400 text-sm">Video call via Zoom/Google Meet</p>
            </div>
            <div className="text-center">
              <User className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Your Specialist</h3>
              <p className="text-gray-400 text-sm">Zach Brown, AI Automation Expert</p>
            </div>
          </div>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-center mb-8">What Happens Next</h2>
          
          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="card p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{step.title}</h3>
                    <span className="text-sm text-primary font-medium">{step.time}</span>
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Preparation Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">How to Prepare for Your Consultation</h2>
          <p className="text-gray-400 text-center mb-8">
            To make the most of our time together, please consider preparing:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preparationItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Need to Make Changes?</h2>
          <p className="text-gray-400 text-center mb-8">
            If you need to reschedule or have any questions before our meeting, don't hesitate to reach out.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="mailto:contact@spicedai.com?subject=Consultation Booking - Need Help"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline group"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </motion.a>
            <motion.a 
              href="https://cal.com/zach-brown-lryqhu/15min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline group"
            >
              <Calendar className="w-5 h-5" />
              Reschedule Meeting
            </motion.a>
          </div>
        </motion.div>

        {/* Explore More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">While You Wait...</h2>
          <p className="text-gray-400 mb-8">
            Explore our AI solutions and see how we can transform your business
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline group"
              >
                Back to Homepage
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}