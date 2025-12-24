import { Button } from "../components/ui/Button";
import { ArrowRight, Play, Sparkles, MapPin, TrendingUp, Users, Target } from "lucide-react";
import { NEIndiaMap } from "../components/NEIndiaMap";
import { motion } from "motion/react";
import { GridBeam } from "./ui/GridBeam";

export function HeroSection({ onNavigate, onListStartupClick }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-blue-50/30">
      {/* Clean Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/10 via-transparent to-transparent" />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,transparent_70%)]" />
      
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <GridBeam className="sm:pl-16 pl-4">
        <div className="relative container mx-auto px-4 py-12 md:py-16 lg:py-20">
          {/* Minimal Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-red-200/50 shadow-sm">
              <div className="w-6 h-6 flex items-center justify-center">
                <img src="Startup_NE.png" alt="Startup NE Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-sm font-medium text-slate-800 font-poppins">
                Empowering Northeast Innovation
              </span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Clean Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Elegant Heading */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-700 font-poppins"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  Northeast India's Innovation Hub
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold tracking-tight"
                >
                  <span className="block bg-gradient-to-r from-red-800 to-red-900 bg-clip-text text-transparent">
                    Building the Future
                  </span>
                  <span className="block text-oxford-blue mt-2">
                    of Northeast India
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-poppins"
                >
                  Join India's fastest-growing startup ecosystem. Get funding, mentorship, 
                  and resources to scale your venture from the heart of Northeast.
                </motion.p>
              </div>

              {/* Clean CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Button
                  size="lg"
                  onClick={onListStartupClick}
                  className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-300/50 transition-all duration-300 font-poppins font-semibold px-8 py-6 rounded-xl"
                >
                  <span className="flex items-center gap-3">
                    List Your Startup
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("video")}
                  className="border-2 border-slate-200 hover:border-red-600 hover:bg-red-50/50 font-poppins font-semibold px-8 py-6 rounded-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </span>
                </Button>
              </motion.div>

              {/* Clean Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-4 pt-8 md:pt-12 border-t border-slate-100"
              >
                {[
                  { value: "150+", label: "Startups", color: "text-red-700" },
                  { value: "₹50Cr+", label: "Funding", color: "text-amber-700" },
                  { value: "8", label: "States", color: "text-blue-700" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-3xl md:text-4xl font-bold ${stat.color} font-montserrat mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 font-medium font-poppins">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Elegant Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Map Container */}
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/50 overflow-hidden">
                {/* Map Header */}
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="flex items-center justify-between p-3 bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200/50">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-slate-800">Startup Locations</span>
                    </div>
                    <div className="text-xs text-slate-500 px-2 py-1 bg-slate-100 rounded">
                      8 States
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="pt-16">
                  <NEIndiaMap />
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="flex items-center justify-between p-3 bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200/50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-xs text-slate-600">Startup Hubs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs text-slate-600">Active</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onNavigate("startups")}
                      className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      Explore →
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-3 -right-3"
              >
                <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-3 py-1.5 rounded-lg shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3 h-3" />
                    <span className="text-xs font-medium">Live Map</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 md:mt-16 pt-8 border-t border-slate-100"
          >
            <div className="max-w-2xl mx-auto text-center mb-4">
              <p className="text-sm text-slate-500 font-poppins mb-3">
                Trusted by innovators across Northeast India
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Founders", "Investors", "Mentors", "Corporates"].map((item) => (
                  <span 
                    key={item}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-red-200 hover:text-red-700 transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2  transform -translate-x-1/2 hidden lg:block"
          >
            <div className="flex flex-col items-center mt-3">
              <span className="text-xs text-slate-400 font-poppins  mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-8 rounded-full border border-slate-300 flex justify-center"
              >
                <div className="w-0.5 h-2 bg-slate-400 rounded-full mt-1.5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </GridBeam>
    </div>
  );
}