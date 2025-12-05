import { Button } from "../components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", page: "/" },
    { name: "About Us", page: "/about" },
    { name: "Services", page: "/services" },
    { name: "Startups", page: "/startup" },
    { name: "Blog", page: "/blogs" },
    { name: "Connect", page: "/connect" },
  ];

  // Helper to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-13 h-13 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-200 transition-shadow">
                <img src="/Startup_NE.png" alt="Startup Northeast Logo" />
              </div> 
            </div>
            <div className="flex flex-col items-start">
              <span className="font-montserrat font-bold text-oxford-blue text-lg">Startup</span>
              <span className="font-poppins text-xs text-red-600 -mt-1 font-medium">Northeast</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`px-4 py-2 rounded-lg transition-all font-poppins ${
                  isActive(link.page)
                    ? "bg-red-50 text-red-700 font-semibold"
                    : "text-oxford-blue hover:bg-gray-50 hover:text-oxford-blue/90"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/startups")}
              className="font-poppins border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
            >
              List Startup
            </Button>
            <Button 
              onClick={() => navigate("/services")}
              className="font-poppins bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200 text-white font-medium"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-oxford-blue hover:text-oxford-blue/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    navigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-left transition-all font-poppins ${
                    isActive(link.page)
                      ? "bg-red-50 text-red-700 font-semibold border-l-4 border-red-600"
                      : "text-oxford-blue hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-4 px-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate("/startups");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full font-poppins border-red-200 text-red-700 hover:bg-red-50"
                >
                  List Startup
                </Button>
                <Button 
                  onClick={() => {
                    navigate("/services");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full font-poppins bg-gradient-to-r from-red-600 to-red-700 text-white font-medium"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;