import { Button } from "../components/ui/Button";
import { ArrowRight, Play, MapPin, TrendingUp, Users, Target } from "lucide-react";
import { NEIndiaMap } from "../components/NEIndiaMap";
import { motion } from "motion/react";
import { GridBeam } from "./ui/GridBeam";
import { ContainerTextFlip } from "./ui/container-text-flip";
import { Highlight } from "./ui/hero-highlight";

export function HeroSection({ onNavigate, onListStartupClick }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-blue-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,transparent_70%)]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* <GridBeam className="sm:pl-10 pl-4"> */}
        <div className="relative container mx-auto px-4  md:py-12 lg:py-5">
          {/* Header Badge - Centered */}
          {/* <motion.div
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
              <div className="w-30 h-30 flex items-center justify-center">
                <img src="assam.png" alt="Startup NE Logo" className="w-full h-full object-contain" />
              </div>
              
          
          </motion.div> */}

          {/* Main Content - Better Alignment */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-20 items-start lg:items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6 lg:pr-8"
            >
              {/* Subheading */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 text-sm font-medium text-red-700 font-poppins"
              >
                <div className="w-2 h-2 rounded-full bg-red-500" />
                Northeast India's Innovation Hub
              </motion.div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold tracking-tight leading-tight"
                >
                  <span className="block bg-gradient-to-r from-red-800 to-red-900 bg-clip-text text-transparent">
                    <ContainerTextFlip words={["Building ", "Nurturing ", "Empowering "]} />
                   <span> the Future</span> 
                  </span>
                  <span className="block text-oxford-blue mt-1">
                    of Northeast India
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-slate-600 leading-relaxed font-poppins pr-0 lg:pr-8"
                >
                  Join India's fastest growing startup ecosystem.
                  <Highlight className="text-black dark:text-white"> Get funding, mentorship, and resources</Highlight>
                  to scale your venture from the heart of Northeast India.
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 pt-4"
              >
                <Button
                  size="lg"
                  onClick={onListStartupClick}
                  className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-300/50 transition-all duration-300 font-poppins font-semibold px-6 py-4 rounded-lg w-full sm:w-auto"
                >
                  <span className="flex items-center gap-2">
                    List Your Startup
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("video")}
                  className="border border-slate-200 hover:border-red-600 hover:bg-red-50/50 font-poppins font-semibold px-6 py-4 rounded-lg w-full sm:w-auto"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </span>
                </Button>
              </motion.div>

              {/* Stats Grid - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100"
              >
                {[
                  { value: "2000+", label: "Startups", color: "text-red-700" },
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
                    <div className={`text-2xl md:text-3xl font-bold ${stat.color} font-montserrat`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-600 font-medium font-poppins mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Map - Compact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-full flex items-center justify-center"
            >
              <div className="relative w-full h-[400px] lg:h-[500px]overflow-hidden">
                <div className="absolute inset-0 pt-10">
                  <div className="w-full h-full">
                    <NEIndiaMap />
                  </div>
                   <p className="mt-8 text-sm text-center text-gray-500">Click on the states to see details</p>
                </div>
              

                {/* Map Legend */}
               
                
              </div>
            </motion.div>
          </div>

          {/* Trust Badge - Centered at bottom */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 md:mt-12 pt-6 border-t border-slate-100"
          >
            <div className="max-w-md mx-auto text-center">
              <p className="text-xs text-slate-500 font-poppins mb-3">
                Trusted by innovators across Northeast India
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Founders", "Investors", "Mentors", "Corporates"].map((item) => (
                  <span 
                    key={item}
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 hover:border-red-200 hover:text-red-700 transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div> */}
        </div>
      {/* </GridBeam> */}
    </div>
  );
}