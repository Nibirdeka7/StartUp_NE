import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShoppingCart, Star, ArrowRight, X, Download, FileText, Play, ChevronRight } from "lucide-react";

const 
CombinedBookShowcase = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const PreviewModal = () => (
    <AnimatePresence>
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-red-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-montserrat">Book Preview</h3>
                  <p className="text-slate-600 text-sm font-poppins">Get a glimpse of what's inside</p>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Sample Chapter 1 */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 font-montserrat">Chapter 1: The Northeast Opportunity</h4>
                      <p className="text-red-600 text-sm font-poppins">Understanding Your Market</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 font-poppins">
                    Discover the unique market dynamics of Northeast India and learn how to leverage local advantages for competitive edge.
                  </p>
                  <ul className="text-slate-600 text-sm space-y-2 font-poppins">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-red-600" />
                      Market gap analysis framework
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-red-600" />
                      Regional competitive analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-red-600" />
                      Cultural intelligence guide
                    </li>
                  </ul>
                </div>

                {/* Sample Chapter 2 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 font-montserrat">Chapter 2: Growth Strategies</h4>
                      <p className="text-blue-600 text-sm font-poppins">Scaling Your Venture</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 font-poppins">
                    Comprehensive guide to scaling your startup in the Northeast market, including team building and market expansion.
                  </p>
                  <ul className="text-slate-600 text-sm space-y-2 font-poppins">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-blue-600" />
                      Team scaling strategies
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-blue-600" />
                      Market expansion templates
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-blue-600" />
                      Operational scaling checklist
                    </li>
                  </ul>
                </div>
              </div>

              {/* Free Sample Download */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                <div className="text-center">
                  <h4 className="font-bold text-slate-800 mb-2 font-montserrat">Want the Full Experience?</h4>
                  <p className="text-slate-600 text-sm mb-4 font-poppins max-w-lg mx-auto">
                    Download the complete first chapter including all templates, worksheets, and case studies.
                  </p>
                  <motion.button
                    onClick={() => window.open(
                        "https://drive.google.com/file/d/1nkPiO9KerZjEi_eaSIOGtphsQTymUBo2/view?usp=sharing",
                        "_blank"
                      )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    
                    Download Free Chapter
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-6 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-slate-600 text-sm text-center sm:text-left font-poppins">
                  Complete guide includes 12 chapters, 25+ templates, and lifetime updates.
                </p>
                <motion.button
                  onClick={() => setShowPreview(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Get Full Book - ₹199
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="min-h-[600px] py-12 md:py-20 bg-gradient-to-br from-slate-50 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Left Column: Interactive Book */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex justify-center lg:justify-start"
              >
                <div 
                  className="book relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Book Back (Static Content) */}
                  <div className="inner rounded-xl bg-gradient-to-br from-white to-slate-100 border border-slate-300">
                    <div className="p-6 text-center">
                      <button 
                        onClick={() => setShowPreview(true)}
                        className="group cursor-pointer"
                      >
                        <div className="mb-4">
                          <Play className="w-12 h-12 mx-auto text-red-600 group-hover:text-red-700 transition-colors" />
                        </div>
                        <p className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                          Preview Book
                        </p>
                        <p className="text-sm text-slate-600 font-poppins">
                          Click to explore chapters
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-700">
                          View Preview
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Book Cover with Image */}
                  <div className="cover rounded-xl overflow-hidden border-2 border-slate-300/50">
                    <div className="relative w-full h-full">
                      {/* Book Cover Image */}
                      <img 
                        src="https://res.cloudinary.com/dsnjjxtkk/image/upload/v1766858403/startups/dpiit-certificates/ow9r9xoxgurrlojn1ggj.png" 
                        alt="The 6-Month Guide to Building Your NE Startup"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = e.target.parentElement;
                          fallback.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-red-600 to-blue-800 flex flex-col items-center justify-center p-6 text-white">
                              <BookOpen class="w-12 h-12 mb-4 opacity-80" />
                              <h3 class="text-lg font-bold mb-2 font-montserrat">The 6-Month Guide</h3>
                              <p class="text-sm opacity-90 text-center font-poppins">Building Your NE Startup</p>
                              <div class="absolute bottom-4 left-0 right-0">
                                <p class="text-xs opacity-80 text-center">From Idea to Launch</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Cover Text */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white font-montserrat mb-1">
                          The 6-Month Guide
                        </h3>
                        <p className="text-white/90 text-sm font-poppins">Building Your NE Startup</p>
                      </div>
                      
                      {/* Best Seller Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-lg shadow-lg">
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            BEST SELLER
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Book Info & Buying Links */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 lg:space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent mb-4">
                    The 6-Month Guide to Building Your NE Startup
                  </h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed font-poppins">
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
                  <span className="text-slate-600 font-medium font-poppins">4.8/5 (127 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-slate-900 font-montserrat">₹199</span>
                    <span className="text-lg text-slate-500 line-through font-poppins">₹499</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-full text-sm font-medium font-poppins">
                      45% OFF
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-2 font-poppins">Instant digital access</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    "Step-by-step 6-month plan",
                    "Funding strategies for NE startups",
                    "Checklist for Action items",
                    "Startup Tools and Schemes"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                      <span className="text-slate-700 text-sm font-poppins">{feature}</span>
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
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now on Amazon
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>

                  <motion.button
                    onClick={() => setShowPreview(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-3 border-2 border-red-200 text-red-700 px-8 py-4 rounded-2xl font-semibold hover:bg-red-50 transition-all duration-300 font-poppins"
                  >
                    <BookOpen className="w-5 h-5" />
                    Preview Book
                  </motion.button>
                </div>

                
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal />

      {/* Add the CSS styles */}
      <style >{`
        .book {
          position: relative;
          border-radius: 12px;
          width: 260px;
          height: 350px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transform-style: preserve-3d;
          perspective: 2000px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .book:hover {
          transform: rotateZ(-8deg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .cover,
        .inner {
          top: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          backface-visibility: hidden;
        }

        .book:hover .cover {
          transform: rotateY(-70deg) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }

        .book:hover .inner {
          transform: rotateZ(10deg) rotateX(-3deg) rotateY(-10deg) translateX(150px) translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .book {
            width: 220px;
            height: 300px;
          }
          
          .book:hover .inner {
            transform: rotateZ(8deg) rotateX(-2deg) rotateY(-8deg) translateX(120px) translateY(-5px);
          }
        }

        /* Large screen optimizations */
        @media (min-width: 1024px) {
          .book {
            width: 300px;
            height: 400px;
          }
          
          .book:hover .inner {
            transform: rotateZ(10deg) rotateX(-3deg) rotateY(-10deg) translateX(180px) translateY(-10px);
          }
        }
      `}</style>
    </>
  );
};

export default CombinedBookShowcase;