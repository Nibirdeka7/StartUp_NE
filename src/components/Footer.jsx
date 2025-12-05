import { Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand - Full width on mobile, 2 cols on desktop */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg md:text-xl font-bold font-montserrat">Startup Northeast</span>
                <span className="text-xs text-red-400 font-poppins">Empowering Entrepreneurs</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-poppins">
              Empowering entrepreneurs across Northeast India with funding, mentorship, 
              and resources to build the next generation of innovative startups.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-3 md:mb-4 font-montserrat font-semibold text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm font-poppins">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-red-400 transition-colors py-1"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-red-400 transition-colors py-1"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/startups")}
                  className="hover:text-red-400 transition-colors py-1"
                >
                  Browse Startups
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/services")}
                  className="hover:text-red-400 transition-colors py-1"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/blog")}
                  className="hover:text-red-400 transition-colors py-1"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* For Startups */}
          <div>
            <h4 className="text-white mb-3 md:mb-4 font-montserrat font-semibold text-sm md:text-base">For Startups</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm font-poppins">
              <li>
                <button
                  onClick={() => navigate("/startups")}
                  className="hover:text-red-400 transition-colors py-1"
                >
                  List Your Startup
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors py-1">
                  Funding Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors py-1">
                  Mentorship Program
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("/connect")}
                  className="hover:text-red-400 transition-colors py-1"
                >
                  Connect Hub
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors py-1">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-3 md:mb-4 font-montserrat font-semibold text-sm md:text-base">Contact Us</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm font-poppins mb-4 md:mb-6">
              <li className="flex items-start gap-2">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <span>Guwahati, Assam<br />Northeast India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-red-400" />
                <a href="mailto:hello@startupne.in" className="hover:text-red-400 transition-colors">
                  hello@startupne.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 text-red-400" />
                <a href="tel:+911234567890" className="hover:text-red-400 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-2 md:gap-3">
              <a
                href="#"
                className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-800 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-3 h-3 md:w-4 md:h-4" />
              </a>
              <a
                href="#"
                className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-800 flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-3 h-3 md:w-4 md:h-4" />
              </a>
              <a
                href="#"
                className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-800 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
              </a>
              <a
                href="#"
                className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-800 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3 md:w-4 md:h-4" />
              </a>
              <a
                href="#"
                className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-800 flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-3 h-3 md:w-4 md:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs md:text-sm">
            <p className="text-slate-500 font-poppins text-center md:text-left">
              © 2025 Startup Northeast. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 font-poppins">
              <a href="#" className="text-slate-500 hover:text-red-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-red-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-red-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}