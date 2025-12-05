import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/input";
import { Users, MessageCircle, Search, MapPin, Briefcase, UserPlus, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // Make sure to install framer-motion or adjust imports if using 'motion/react'

// Helper component for the notification/alert box
const DemoNotification = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl bg-yellow-500/90 text-white flex items-center gap-3 border-2 border-yellow-700 max-w-lg w-full"
  >
    <AlertTriangle className="w-6 h-6 flex-shrink-0" />
    <div>
      <h4 className="text-base font-semibold">Demo Mode Active (UI Only)</h4>
      <p className="text-sm">
        This is a **user interface preview** without any live connection functionality. We are working hard on implementing the features!
      </p>
    </div>
  </motion.div>
);

// The Main Demo Content (extracted for clarity)
const ConnectDemoContent = ({ entrepreneurs }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    {/* Header */}
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-red-200 shadow-sm mb-4">
        <Users className="w-4 h-4 text-red-600" />
        <span className="text-sm text-slate-700 font-poppins">Community Hub</span>
      </div>
      <h1 className="text-slate-900 mb-4 font-montserrat font-bold text-4xl">
        Connect with Entrepreneurs
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto font-poppins">
        Find co-founders, mentors, investors, and fellow entrepreneurs in Northeast India
      </p>
    </div>

    {/* Search and Filter */}
    <Card className="mb-12 bg-white/90 backdrop-blur-sm border-2 border-red-100 shadow-md">
      <CardContent className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by name, startup, skills, or interests..."
            className="pl-10 h-12 border-slate-300 focus:border-red-500"
          />
        </div>
      </CardContent>
    </Card>

    {/* Featured Sections */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 hover:shadow-xl transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-pink-700 flex items-center justify-center mx-auto shadow-lg">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-slate-900 font-semibold text-xl">Find a Co-founder</h3>
          <p className="text-sm text-slate-600">Connect with talented individuals looking to start ventures</p>
          <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
            Explore
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:shadow-xl transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mx-auto shadow-lg">
            <Users className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-slate-900 font-semibold text-xl">Join Communities</h3>
          <p className="text-sm text-slate-600">Participate in sector-specific founder communities</p>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
            Join Now
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 hover:shadow-xl transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-teal-700 flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-slate-900 font-semibold text-xl">Mentorship</h3>
          <p className="text-sm text-slate-600">Get guidance from experienced founders and mentors</p>
          <Button className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900">
            Find Mentor
          </Button>
        </CardContent>
      </Card>
    </div>

    {/* Entrepreneurs Grid */}
    <div>
      <h2 className="text-slate-900 mb-6 font-semibold text-3xl font-montserrat">Active Members</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrepreneurs.map((person) => (
          <Card
            key={person.id}
            className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white"
          >
            <CardContent className="p-6 space-y-4">
              {/* Avatar and Info */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {person.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-900 mb-1 font-semibold text-lg">{person.name}</h3>
                  <p className="text-sm text-slate-600 mb-1">{person.role}</p>
                  <p className="text-xs text-red-600 font-medium">{person.startup}</p>
                </div>
              </div>

              {/* Location and Sector */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-xs">{person.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  <span className="text-xs">{person.sector}</span>
                </div>
              </div>

              {/* Interests */}
              <div>
                <p className="text-xs text-slate-500 mb-2 font-medium">Interests:</p>
                <div className="flex flex-wrap gap-2">
                  {person.interests.map((interest, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="text-xs border-red-300 bg-red-50 text-red-700 font-medium"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Looking For */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2 font-medium">Looking for:</p>
                <Badge className="bg-blue-100 text-blue-700 border-blue-300 font-semibold">
                  {person.lookingFor}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Connect
                </Button>
                <Button variant="outline" size="sm" className="px-3 border-slate-300 hover:bg-slate-50">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* CTA Section */}
    <Card className="mt-12 bg-gradient-to-r from-red-700 to-red-900 border-0 text-white shadow-2xl shadow-red-300">
      <CardContent className="p-12 text-center">
        <h2 className="text-white mb-4 font-montserrat font-bold text-3xl">
          Ready to Grow Your Network?
        </h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto font-poppins">
          Join our community of 500+ entrepreneurs, investors, and mentors across Northeast India
        </p>
        <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-2xl font-semibold bg-white text-slate-800 hover:bg-slate-100">
          Create Your Profile
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

// The Full ConnectPage Component
export function ConnectPage() {
  const [showDemo, setShowDemo] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleDemoClick = () => {
    setShowDemo(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000); // Hide notification after 5 seconds
  };

  const entrepreneurs = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      startup: "AgroTech NE",
      location: "Guwahati, Assam",
      sector: "AgriTech",
      interests: ["AI", "Agriculture", "IoT"],
      lookingFor: "Co-founder (Tech)",
      avatar: "🌾",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Product Manager",
      startup: "Weave Northeast",
      location: "Shillong, Meghalaya",
      sector: "E-commerce",
      interests: ["Design", "Marketing", "Traditional Crafts"],
      lookingFor: "Marketing Partner",
      avatar: "🎨",
    },
    {
      id: 3,
      name: "Amit Deka",
      role: "CTO",
      startup: "HealthConnect NE",
      location: "Aizawl, Mizoram",
      sector: "HealthTech",
      interests: ["Mobile Development", "Healthcare", "Rural Tech"],
      lookingFor: "Operations Lead",
      avatar: "💻",
    },
    {
      id: 4,
      name: "Neha Bora",
      role: "Business Developer",
      startup: "EduNorth",
      location: "Itanagar, Arunachal Pradesh",
      sector: "EdTech",
      interests: ["Education", "Content", "Growth"],
      lookingFor: "Content Creator",
      avatar: "📚",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Startup Mentor",
      startup: "Independent",
      location: "Gangtok, Sikkim",
      sector: "Consulting",
      interests: ["Mentorship", "Strategy", "Funding"],
      lookingFor: "Mentees",
      avatar: "🎯",
    },
    {
      id: 6,
      name: "Ananya Das",
      role: "Angel Investor",
      startup: "NE Ventures",
      location: "Guwahati, Assam",
      sector: "Investment",
      interests: ["AgriTech", "Sustainability", "Early Stage"],
      lookingFor: "Investment Opportunities",
      avatar: "💼",
    },
  ];

  return (
    <div className="relative min-h-screen py-12 overflow-hidden bg-gradient-to-br from-white via-red-50 to-blue-50">
      
      {/* Background decorations from Hero Section theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
      </div>

      {showNotification && <DemoNotification />}
      
      <div className="relative container mx-auto px-4">
        {!showDemo ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-lg border border-red-200 shadow-lg mb-8">
              <Users className="w-6 h-6 text-red-600" />
              <span className="text-lg font-semibold text-slate-800 font-poppins">
                Community Connect
              </span>
            </div>
            <h1 className="text-slate-900 mb-4 font-montserrat font-bold text-5xl md:text-6xl">
              Under Development
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto mb-10 font-poppins">
              We're building a powerful, seamless connection platform for the Northeast ecosystem. Stay tuned for the official launch!
            </p>
            <Button
              size="lg"
              onClick={handleDemoClick}
              className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white shadow-2xl shadow-red-300 hover:shadow-3xl hover:shadow-red-400 transition-all duration-300 group font-poppins font-semibold px-8 py-6 text-lg rounded-2xl"
            >
              Have a Demo Here
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </motion.div>
        ) : (
          <ConnectDemoContent entrepreneurs={entrepreneurs} />
        )}
      </div>

      {/* Blob animation styles */}
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
    </div>
  );
}