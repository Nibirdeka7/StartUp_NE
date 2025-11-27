import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShoppingCart, Star, ArrowRight, X, Download, FileText } from "lucide-react";

const BookShowcaseSection = () => {
  const [showPreview, setShowPreview] = useState(false);

  const PreviewModal = () => (
    <AnimatePresence>
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-cyan-50">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Book Preview</h3>
                <p className="text-slate-600 text-sm mt-1">Get a glimpse of what's inside</p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Sample Chapter 1 */}
                <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-2xl p-6 border border-cyan-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Chapter 1: Ideation & Validation</h4>
                      <p className="text-cyan-600 text-sm">Pages 15-42</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Learn how to identify viable business ideas specifically for the Northeast market. 
                    This chapter includes frameworks for market validation and case studies of successful NE startups.
                  </p>
                  <ul className="text-slate-600 text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      Idea generation techniques
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      Market research templates
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      Customer validation methods
                    </li>
                  </ul>
                </div>

                {/* Sample Chapter 2 */}
                <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Chapter 3: Funding Strategies</h4>
                      <p className="text-emerald-600 text-sm">Pages 85-112</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Discover funding opportunities available for Northeast startups. 
                    From government schemes to angel investors, learn how to secure capital for your venture.
                  </p>
                  <ul className="text-slate-600 text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      NE government schemes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      Pitch deck templates
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      Investor outreach strategies
                    </li>
                  </ul>
                </div>
              </div>

              {/* Free Sample Download */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="text-center">
                  <h4 className="font-bold text-slate-800 mb-2">Want to see more?</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Download the first chapter for free and get a complete feel of the book's content and style.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-cyan-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Free Sample Chapter
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-6 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-slate-600 text-sm text-center sm:text-left">
                  Ready to start your startup journey? Get the complete guide with all 12 chapters.
                </p>
                <motion.a
                  href="https://amazon.in/your-book-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Full Book - ₹499
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="py-16 bg-gradient-to-br from-slate-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Book Cover Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="relative">
                  {/* Book Cover */}
                  <div className="w-64 h-80 bg-gradient-to-br from-cyan-600 to-emerald-600 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer">
                    <div className="absolute inset-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                      <div className="p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">The 6-Month Guide</h3>
                        <div className="text-sm opacity-90">
                          <p>Building Your</p>
                          <p className="font-bold text-lg">NE Startup</p>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="text-xs opacity-80">From Idea to Launch</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-4 h-4 text-amber-800 fill-current" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400 rounded-full shadow-lg"></div>
                </div>
              </motion.div>

              {/* Book Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                    The 6-Month Guide to Building Your NE Startup
                  </h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Your comprehensive roadmap to launching a successful startup in Northeast India. 
                    From ideation to funding, this guide covers everything you need to transform your idea into a thriving business.
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-600 font-medium">4.8/5 (127 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-slate-900">₹499</span>
                    <span className="text-lg text-slate-500 line-through">₹899</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      45% OFF
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-2">Free shipping across India • Instant digital access</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    "Step-by-step 6-month plan",
                    "Funding strategies for NE startups",
                    "Market research templates",
                    "Legal compliance guide",
                    "Success stories from NE entrepreneurs",
                    "Ongoing mentorship access"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="https://amazon.in/your-book-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now on Amazon
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>

                  <motion.button
                    onClick={() => setShowPreview(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-3 border-2 border-cyan-200 text-cyan-700 px-8 py-4 rounded-2xl font-semibold hover:bg-cyan-50 transition-all duration-300"
                  >
                    <BookOpen className="w-5 h-5" />
                    Preview Book
                  </motion.button>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-center gap-6 text-sm text-slate-500 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Instant Digital Access
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    180+ Pages
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Free Updates
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal />
    </>
  );
};

export default BookShowcaseSection;