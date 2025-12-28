import { Button } from "../components/ui/Button";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthModal } from "./AuthModal";
import { ListStartupModal } from "./ListStartupModal";
import { supabase } from "../utils/supabaseClient";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isListStartupModalOpen, setIsListStartupModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const checkAdmin = async (currentUser) => {
    try {
      if (currentUser) {
        // Get user's role from users table
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', currentUser.id)
          .single();
        
        if (error) {
          console.error("Error fetching user role:", error);
          return;
        }
        
        setIsAdmin(userData?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  // Monitor Auth State
  useEffect(() => {
    const initializeAuth = async () => {
      // Check current session
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      checkAdmin(session?.user);
    };

    initializeAuth();

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkAdmin(currentUser);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: "Home", page: "/" },
    { name: "About Us", page: "/about" },
    { name: "Services", page: "/services" },
    { name: "Startups", page: "/startups" },
    { name: "Blog", page: "/blog" },
    { name: "Connect", page: "/connect" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleListStartupClick = () => {
    if (!user) {
      setIsAuthModalOpen(true); // Force login if not authenticated
    } else {
      setIsListStartupModalOpen(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
 
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
             <div className="relative">
               {/* <div className="w-13 h-13 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-200 transition-shadow"> */}
                 <img src="/Startup_NE.png" alt="Startup Northeast Logo" className="w-13 h-13"/>
               {/* </div> */}
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
                  isActive(link.page) ? "bg-red-50 text-red-700 font-semibold" : "text-oxford-blue hover:bg-gray-50"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Buttons / Profile Section */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleListStartupClick}
              className="font-poppins border-red-200 text-red-700 hover:bg-red-50"
            >
              List Startup
            </Button>

            {/* Admin Button - Only show if user is admin */}
            {isAdmin && (
              <Button
                onClick={() => navigate("/admin")}
                variant="ghost"
                className="font-poppins text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-200"
                title="Admin Dashboard"
              >
                <Settings size={18} className="mr-2" />
                Admin
              </Button>
            )}

            {!user ? (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="font-poppins bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-200"
              >
                Get Started
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 border border-red-200 hover:bg-red-200 transition-colors"
                  title="Profile"
                >
                  <User size={20} />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-oxford-blue" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {user && (
                <div className="px-4 py-2 mb-2 flex items-center gap-3 bg-slate-50 rounded-lg mx-2">
                  <User className="text-red-600" size={20} />
                  <span className="text-sm font-medium truncate">{user.email}</span>
                </div>
              )}
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => { navigate(link.page); setMobileMenuOpen(false); }}
                  className={`px-4 py-3 rounded-lg text-left font-poppins ${
                    isActive(link.page) ? "bg-red-50 text-red-700 font-semibold" : "text-oxford-blue"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              
              {/* Admin Link in Mobile Menu */}
              {isAdmin && (
                <button
                  onClick={() => { navigate("/admin"); setMobileMenuOpen(false); }}
                  className="px-4 py-3 rounded-lg text-left font-poppins text-purple-600 hover:bg-purple-50"
                >
                  <Settings size={18} className="inline mr-2" />
                  Admin Dashboard
                </button>
              )}
              
              <div className="flex flex-col gap-3 mt-4 px-4">
                <Button variant="outline" onClick={() => { handleListStartupClick(); setMobileMenuOpen(false); }}>
                  List Startup
                </Button>
                {!user ? (
                  <Button onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }} className="bg-red-600 text-white">
                    Get Started
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={handleLogout} className="text-red-600 justify-start px-0">
                    <LogOut size={18} className="mr-2" /> Sign Out
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onListStartup={() => setIsListStartupModalOpen(true)}
        onGoHome={() => navigate("/")}
      />

      <ListStartupModal
        isOpen={isListStartupModalOpen}
        onClose={() => setIsListStartupModalOpen(false)}
      />
    </nav>
  );
}

export default Navbar;