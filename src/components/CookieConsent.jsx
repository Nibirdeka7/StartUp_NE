import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Shield, Eye } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven) {
      // Small delay to let page load first
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = (type = 'all') => {
    localStorage.setItem('cookieConsent', type);
    
    // Store detailed preferences
    const preferences = {
      necessary: true,
      analytics: type === 'all' || type === 'essential',
      functional: type === 'all' || type === 'essential',
      marketing: type === 'all'
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    setIsVisible(false);
    
    // Trigger any analytics initialization if accepted
    if (type === 'all' || type === 'essential') {
      console.log('Cookies accepted:', type);
      // Initialize analytics here if needed
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    
    // Only allow necessary cookies
    const preferences = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    setIsVisible(false);
    console.log('Non-essential cookies rejected');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Backdrop for mobile - prevents interaction with page content */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 md:bg-transparent md:backdrop-blur-0"
          onClick={handleClose}
        />
      )}

      {/* Cookie Banner - Mobile Optimized */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom-5 duration-300 md:inset-x-auto md:bottom-6 md:right-6 md:max-w-md">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-t-2xl md:rounded-2xl shadow-2xl shadow-black/30 border border-slate-800/50 backdrop-blur-lg">
          
          {/* Header with gradient accent */}
          <div className="relative pt-6 px-6 pb-4 border-b border-slate-800/50">
            {/* Red gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-700 rounded-t-2xl" />
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-800/30 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 font-montserrat">
                    Your Privacy Matters
                  </h3>
                  <p className="text-sm text-slate-300">
                    We use cookies to enhance your experience
                  </p>
                </div>
              </div>
              
              {/* Close Button - Desktop */}
              <button
                onClick={handleClose}
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                aria-label="Close cookie consent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-slate-200 mb-6 leading-relaxed">
              We use essential cookies for the site to work, and optional cookies to analyze traffic, 
              personalize content, and improve your experience. You can choose which cookies to accept.
            </p>

            {/* Cookie Types Quick Info - Mobile Accordion Style */}
            <div className="space-y-3 mb-6 md:hidden">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <Shield className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">Essential - Always active</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <Eye className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">Analytics - Understand usage</span>
              </div>
            </div>

            {/* Action Buttons - Mobile Optimized Layout */}
            <div className="space-y-3">
              {/* Accept All - Primary CTA */}
              <Button
                onClick={() => handleAccept('all')}
                className="w-full h-12 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold rounded-lg shadow-lg shadow-red-900/20 transition-all hover:shadow-xl hover:shadow-red-900/30 active:scale-[0.98]"
                size="lg"
              >
                <Cookie className="w-4 h-4 mr-2" />
                Accept All Cookies
              </Button>

              {/* Secondary Options Row */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleAccept('essential')}
                  variant="outline"
                  className="h-11 border-slate-700 hover:border-slate-600 hover:bg-slate-800/30 text-slate-300 rounded-lg"
                  size="lg"
                >
                  Essential Only
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="h-11 border-slate-700 hover:border-slate-600 hover:bg-slate-800/30 text-slate-300 rounded-lg"
                  size="lg"
                >
                  Reject All
                </Button>
              </div>

              {/* Customize Button */}
              <Button
                variant="ghost"
                asChild
                className="w-full h-11 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg"
                size="lg"
              >
                <Link to="/cookies" className="flex items-center justify-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize Settings
                </Link>
              </Button>
            </div>

            {/* Legal Links */}
            <div className="mt-6 pt-4 border-t border-slate-800/50">
              <p className="text-xs text-slate-400 text-center">
                By using our site, you agree to our{' '}
                <Link 
                  to="/terms" 
                  className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
                >
                  Terms
                </Link>{' '}
                and{' '}
                <Link 
                  to="/privacy" 
                  className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>
                . Learn more in our{' '}
                <Link 
                  to="/cookies" 
                  className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Close Button - Mobile (Bottom Sheet Style) */}
          <div className="md:hidden p-4 border-t border-slate-800/50 bg-slate-900/50">
            <Button
              onClick={handleClose}
              variant="ghost"
              className="w-full h-11 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg"
              size="lg"
            >
              Decide Later
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Gesture Indicator (iPhone-style handle) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="w-12 h-1 bg-slate-700 rounded-full mb-2" />
      </div>
    </>
  );
}