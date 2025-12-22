import { Button } from "../components/ui/Button";
import { ArrowRight, Sparkles, Play, Grid } from "lucide-react";
import { NEIndiaMap } from "../components/NEIndiaMap";
import { motion } from "motion/react";
import { GridBeam } from "./ui/GridBeam";

export function HeroSection({ onNavigate }) {
  return (
    
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-red-50 to-blue-50">
      {/* Background decorations */}
      <GridBeam className="sm:pl-16 pl-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
      </div>
      

      <div className="relative container mx-auto px-4 py-12 md:py-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-lg border border-red-200 shadow-lg">
            {/* <Sparkles className="w-5 h-5 text-red-600" /> */}
            <img src="Startup_NE.png" alt="Startup NE Logo" className="w-7 h-7"/>
            <span className="text-base font-medium text-slate-800 font-poppins">
              Empowering Northeast Innovation
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Heading */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-montserrat font-bold"
              >
                <span className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 bg-clip-text text-transparent">
                  Building the Future
                </span>
                <br />
                <span className="text-oxford-blue">
                  of Northeast India
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-700 max-w-2xl leading-relaxed font-poppins"
              >
                Join India's fastest-growing startup ecosystem. Get funding, mentorship, 
                and resources to scale your venture from the heart of Northeast.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={() => onNavigate("startups")}
                className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white shadow-2xl shadow-red-300 hover:shadow-3xl hover:shadow-red-400 transition-all duration-300 group font-poppins font-semibold px-8 py-6 text-lg rounded-2xl"
              >
                List Your Startup
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 hover:border-red-700 hover:bg-red-50 group font-poppins font-semibold px-8 py-6 text-lg rounded-2xl transition-all duration-300"
              >
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Watch Video
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-12 font-poppins"
            >
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent font-montserrat">
                  150+
                </div>
                <div className="text-lg text-slate-600 font-medium mt-2">Startups</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent font-montserrat">
                  ₹50Cr+
                </div>
                <div className="text-lg text-slate-600 font-medium mt-2">Funding</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent font-montserrat">
                  8
                </div>
                <div className="text-lg text-slate-600 font-medium mt-2">States</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >    
            <NEIndiaMap />
          </motion.div>
        </div>
      </div>
     
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      </GridBeam>
    </div>
     
    
  );
}


