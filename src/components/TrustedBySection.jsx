import React from 'react';
import { motion } from "framer-motion";

const TrustedBySection = () => {
  const partners = [
    { 
      name: "StartupIndia", 
      logo: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 3V11H21V3H13M3 21H11V13H3V21M3 3V11H11V3H3M13 16H16V13H18V16H21V18H18V21H16V18H13V16Z"/>
        </svg>
      )
    },
    { 
      name: "Google", 
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      )
    },
    { 
      name: "Microsoft", 
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#f1511b" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
        </svg>
      )
    },
    { 
      name: "AWS", 
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#FF9900" d="M5.8 16.6c-.1-.1-.2-.2-.1-.4l.4-1.2c0-.1.1-.2.2-.2h2.2c.1 0 .2.1.2.2v5.4c0 .1-.1.2-.2.2h-1.5c-.1 0-.2-.1-.2-.2v-3.8zm3.4-2.3c0-.1.1-.2.2-.2h1.5c.1 0 .2.1.2.2v7.2c0 .1-.1.2-.2.2H9.4c-.1 0-.2-.1-.2-.2v-7.2zm3.3 3.6c0-.1.1-.2.2-.2h1.2l1.7 3.6 1.7-3.6h1.2c.1 0 .2.1.2.2v3.6c0 .1-.1.2-.2.2h-1.5c-.1 0-.2-.1-.2-.2v-2.6l-1.1 2.3c0 .1-.1.1-.2.1h-.8c-.1 0-.1 0-.2-.1l-1.1-2.3v2.6c0 .1-.1.2-.2.2h-1.5c-.1 0-.2-.1-.2-.2v-3.6z"/>
        </svg>
      )
    },
    { 
      name: "NASSCOM", 
      logo: (
        <svg className="w-6 h-6 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L1 21h22L12 2zm0 4.5l7.5 13.5h-15L12 6.5z"/>
        </svg>
      )
    },
    { 
      name: "Invest India", 
      logo: (
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="py-8 bg-white/50 backdrop-blur-sm border-y border-cyan-100 mt-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
            Trusted by leading organizations
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ 
              x: [0, -1200] 
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              }
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center mx-4 min-w-[160px] flex-shrink-0"
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-slate-50 to-cyan-50 border border-cyan-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                  {partner.logo}
                  <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;