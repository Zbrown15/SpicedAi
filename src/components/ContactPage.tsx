import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, Mail, ArrowRight, Send, User, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const openCalendar = () => {
    window.open('https://cal.com/zach-brown-lryqhu/15min', '_blank', 'noopener,noreferrer');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <CheckCircle2 className="w-24 h-24 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 text-charcoal-900">Thank You!</h1>
            <p className="text-xl text-steel-600 mb-8">
              We've received your message and will get back to you within 24 hours.
            </p>
            <motion.button
              onClick={() => setIsSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 inline-flex items-center gap-2"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/30 to-primary-600/10 rounded-full blur-xl" />
              <div className="relative bg-steel-50 backdrop-blur-sm rounded-full px-6 py-1">
                <span className="text-primary-600 font-semibold">Get In Touch</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-charcoal-900">
            Ready to Transform Your Business with AI?
          </h1>
          
          <p className="text-xl text-steel-600 max-w-3xl mx-auto">
            Let's discuss how AI automation can streamline your operations and drive growth. Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: Clock,
              title: 'Quick Response',
              description: 'We respond to all inquiries within 24 hours'
            },
            {
              icon: Phone,
              title: 'Expert Guidance',
              description: 'Get personalized recommendations from our AI specialists'
            },
            {
              icon: Mail,
              title: 'Custom Solutions',
              description: 'Receive a tailored automation strategy for your business'
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="bg-steel-50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <benefit.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-charcoal-900">{benefit.title}</h3>
              <p className="text-steel-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-steel-200"
        >
          <div className="text-center mb-8">
            <Calendar className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-charcoal-900">Schedule Your Free Consultation</h2>
            <p className="text-steel-600">
              Book a 15-minute call to discuss how AI automation can transform your business.
            </p>
          </div>

          {/* Calendar Preview Card */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 border border-primary-200 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1 text-charcoal-900">15-Minute AI Consultation</h3>
                  <p className="text-steel-600">with Zach Brown, AI Automation Expert</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-steel-600">15 minutes</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-steel-600">Video call</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-steel-600">Free consultation</span>
                </div>
              </div>

              <motion.button
                onClick={openCalendar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 inline-flex items-center gap-2 text-lg"
              >
                <Calendar className="w-5 h-5" />
                Schedule Your Call Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <p className="text-sm text-steel-500 mt-4">
                Opens in a new window • Powered by Cal.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-steel-200 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-charcoal-900">Other Ways to Reach Us</h2>
          <p className="text-steel-600 mb-6">
            Need immediate assistance? Contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="mailto:contact@spicedai.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              contact@spicedai.com
            </motion.a>
            <motion.a 
              href="tel:+1234567890"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              (123) 456-7890
            </motion.a>
          </div>
          
          {/* What We'll Discuss */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-bold mb-6 text-charcoal-900">What We'll Discuss in Your Consultation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Your current business challenges and goals',
                'AI automation opportunities for your industry',
                'Custom solution recommendations',
                'Implementation timeline and next steps'
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-steel-600 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}