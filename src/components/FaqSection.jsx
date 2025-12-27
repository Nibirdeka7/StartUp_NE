'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus, HelpCircle, BookOpen, Target, Users, Rocket, TrendingUp, Shield, Zap, Globe, Award, Briefcase, Wrench, FileText, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    category: 'Services & Support',
    questions: [
      {
        title: 'What services do you provide for startups?',
        description: 'We offer comprehensive services including business registration assistance, legal compliance guidance, market research, mentorship matching, networking events, pitch preparation, and access to our partner ecosystem. Our services are tailored specifically for Northeast-based startups.',
        icon: Briefcase
      },
      {
        title: 'How can I access your mentorship program?',
        description: 'Mentorship access is available to all registered startups. You can apply through your dashboard, specifying your needs (tech, marketing, operations). We match you with relevant mentors from our network of 200+ industry experts across 8 states.',
        icon: Users
      },
      {
        title: 'Do you provide co-working spaces?',
        description: 'Yes, we partner with co-working spaces across all 8 Northeast states offering discounted rates to our registered startups. You can book spaces through our platform with flexible monthly plans.',
        icon: Building
      }
    ]
  },
  {
    category: 'Registration & Onboarding',
    questions: [
      {
        title: 'How do I register my startup?',
        description: 'Visit our website, click "Register Startup", fill in basic details (team, product, stage), and submit. Our team reviews applications within 24 hours. Registration is completely free for Northeast-based startups.',
        icon: BookOpen
      },
      {
        title: 'What documents are required?',
        description: 'We need your business registration proof, team details, pitch deck/executive summary, and any existing traction metrics. All documents can be uploaded securely through our portal.',
        icon: FileText
      },
      {
        title: 'Is there a registration fee?',
        description: 'No, registration is completely free. We believe in removing financial barriers for Northeast entrepreneurs. Premium services like advanced analytics and dedicated support are available through flexible subscription plans.',
        icon: Shield
      }
    ]
  },
  {
    category: 'Community & Resources',
    questions: [
      {
        title: 'What networking opportunities exist?',
        description: 'We host monthly virtual meetups, quarterly founder summits in major NE cities, and an annual Northeast Startup Festival. Our platform also features discussion forums and founder matching services.',
        icon: Globe
      },
      {
        title: 'What free resources do you provide?',
        description: 'Access to pitch deck templates, legal document samples, market research reports specific to NE markets, software discounts, and exclusive workshops on growth strategies and team building.',
        icon: Award
      },
      {
        title: 'How can I connect with other founders?',
        description: 'Join our Founder Connect program through your dashboard. We facilitate peer-to-peer connections based on industry, stage, and location to build meaningful collaborations across the region.',
        icon: Users
      }
    ]
  }
];

function FAQSection() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Services & Support');

  const handleQuestionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative py-12 md:py-20 bg-gradient-to-b from-white via-red-50/20 to-blue-50/20">
      {/* Background Elements - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-slate-100/30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header - Mobile Optimized */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/80 backdrop-blur-sm border border-red-200/50 shadow-sm mb-4 md:mb-6">
            <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
              <img src="/Startup_NE.png" alt="Startup NE Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs md:text-sm font-medium text-slate-800 font-poppins">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6 font-montserrat leading-tight">
            Your Questions
            <span className="block bg-gradient-to-r from-red-800 to-red-900 bg-clip-text text-transparent">
              Answered
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-poppins max-w-2xl mx-auto px-2">
            Everything about our services for Northeast India's startup ecosystem
          </p>
        </div>

        {/* Category Tabs - Mobile Scrollable */}
        <div className="mb-8 md:mb-12">
          <div className="flex lg:justify-center overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max px-2">
              {faqs.map((section) => (
                <button
                  key={section.category}
                  onClick={() => {
                    setActiveCategory(section.category);
                    setActiveIndex(null);
                  }}
                  className={`px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-medium font-poppins text-sm md:text-base whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeCategory === section.category
                      ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-red-300 hover:shadow-md'
                  }`}
                >
                  {section.category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion - Mobile Optimized */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            {faqs
              .find(section => section.category === activeCategory)
              ?.questions.map((faq, index) => {
                const Icon = faq.icon;
                const isActive = activeIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    className={`border-b border-slate-100 last:border-b-0 ${
                      isActive ? 'bg-red-50/50' : ''
                    }`}
                    initial={false}
                  >
                    <button
                      onClick={() => handleQuestionClick(index)}
                      className="w-full px-4 sm:px-6 md:px-8 py-4 md:py-6 text-left flex items-start justify-between gap-3 sm:gap-4 hover:bg-slate-50/50 transition-colors duration-200 active:bg-red-50/30"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-montserrat mb-1 sm:mb-2 leading-tight">
                            {faq.title}
                          </h3>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm sm:text-base text-slate-600 font-poppins leading-relaxed pt-1 sm:pt-2"
                              >
                                {faq.description}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        {isActive ? (
                          <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                        ) : (
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        )}
                      </div>
                    </button>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* Stats - Mobile Grid */}
        <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 sm:p-6 text-center border border-red-200">
            <div className="text-2xl sm:text-3xl font-bold text-red-700 font-montserrat mb-1 sm:mb-2">24 hrs</div>
            <div className="text-xs sm:text-sm text-slate-700 font-poppins">Response Time</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 text-center border border-blue-200">
            <div className="text-2xl sm:text-3xl font-bold text-blue-700 font-montserrat mb-1 sm:mb-2">95%</div>
            <div className="text-xs sm:text-sm text-slate-700 font-poppins">Satisfaction Rate</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 sm:p-6 text-center border border-emerald-200">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-montserrat mb-1 sm:mb-2">200+</div>
            <div className="text-xs sm:text-sm text-slate-700 font-poppins">Mentor Network</div>
          </div>
        </div>

        {/* Contact Section - Mobile Optimized */}
        <div className="mt-12 md:mt-16 text-center px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-red-50 to-blue-50 border border-red-200/50 mb-3 md:mb-4">
            <HelpCircle className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
            <span className="text-xs md:text-sm font-semibold text-red-700">Need Help?</span>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-slate-600 font-poppins mb-4 md:mb-6 max-w-lg mx-auto">
            Can't find what you're looking for? Our support team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
                onClick={() => navigate("/contact")}
            >
              Contact Support
            </button>
            <button className="px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-red-200 text-red-700 rounded-xl font-semibold text-sm sm:text-base hover:bg-red-50 transition-colors duration-300 active:bg-red-100"
                onClick={() => navigate("/connect")}
            >
              Join Community
            </button>
          </div>
          
          {/* Quick Contact Info - Mobile Only */}
          <div className="mt-8 sm:hidden">
            <div className="text-sm text-slate-500 font-poppins">
              <p className="mb-2">📧 support@startupne.com</p>
              <p>📞 +91 123 456 7890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-specific optimizations */}
      <style >{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Better touch targets */
        @media (max-width: 640px) {
          button, [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}

export default FAQSection;