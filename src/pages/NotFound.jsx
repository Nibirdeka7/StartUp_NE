import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, LifeBuoy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StartupNortheast404() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 selection:bg-red-600 selection:text-white overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <main className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side: The Shattered Number & Icon */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative">
            {/* The "Shattered" 404 Background */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10rem] md:text-[16rem] font-black leading-none tracking-tighter text-zinc-900 flex"
            >
              4
              <motion.span 
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="text-red-600 inline-block px-2"
              >
                0
              </motion.span>
              4
            </motion.h1>

            {/* The Architectural Arrow/Pointer Icon (From the Design) */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <div className="w-32 h-32 border-2 border-zinc-200 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-red-600 rotate-45 flex items-center justify-center">
                   <div className="w-4 h-4 bg-red-600 animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Editorial Content */}
        <div className="w-full md:w-1/2 text-left space-y-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <span className="w-8 h-[2px] bg-red-600" />
              Route Terminated
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-950 font-montserrat tracking-tight leading-[0.9]">
              PAGE <br /> 
              <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 to-zinc-500">
                NOT FOUND
              </span>
            </h2>
          </div>

          <p className="text-zinc-500 text-lg md:text-xl font-poppins max-w-md leading-relaxed">
            The coordinates you requested lead to an uncharted territory. Let's redirect you back to the innovation hub.
          </p>

          {/* Professional Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={()=>navigate("/")}
              className="group relative px-8 py-4 bg-zinc-950 text-white rounded-lg overflow-hidden transition-all hover:bg-red-600"
            >
              <span className="relative z-10 font-bold uppercase text-[11px] tracking-widest flex items-center gap-3">
                Back to Home Page
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={()=>navigate("/contact")}
              className="px-8 py-4 border-2 border-zinc-200 text-zinc-900 rounded-lg font-bold uppercase text-[11px] tracking-widest flex items-center gap-3 hover:border-zinc-950 transition-colors"
            >
              <LifeBuoy className="w-4 h-4" />
              Contact Support
            </button>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-zinc-100 pt-8 opacity-40">
        <div className="flex items-center gap-4">
          <Globe className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">© 2025 Startup Northeast</span>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">
          Innovation · Nurture · Scale
        </div>
      </footer>
    </div>
  );
}