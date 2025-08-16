import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Wrench, 
  Thermometer, 
  Shield, 
  Users,
  ChevronDown,
  ChevronUp,
  Calculator,
  Zap,
  Settings,
  MessageSquare,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import VapiDemo from './VapiDemo';

// Get UTM parameters
const getUTMSource = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('utm_source');
  }
  return null;
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  );
};

// Primary CTA Button Component
const CTAButton = ({ children, className = '', size = 'default' }) => {
  const baseClasses = "bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl";
  const sizeClasses = {
    default: "px-8 py-4 text-lg",
    large: "px-12 py-6 text-xl",
    small: "px-6 py-3 text-base"
  };

  return (
    <Link to="/booking">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      >
        {children}
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </Link>
  );
};

// Section Container Component
const SectionContainer = ({ children, className = '' }) => (
  <section className={`py-16 px-4 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

// Hero Section
const HeroSection = () => {
  const utmSource = getUTMSource();
  const isLinkedIn = utmSource === 'linkedin';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => {
            console.warn('Video failed to load:', e);
            // Fallback: hide video and show gradient background
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.parentElement?.nextElementSibling;
            if (fallback) fallback.classList.remove('hidden');
          }}
        >
          <source src="/Hero Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback gradient background (hidden by default) */}
        <div className="hidden absolute inset-0 bg-gradient-to-br from-steel-900 via-charcoal-800 to-steel-900"></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {isLinkedIn 
              ? "HVAC owners from LinkedIn: watch SpicedAI book a job in under 30 seconds."
              : "Stop losing HVAC jobs to voicemail."
            }
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
            SpicedAI answers every call, qualifies the lead, and books the job 24/7 so you can keep crews moving.
          </p>

          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex flex-col md:flex-row gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Sounds human, no awkward pauses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Answers FAQs and prices from your sheet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Schedules straight to your calendar/CRM</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <CTAButton size="large">
              Book a 30-min Strategy Call
            </CTAButton>
            <a 
              href="tel:858-275-4671" 
              className="text-white/70 hover:text-white transition-colors"
            >
              Prefer text? 858-275-4671
            </a>
          </div>

          {/* Visual placeholder for future animation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed border-white/30">
            <div className="flex items-center justify-center gap-4 text-white/70">
              <Phone className="w-8 h-8" />
              <ArrowRight className="w-6 h-6" />
              <Users className="w-8 h-8" />
              <ArrowRight className="w-6 h-6" />
              <Calendar className="w-8 h-8" />
            </div>
            <p className="text-white/80 mt-4">Incoming Call → Qualified → Booked</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Partner Integration Strip
const PartnerStrip = () => {
  const partners = [
    'Google Calendar', 'Outlook', 'ServiceTitan', 'Jobber', 'Housecall Pro', 'Zapier'
  ];

  return (
    <SectionContainer className="py-12 bg-steel-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-lg font-semibold text-steel-600 mb-8">Works with your tools</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-steel-500 font-medium"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
};

// Demo Section Placeholder
const DemoSection = () => (
  <SectionContainer className="bg-charcoal-900">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
        Try Our AI Assistant Live
      </h2>

      <VapiDemo className="mb-8" />

      <CTAButton>
        Book a 30-min Strategy Call
      </CTAButton>
    </motion.div>
  </SectionContainer>
);

// ROI Calculator
const ROICalculator = () => {
  const [jobValue, setJobValue] = useState(500);
  const [missedCalls, setMissedCalls] = useState(5);
  const [closeRate, setCloseRate] = useState(30);
  
  const monthlyLoss = Math.round((jobValue * missedCalls * 4.33 * closeRate) / 100);

  return (
    <SectionContainer className="bg-gradient-to-br from-red-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
          Every missed call leaks revenue
        </h2>
        <p className="text-xl text-steel-600 mb-12">
          If your average ticket is $<span className="font-bold">{jobValue}</span> and you miss <span className="font-bold">{missedCalls}</span> calls/week… you're leaving this on the table.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                Average job value ($)
              </label>
              <input
                type="number"
                value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-lg font-bold text-charcoal-900 bg-white"
                min="0"
                step="50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                Missed calls per week
              </label>
              <input
                type="number"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-lg font-bold text-charcoal-900 bg-white"
                min="0"
                step="1"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                Close rate (%)
              </label>
              <input
                type="number"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-lg font-bold text-charcoal-900 bg-white"
                min="0"
                max="100"
                step="5"
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-steel-600 mb-2">Estimated revenue lost per month:</p>
            <div className="text-4xl font-bold text-red-600 mb-6">
              <AnimatedCounter end={monthlyLoss} prefix="$" key={`${jobValue}-${missedCalls}-${closeRate}`} />
            </div>
          </div>
        </div>

        <CTAButton>
          Stop the leak — Book a 30-min Strategy Call
        </CTAButton>
      </motion.div>
    </SectionContainer>
  );
};

// How It Works
const HowItWorks = () => {
  const steps = [
    {
      title: "Forward your number",
      description: "Keep your current line. Forward in 5 minutes.",
      icon: Phone
    },
    {
      title: "AI answers like your best CSR",
      description: "Qualifies, answers FAQs, references your price sheet.",
      icon: MessageSquare
    },
    {
      title: "We schedule and confirm",
      description: "Jobs land on your calendar/CRM with SMS/email confirmations.",
      icon: Calendar
    }
  ];

  return (
    <SectionContainer className="bg-charcoal-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          How SpicedAI books jobs for you
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-steel-300">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full">
                  <ArrowRight className="w-6 h-6 text-steel-400 mx-auto" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <CTAButton>
          Book a 30-min Strategy Call
        </CTAButton>
      </motion.div>
    </SectionContainer>
  );
};

// HVAC Use Cases
const HVACUseCases = () => {
  const cases = [
    {
      title: "After-hours emergencies",
      description: "No more next-day voicemail roulette.",
      icon: Clock
    },
    {
      title: "Peak-season overflow",
      description: "Keep every line answered during heat waves.",
      icon: Thermometer
    },
    {
      title: "Techs on site",
      description: "We book while crews stay on the job.",
      icon: Wrench
    },
    {
      title: "Maintenance plans",
      description: "Proactive scheduling and renewals.",
      icon: Settings
    }
  ];

  return (
    <SectionContainer className="relative overflow-hidden bg-charcoal-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Person repairing HVAC.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px)',
          opacity: 0.7
        }}
      ></div>
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-5"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
            Built for real HVAC chaos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {cases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <useCase.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-charcoal-900 mb-2">{useCase.title}</h3>
                <p className="text-steel-600">{useCase.description}</p>
              </motion.div>
            ))}
          </div>

          <CTAButton>
            Book a 30-min Strategy Call
          </CTAButton>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

// Features List
const FeaturesList = () => {
  const features = [
    "Natural voice that adapts",
    "Qualification questions you control",
    "Knowledge base for pricing and policies",
    "Calendar/CRM sync",
    "Routing rules for emergencies and VIPs",
    "English/Spanish support"
  ];

  return (
    <SectionContainer className="bg-charcoal-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          What you get on day one
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-left"
            >
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <span className="text-lg text-steel-200">{feature}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-steel-300 mb-8">No new app required. Keep your number.</p>

        <CTAButton>
          Book a 30-min Strategy Call
        </CTAButton>
      </motion.div>
    </SectionContainer>
  );
};

// Proof Section
const ProofSection = () => {
  const metrics = [
    { value: 0, suffix: " missed after-hours calls when properly forwarded" },
    { value: 60, prefix: "Under ", suffix: " average response time to answer + qualify" },
    { text: "Fewer interruptions for techs = more completed jobs" }
  ];

  return (
    <SectionContainer className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-12">
          Why HVAC teams switch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-steel-50 rounded-2xl p-6 shadow-lg"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {index === 2 ? (
                  <span className="text-lg">✓</span>
                ) : (
                  <AnimatedCounter 
                    end={metric.value} 
                    prefix={metric.prefix || ''} 
                    suffix={metric.value === 60 ? 's' : ''} 
                  />
                )}
              </div>
              <p className="text-steel-600 font-medium">
                {metric.text || metric.suffix}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-steel-500 mb-8">
          Numbers shown are capability targets; exact results vary.
        </p>

        <CTAButton>
          Book a 30-min Strategy Call
        </CTAButton>
      </motion.div>
    </SectionContainer>
  );
};

// Pricing Teaser
const PricingTeaser = () => (
  <SectionContainer className="bg-charcoal-900">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto text-center text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Straightforward pricing
      </h2>
      <p className="text-xl text-steel-200 mb-6">
        Simple monthly + usage that pays for itself with a single rescued call/week.
      </p>
      <p className="text-steel-300 mb-8">
        We tailor call flows to your seasonality.
      </p>

      <CTAButton>
        See your pricing on a 30-min call
      </CTAButton>
    </motion.div>
  </SectionContainer>
);

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Does it actually sound human?",
      answer: "Yes. Natural conversation, no robotic delays. It listens, clarifies, and responds in real time."
    },
    {
      question: "What if it doesn't know an answer?",
      answer: "It switches to a failsafe: gathers details and routes to your team with a clean handoff."
    },
    {
      question: "Will it work with our number and tools?",
      answer: "Yes. You keep your number. We forward calls and sync with calendars/CRMs."
    },
    {
      question: "After-hours and emergencies?",
      answer: "Custom rules for escalation, on-call rotations, and urgent scheduling."
    },
    {
      question: "Spanish support?",
      answer: "Available if enabled in your setup."
    },
    {
      question: "How fast can we go live?",
      answer: "Same day for simple setups. We can start forwarding and booking within hours."
    }
  ];

  return (
    <SectionContainer className="bg-steel-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-steel-50 transition-colors"
              >
                <span className="font-semibold text-charcoal-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-steel-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-steel-500" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="px-6 pb-4"
                >
                  <p className="text-steel-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton>
            Book a 30-min Strategy Call
          </CTAButton>
        </div>
      </motion.div>
    </SectionContainer>
  );
};

// Final CTA
const FinalCTA = () => (
  <SectionContainer className="bg-charcoal-900 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-4xl mx-auto"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        Let's plug the leaks and book more jobs.
      </h2>
      <p className="text-xl text-steel-300 mb-12">
        Forward your calls. We answer, qualify, and schedule — every hour, every day.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <CTAButton size="large" className="bg-primary-600 hover:bg-primary-700 text-white">
          Book a 30-min Strategy Call
        </CTAButton>
        <a 
          href="tel:858-275-4671" 
          className="text-steel-300 hover:text-white transition-colors"
        >
          Prefer text? 858-275-4671
        </a>
      </div>
    </motion.div>
  </SectionContainer>
);

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PartnerStrip />
      <DemoSection />
      <ROICalculator />
      <HowItWorks />
      <HVACUseCases />
      <FeaturesList />
      <ProofSection />
      <PricingTeaser />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}