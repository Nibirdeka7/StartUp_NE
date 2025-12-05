import { StartupList } from "../components/StartupList";
import { Sparkles, TrendingUp, Search, Filter, Building2, Users, Target, ArrowRight, MapPin, DollarSign } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useState } from "react";

export function StartupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Startups");

  const categories = [
    { name: "All Startups", count: "150+", icon: Building2, color: "from-red-600 to-red-800" },
    { name: "AgriTech", count: "25+", icon: Target, color: "from-green-500 to-emerald-600" },
    { name: "HealthTech", count: "18+", icon: Users, color: "from-blue-500 to-cyan-600" },
    { name: "E-commerce", count: "32+", icon: TrendingUp, color: "from-purple-500 to-pink-600" },
    { name: "Sustainability", count: "22+", icon: Sparkles, color: "from-amber-500 to-orange-600" },
  ];

  const stats = [
    { value: "150+", label: "Active Startups", icon: Building2 },
    { value: "8", label: "Northeast States", icon: MapPin },
    { value: "₹50Cr+", label: "Total Funding", icon: DollarSign },
    { value: "30+", label: "Investors Network", icon: Users },
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    console.log("Category:", selectedCategory);
    // Add actual search functionality here
  };

  return (
    <div className="min-h-screen py-8 md:py-12 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 font-medium">Startup Ecosystem</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">
            Discover Northeast India Startups
          </h1>
          <p className="text-sm md:text-lg text-slate-700 max-w-2xl mx-auto font-poppins">
            Explore innovative startups, connect with founders, and find investment opportunities
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-slate-200 hover:border-red-300 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-montserrat">
                  {stat.value}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <div className="text-sm md:text-base text-slate-600 font-poppins">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        {/* <div className="max-w-4xl mx-auto mb-8 md:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-slate-200 p-4 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search startups by name, sector, or location..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300 font-poppins"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-300 hover:border-red-400 hover:bg-red-50 transition-all duration-300 font-poppins font-medium">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <Button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 font-poppins font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Category Filters */}
        {/* <div className="max-w-6xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 font-montserrat">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.name;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-red-400 bg-red-50 text-red-700 font-semibold shadow-sm"
                      : "border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-poppins whitespace-nowrap">{category.name}</span>
                  <span className="text-xs text-slate-500 whitespace-nowrap">({category.count})</span>
                </button>
              );
            })}
          </div>
        </div> */}

        {/* Startups List */}
        <div className="mb-12 md:mb-16">
          <StartupList searchQuery={searchQuery} category={selectedCategory} />
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 md:p-8 text-white text-center shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-montserrat">
              Have a Startup in Northeast India?
            </h3>
            <p className="text-red-100 mb-4 md:mb-6 max-w-2xl mx-auto font-poppins">
              Showcase your venture to investors, mentors, and potential customers. Join our growing ecosystem of innovative startups.
            </p>
            <Button 
              className=" text-red-400 hover:bg-red-50 hover:text-black font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = "/submit-startup"}
            >
              List Your Startup
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}