import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { MapPin, TrendingUp, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export function FeaturedStartups({ onNavigate }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);
  
  // Minimum swipe distance
  const minSwipeDistance = 50;

  const startups = [
    {
      name: "AgroTech NE",
      sector: "AgriTech",
      stage: "Series A",
      location: "Guwahati, Assam",
      funding: "₹5 Cr",
      description: "AI-powered solutions for Northeast farmers",
      logo: "🌾",
      id: "1fd404d3-25f5-4acd-a86c-4f51ca02b85d"
    },
    {
      name: "Bamboo Innovations",
      sector: "Sustainability",
      stage: "Seed",
      location: "Imphal, Manipur",
      funding: "₹1.5 Cr",
      description: "Eco-friendly bamboo products",
      logo: "🎋",
      id: "345"
    },
    {
      name: "HealthConnect NE",
      sector: "HealthTech",
      stage: "Seed",
      location: "Aizawl, Mizoram",
      funding: "₹3 Cr",
      description: "Telemedicine for remote areas",
      logo: "🏥",
      id: "567"
    },
    {
      name: "NE Craft Hub",
      sector: "E-commerce",
      stage: "Pre-Seed",
      location: "Shillong, Meghalaya",
      funding: "₹75 L",
      description: "Digital marketplace for handicrafts",
      logo: "🛍️",
      id: "879"
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? startups.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === startups.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Auto slide on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768) { // Only auto-slide on mobile
        handleNext();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <span className="text-sm text-red-800 font-medium">Featured Startups</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 font-montserrat">
            Meet Our Rising Stars
          </h2>
          <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto font-poppins px-4">
            Discover innovative startups that are transforming Northeast India's economy
          </p>
        </motion.div>

        {/* Mobile Slider Container */}
        <div className="relative md:hidden">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-300 shadow-lg flex items-center justify-center hover:bg-white transition-all"
            aria-label="Previous startup"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-300 shadow-lg flex items-center justify-center hover:bg-white transition-all"
            aria-label="Next startup"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {startups.map((startup, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-sm group">
                      <CardContent className="p-6 space-y-4">
                        {/* Logo */}
                        <div className="flex items-start justify-between">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-2xl shadow-sm group-hover:shadow-md transition-shadow">
                            {startup.logo}
                          </div>
                          <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                            {startup.stage}
                          </Badge>
                        </div>

                        {/* Content */}
                        <div>
                          <h3 className="text-xl text-slate-900 mb-2 group-hover:text-red-600 transition-colors font-semibold">
                            {startup.name}
                          </h3>
                          <p className="text-sm text-slate-600 mb-3">{startup.description}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs border-red-200 text-slate-700">
                            {startup.sector}
                          </Badge>
                          <Badge variant="outline" className="text-xs gap-1 border-red-200 text-slate-700">
                            <TrendingUp className="w-3 h-3" />
                            {startup.funding}
                          </Badge>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-sm text-slate-500 pt-2 border-t border-slate-100">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{startup.location}</span>
                        </div>

                        {/* Action */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 gap-2 group"
                          onClick={()=>navigate(`/startup/${startup.id}`)}
                        >
                          View Details
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
         
        </div>

        {/* Desktop Grid (unchanged) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {startups.map((startup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm group">
                <CardContent className="p-6 space-y-4">
                  {/* Logo */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-2xl shadow-sm group-hover:shadow-md transition-shadow">
                      {startup.logo}
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                      {startup.stage}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-slate-900 mb-1 group-hover:text-red-600 transition-colors font-semibold">
                      {startup.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">{startup.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs border-red-200 text-slate-700">
                      {startup.sector}
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1 border-red-200 text-slate-700">
                      <TrendingUp className="w-3 h-3" />
                      {startup.funding}
                    </Badge>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-slate-500 pt-2 border-t border-slate-100">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{startup.location}</span>
                  </div>

                  {/* Action */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 gap-2 group"
                    onClick={()=>navigate(`/startup/${startup.id}`)}
                  >
                    View Details
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-0"
        >
          <Button
            size="lg"
            onClick={() => navigate("/startups")}
            className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white shadow-lg md:shadow-2xl shadow-red-300 hover:shadow-3xl hover:shadow-red-400 transition-all duration-300 group font-poppins font-semibold px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-xl md:rounded-2xl"
          >
            Explore All Startups
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}