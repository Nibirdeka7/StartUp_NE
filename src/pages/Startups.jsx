// src/pages/StartupsPage.jsx
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { 
  Sparkles, 
  TrendingUp, 
  Search, 
  Filter, 
  Building2, 
  Users, 
  Target, 
  ArrowRight, 
  MapPin, 
  DollarSign,
  Briefcase,
  Calendar,
  Eye,
  ChevronRight,
  ExternalLink,
  X,
  Loader2
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";

// Helper functions moved outside the component so they can be accessed by StartupCard
const getStageColor = (stage) => {
  switch (stage?.toLowerCase()) {
    case "idea": return "bg-blue-100 text-blue-800";
    case "validation": return "bg-amber-100 text-amber-800";
    case "early": return "bg-green-100 text-green-800";
    case "growth": return "bg-purple-100 text-purple-800";
    case "scale": return "bg-red-100 text-red-800";
    default: return "bg-slate-100 text-slate-800";
  }
};

const getSectorIcon = (sector) => {
  switch (sector?.toLowerCase()) {
    case "agritech": return "🌾";
    case "healthtech": return "🏥";
    case "fintech": return "💳";
    case "edtech": return "📚";
    case "e-commerce": return "🛒";
    case "sustainability": return "♻️";
    default: return "🚀";
  }
};

// Startup Card Component - moved outside and made standalone
function StartupCard({ startup }) {
  const [imageError, setImageError] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Fetch logo URL
  useEffect(() => {
    const fetchLogoUrl = async () => {
      if (!startup?.logo_path) {
        setImageLoading(false);
        return;
      }
      
      // Check if it's already a Cloudinary URL
      if (startup.logo_path.startsWith('http')) {
        setLogoUrl(startup.logo_path);
        setImageLoading(false);
        return;
      }
      
      // Try to get from Supabase storage
      try {
        const { data } = supabase
          .storage
          .from('startup-logos')
          .getPublicUrl(startup.logo_path);
        
        if (data?.publicUrl) {
          setLogoUrl(data.publicUrl);
        } else {
          // Fallback to Cloudinary if Supabase URL doesn't work
          setLogoUrl(startup.logo_path);
        }
      } catch (error) {
        console.error("Error fetching logo URL:", error);
        // Fallback to Cloudinary URL
        setLogoUrl(startup.logo_path);
      } finally {
        setImageLoading(false);
      }
    };
    
    fetchLogoUrl();
  }, [startup?.logo_path]);

  return (
    <Card className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white group">
      <CardContent className="p-6 space-y-4">
        {/* Header with Logo and Basic Info */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 relative">
            {imageLoading ? (
              <div className="w-14 h-14 rounded-xl bg-slate-100 animate-pulse border-2 border-slate-200 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
              </div>
            ) : logoUrl && !imageError ? (
              <img
                src={logoUrl}
                alt={`${startup.name} logo`}
                className="w-14 h-14 rounded-xl object-cover border-2 border-slate-200"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoading(false)}
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-200 flex items-center justify-center text-2xl">
                {getSectorIcon(startup.sector)}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate group-hover:text-red-700">
                  {startup.name}
                </h3>
                <Badge className={getStageColor(startup.stage)}>
                  {startup.stage || "Pre-seed"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => window.location.href = `/startup/${startup.id}`}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm line-clamp-2">
          {startup.description || "No description available"}
        </p>

        {/* Details */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-sm">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span className="text-slate-700">{startup.sector || "Sector not specified"}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-slate-700">{startup.location || "Location not specified"}</span>
          </div>
          
          {startup.founders && startup.founders.length > 0 && (
            <div className="flex items-center gap-3 text-sm">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-slate-700">
                {startup.founders.length} founder{startup.founders.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <Button
            onClick={() => window.location.href = `/startup/${startup.id}`}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 gap-2"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          {startup.website && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(startup.website, '_blank');
              }}
              className="border-slate-300 hover:bg-slate-50"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Main StartupsPage Component
export function StartupsPage() {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [stats, setStats] = useState({
    total: 0,
    sectors: [],
    locations: []
  });

  // Fetch approved startups
  const fetchStartups = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .eq("is_approved", true)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setStartups(data || []);
      setFilteredStartups(data || []);
      
      // Calculate stats
      const sectors = [...new Set(data?.map(s => s.sector).filter(Boolean))];
      const locations = [...new Set(data?.map(s => s.location).filter(Boolean))];
      
      setStats({
        total: data?.length || 0,
        sectors: sectors,
        locations: locations.length
      });
    } catch (error) {
      console.error("Error fetching startups:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = startups;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query) ||
        s.sector?.toLowerCase().includes(query) ||
        s.location?.toLowerCase().includes(query)
      );
    }

    // Sector filter
    if (sectorFilter !== "all") {
      result = result.filter(s => s.sector === sectorFilter);
    }

    // Stage filter
    if (stageFilter !== "all") {
      result = result.filter(s => s.stage === stageFilter);
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        result = [...result].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    setFilteredStartups(result);
  }, [searchQuery, sectorFilter, stageFilter, sortBy, startups]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSectorFilter("all");
    setStageFilter("all");
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery || sectorFilter !== "all" || stageFilter !== "all" || sortBy !== "newest";

  // Get unique sectors and stages for filters
  const uniqueSectors = [...new Set(startups.map(s => s.sector).filter(Boolean))].sort();
  const uniqueStages = [...new Set(startups.map(s => s.stage).filter(Boolean))].sort();

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
          <Card className="border-2 border-slate-200 hover:border-red-300 transition-colors">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Startups</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-red-300 transition-colors">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Sectors</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">{stats.sectors.length}</p>
                </div>
                <Target className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-red-300 transition-colors">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Locations</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">{stats.locations}</p>
                </div>
                <MapPin className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-red-300 transition-colors">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Investors</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">30+</p>
                </div>
                <Users className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-2 border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search startups by name, sector, location, or description..."
                      className="pl-10 pr-4 py-3 w-full"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Select value={sectorFilter} onValueChange={setSectorFilter}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      {uniqueSectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="w-[140px]">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      {uniqueStages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <span className="text-sm">Sort by</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name-asc">Name A-Z</SelectItem>
                      <SelectItem value="name-desc">Name Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">
                      Showing {filteredStartups.length} of {startups.length} startups
                    </span>
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1">
                        Search: {searchQuery}
                        <button onClick={() => setSearchQuery("")} className="ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {sectorFilter !== "all" && (
                      <Badge variant="secondary" className="gap-1">
                        Sector: {sectorFilter}
                        <button onClick={() => setSectorFilter("all")} className="ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {stageFilter !== "all" && (
                      <Badge variant="secondary" className="gap-1">
                        Stage: {stageFilter}
                        <button onClick={() => setStageFilter("all")} className="ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Startups Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-red-600 mb-4" />
              <p className="text-slate-600">Loading startups...</p>
            </div>
          </div>
        ) : filteredStartups.length === 0 ? (
          <Card className="text-center py-16 border-2 border-dashed border-slate-300 bg-white/50">
            <CardContent>
              <Building2 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No startups found</h3>
              <p className="text-slate-500 mb-6">
                {hasActiveFilters 
                  ? "Try adjusting your filters or search term"
                  : "No approved startups available yet"}
              </p>
              {hasActiveFilters && (
                <Button onClick={handleClearFilters} variant="outline">
                  Clear all filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
        )}

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
              className="bg-white text-red-600 hover:bg-red-50 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
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