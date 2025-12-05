import { useState } from "react";
import { Star, Quote, ChevronDown, User, Building2, Sparkles } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { motion, AnimatePresence } from "motion/react";

export function Testimonials() {
  const [expanded, setExpanded] = useState(false);

  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "Founder, AgroTech NE",
      company: "AgriTech Startup",
      content: "Startup Northeast helped us secure ₹5 Cr funding within 6 months. Their mentorship program transformed our business approach and connected us with the right investors.",
      rating: 5,
      location: "Guwahati, Assam",
      featured: true,
    },
    {
      name: "Priya Das",
      role: "CEO, Bamboo Innovations",
      company: "Sustainable Products",
      content: "The platform connected us with the right investors and provided legal support that saved us months of paperwork. Their team truly understands the Northeast startup ecosystem.",
      rating: 5,
      location: "Imphal, Manipur",
      featured: true,
    },
    {
      name: "Rajesh Meitei",
      role: "Co-Founder, HealthConnect NE",
      company: "HealthTech",
      content: "From pitch deck creation to investor meetings, every service exceeded our expectations. Highly recommended for any startup in Northeast India!",
      rating: 4,
      location: "Aizawl, Mizoram",
    },
    {
      name: "Sunita Khongwir",
      role: "Director, NE Craft Hub",
      company: "E-commerce Platform",
      content: "The startup community here is amazing. We've found mentors, partners, and investors all in one place. The networking events are particularly valuable.",
      rating: 5,
      location: "Shillong, Meghalaya",
    },
    {
      name: "Kiran Borah",
      role: "CTO, TechBridge Solutions",
      company: "Software Development",
      content: "The compliance and legal services saved us from costly mistakes. Their experts know the Northeast ecosystem deeply and provide tailored solutions.",
      rating: 5,
      location: "Dibrugarh, Assam",
    },
  ];

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const otherTestimonials = testimonials.filter(t => !t.featured);

  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 font-medium">Success Stories</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">
            What Founders Say About Us
          </h2>
          <p className="text-sm md:text-lg text-slate-700 max-w-2xl mx-auto font-poppins">
            Hear from entrepreneurs who've accelerated their journey with Startup Northeast
          </p>
        </motion.div>

        {/* Featured Testimonials (Always visible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="w-8 h-8 text-red-200" />
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 mb-6 font-poppins leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 font-montserrat">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600 font-poppins">{testimonial.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* More Testimonials Dropdown */}
        <div className="mb-8">
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-6">
                  {otherTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-5">
                          {/* Stars */}
                          <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Content */}
                          <p className="text-sm text-slate-700 mb-4 font-poppins line-clamp-4">
                            "{testimonial.content}"
                          </p>

                          {/* Author */}
                          <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                              <User className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-slate-900 truncate font-montserrat">{testimonial.name}</h4>
                              <p className="text-xs text-slate-600 truncate font-poppins">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <div className="text-center">
          <Button
            onClick={() => setExpanded(!expanded)}
            variant="outline"
            className="border-2 border-red-300 hover:border-red-600 hover:bg-red-50 text-red-700 font-poppins font-semibold px-6 py-3 rounded-xl transition-all duration-300 group"
          >
            {expanded ? "Show Less" : "View More Testimonials"}
            <ChevronDown 
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-slate-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1 font-montserrat">98%</div>
              <div className="text-sm text-slate-600 font-poppins">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1 font-montserrat">50+</div>
              <div className="text-sm text-slate-600 font-poppins">Success Stories</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1 font-montserrat">4.9★</div>
              <div className="text-sm text-slate-600 font-poppins">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1 font-montserrat">2x</div>
              <div className="text-sm text-slate-600 font-poppins">Growth Acceleration</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}