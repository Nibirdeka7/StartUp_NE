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
  Loader2,
  BarChart3,
  Grid,
  List,
  Star,
  Heart,
  Share2,
  Zap,
  Clock,
  Award,
  Building,
  ChevronDown,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { AuthModal } from "../components/AuthModal";
import { ListStartupModal } from "../components/ListStartupModal";

// Helper functions (keep as is)
const getStageColor = (stage) => {
  switch (stage?.toLowerCase()) {
    case "ideation": return "bg-blue-100 text-blue-800 border-blue-200";
    case "mvp": return "bg-purple-100 text-purple-800 border-purple-200";
    case "revenue": return "bg-green-100 text-green-800 border-green-200";
    case "series a+": return "bg-amber-100 text-amber-800 border-amber-200";
    case "acquired": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    default: return "bg-slate-100 text-slate-800 border-slate-200";
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
    case "foodtech": return "🍕";
    case "travel": return "✈️";
    case "logistics": return "🚚";
    case "ai/ml": return "🤖";
    default: return "🚀";
  }
};

const getStageIcon = (stage) => {
  switch (stage?.toLowerCase()) {
    case "ideation": return "💡";
    case "mvp": return "🔨";
    case "revenue": return "💰";
    case "series a+": return "📈";
    case "acquired": return "🏆";
    default: return "📊";
  }
};

// Startup Card Component (keep as is)
function StartupCard({ startup, viewMode = "grid" }) {
  const [imageError, setImageError] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  // Fetch logo URL
  useEffect(() => {
    const fetchLogoUrl = async () => {
      if (!startup?.logo_path) {
        setImageLoading(false);
        return;
      }
      
      if (startup.logo_path.startsWith('http')) {
        setLogoUrl(startup.logo_path);
        setImageLoading(false);
        return;
      }
      
      try {
        const { data } = supabase
          .storage
          .from('startup-logos')
          .getPublicUrl(startup.logo_path);
        
        if (data?.publicUrl) {
          setLogoUrl(data.publicUrl);
        } else {
          setLogoUrl(startup.logo_path);
        }
      } catch (error) {
        console.error("Error fetching logo URL:", error);
        setLogoUrl(startup.logo_path);
      } finally {
        setImageLoading(false);
      }
    };
    
    fetchLogoUrl();
  }, [startup?.logo_path]);

  // Grid View
  const GridView = () => (
    <Card className="border border-slate-200/80 hover:border-red-300 hover:shadow-2xl hover:shadow-red-100 transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm group overflow-hidden">
      <CardContent className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              {imageLoading ? (
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse border-2 border-slate-200 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 md:w-6 md:h-6 text-slate-300 animate-spin" />
                </div>
              ) : logoUrl && !imageError ? (
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-red-50 to-white p-1 border-2 border-red-100 group-hover:border-red-200 transition-colors">
                  <img
                    src={logoUrl}
                    alt={`${startup.name} logo`}
                    className="w-full h-full rounded-lg object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-200 flex items-center justify-center text-2xl shadow-inner">
                  {getSectorIcon(startup.sector)}
                </div>
              )}
            </div>
            
            {/* Name and Stage */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base md:text-lg font-bold text-slate-900 truncate group-hover:text-red-700 transition-colors">
                  {startup.name}
                </h3>
                <span className="text-xs text-slate-400">{getStageIcon(startup.stage)}</span>
              </div>
              <Badge className={`${getStageColor(startup.stage)} text-xs font-medium px-2 py-1 border`}>
                {startup.stage || "Pre-seed"}
              </Badge>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-slate-100 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-all delay-75"
              onClick={() => navigate(`/startup/${startup.id}`)}
            >
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm line-clamp-2 mb-4 font-poppins">
          {startup.description || "No description available"}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{startup.sector || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{startup.location || "Remote"}</span>
          </div>
          {startup.founded_year && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Founded {startup.founded_year}</span>
            </div>
          )}
          {startup.current_valuation && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              <span>{startup.current_valuation}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <Button
            onClick={() => navigate(`/startup/${startup.id}`)}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transition-all duration-300 text-sm font-semibold"
          >
            View Details
            <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          
          {startup.website && (
            <Button
              variant="outline"
              size="icon"
              className="border-slate-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                window.open(startup.website, '_blank');
              }}
              title="Visit Website"
            >
              <Globe className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            variant="outline"
            size="icon"
            className="border-slate-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              // Share functionality
              if (navigator.share) {
                navigator.share({
                  title: startup.name,
                  text: `Check out ${startup.name} on Startup Northeast`,
                  url: window.location.href,
                });
              }
            }}
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // List View (for mobile alternative)
  const ListView = () => (
    <Card className="border border-slate-200/80 hover:border-red-300 transition-all duration-300 bg-white/90 backdrop-blur-sm group">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            {imageLoading ? (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse border-2 border-slate-200 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
              </div>
            ) : logoUrl && !imageError ? (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-white p-1 border-2 border-red-100">
                <img
                  src={logoUrl}
                  alt={`${startup.name} logo`}
                  className="w-full h-full rounded-lg object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-200 flex items-center justify-center text-2xl">
                {getSectorIcon(startup.sector)}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-slate-900 truncate">
                {startup.name}
              </h3>
              <span className="text-xs text-slate-400 ml-1">{getStageIcon(startup.stage)}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${getStageColor(startup.stage)} text-xs font-medium px-2 py-0.5 border`}>
                {startup.stage || "Pre-seed"}
              </Badge>
              <span className="text-xs text-slate-500">{startup.sector}</span>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {startup.location || "Remote"}
              </span>
            </div>
          </div>
          
          {/* Action Button */}
          <Button
            size="sm"
            onClick={() => navigate(`/startup/${startup.id}`)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200"
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return viewMode === "list" ? <ListView /> : <GridView />;
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
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    sectors: [],
    locations: [],
    totalFunding: 0
  });
  
  // Auth state and modals
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isListStartupModalOpen, setIsListStartupModalOpen] = useState(false);

  const navigate = useNavigate();

  // Monitor Auth State
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

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
      const totalFunding = data?.reduce((sum, s) => sum + (parseInt(s.current_valuation?.replace(/[^0-9]/g, '') || 0)), 0);
      
      setStats({
        total: data?.length || 0,
        sectors: sectors,
        locations: locations.length,
        totalFunding: totalFunding
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
      case "valuation-high":
        result = [...result].sort((a, b) => {
          const valA = parseInt(a.current_valuation?.replace(/[^0-9]/g, '') || 0);
          const valB = parseInt(b.current_valuation?.replace(/[^0-9]/g, '') || 0);
          return valB - valA;
        });
        break;
    }

    setFilteredStartups(result);
  }, [searchQuery, sectorFilter, stageFilter, sortBy, startups]);

  // Handle List Startup Click - Replicates the Home component logic
  const handleListStartupClick = () => {
    if (!user) {
      setIsAuthModalOpen(true); // Force login if not authenticated
    } else {
      setIsListStartupModalOpen(true);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-blue-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              
              <span className="text-sm font-medium">Northeast India's Startup Ecosystem</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-montserrat tracking-tight">
              Discover <span className="text-yellow-300">Innovation</span> <br className="hidden md:block" />in the Northeast
            </h1>
            
            <p className="text-lg md:text-xl text-red-100 mb-8 md:mb-10 max-w-2xl mx-auto font-poppins leading-relaxed">
              Explore groundbreaking startups, connect with visionary founders, and be part of India's fastest-growing innovation hub.
            </p>
            
            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stats.total}</div>
                <div className="text-sm text-red-200">Startups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stats.sectors.length}</div>
                <div className="text-sm text-red-200">Sectors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stats.locations}</div>
                <div className="text-sm text-red-200">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">N/A</div>
                <div className="text-sm text-red-200">Investors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 -mt-8 md:-mt-12 relative">
        {/* Floating Search Card */}
        <Card className="sticky top-4 z-20 border-2 border-white/80 bg-white/95 backdrop-blur-xl shadow-2xl shadow-red-100/50 mb-8 md:mb-12">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search startups, sectors, locations..."
                    className="pl-12 pr-4 py-3 w-full rounded-xl border-slate-300 focus:border-red-300 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
              
              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                <Select value={sectorFilter} onValueChange={setSectorFilter}>
                  <SelectTrigger className="w-48 rounded-xl border-slate-300">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <span className="truncate">
                        {sectorFilter === "all" ? "All Sectors" : sectorFilter}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">All Sectors</SelectItem>
                    {uniqueSectors.map(sector => (
                      <SelectItem key={sector} value={sector} className="flex items-center gap-2">
                        {getSectorIcon(sector)} {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-48 rounded-xl border-slate-300">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="truncate">
                        {stageFilter === "all" ? "All Stages" : stageFilter}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">All Stages</SelectItem>
                    {uniqueStages.map(stage => (
                      <SelectItem key={stage} value={stage} className="flex items-center gap-2">
                        {getStageIcon(stage)} {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 rounded-xl border-slate-300">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Sort by</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                    <SelectItem value="valuation-high">Highest Valuation</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={`h-9 w-9 rounded-lg ${viewMode === "grid" ? 'bg-white shadow' : ''}`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={`h-9 w-9 rounded-lg ${viewMode === "list" ? 'bg-white shadow' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="md:hidden w-full rounded-xl border-slate-300"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {[searchQuery, sectorFilter, stageFilter, sortBy].filter(f => f && f !== "all" && f !== "newest").length}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Filters Dropdown */}
            {showMobileFilters && (
              <div className="md:hidden mt-4 p-4 bg-slate-50 rounded-xl space-y-4 animate-in slide-in-from-top">
                <div className="grid grid-cols-2 gap-3">
                  <Select value={sectorFilter} onValueChange={setSectorFilter}>
                    <SelectTrigger className="w-full">
                      <span className="text-sm">Sector</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      {uniqueSectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="w-full">
                      <span className="text-sm">Stage</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      {uniqueStages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <span className="text-sm">Sort by</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="name-asc">Name A-Z</SelectItem>
                      <SelectItem value="name-desc">Name Z-A</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="flex-1"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="flex-1"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-sm text-slate-600">
                      {filteredStartups.length} results
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-600">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {sectorFilter !== "all" && (
                    <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                      Sector: {sectorFilter}
                      <button onClick={() => setSectorFilter("all")} className="ml-1 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {stageFilter !== "all" && (
                    <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                      Stage: {stageFilter}
                      <button onClick={() => setStageFilter("all")} className="ml-1 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {sortBy !== "newest" && (
                    <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                      Sort: {sortBy}
                      <button onClick={() => setSortBy("newest")} className="ml-1 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Featured Startups
            </h2>
            <p className="text-slate-600 mt-1">
              {loading ? "Loading..." : `Showing ${filteredStartups.length} of ${startups.length} startups`}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <Zap className="w-4 h-4" />
            <span>Live updates</span>
          </div>
        </div>

        {/* Startups Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="relative">
                <div className="w-15 h-15 rounded-full bg-gradient-to-r from-red-100 to-red-400 animate-pulse mb-4 mx-auto flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-red-400" />
                  {/* <Loader2 className="w-20 h-20 animate-spin text-red "/> */}
                </div>
                {/* <div className="absolute inset-0 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div> */}
              </div>
              <h3 className="text-lg font-semibold  mt-4 text-gradient-to-r from-slate-100 to-slate-700 animate-pulse">Loading Startups</h3>
              <p className="text-slate-500">Fetching the latest innovations...</p>
            </div>
          </div>
        ) : filteredStartups.length === 0 ? (
          <Card className="text-center py-12 md:py-16 border-2 border-dashed border-slate-300 bg-gradient-to-br from-white to-slate-50/50">
            <CardContent>
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Building2 className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-700 mb-3">No startups found</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                {hasActiveFilters 
                  ? "Try adjusting your filters or search term to see more results."
                  : "Be the first to list your startup and join our growing ecosystem!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {hasActiveFilters && (
                  <Button 
                    onClick={handleClearFilters} 
                    variant="outline" 
                    className="border-slate-300 hover:border-red-300"
                  >
                    Clear filters
                  </Button>
                )}
                <Button 
                  onClick={handleListStartupClick}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  List Your Startup
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className={`${viewMode === "grid" ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'} gap-4 md:gap-6 mb-12`}>
              {filteredStartups.map((startup) => (
                <StartupCard 
                  key={startup.id} 
                  startup={startup} 
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Load More (if pagination needed) */}
            {filteredStartups.length > 12 && (
              <div className="text-center mb-12">
                <Button
                  variant="outline"
                  className="border-slate-300 hover:border-red-300 hover:bg-red-50 text-slate-700 hover:text-red-700 px-8 py-6 rounded-xl"
                >
                  Load More Startups
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-8 md:p-12 text-white shadow-2xl shadow-red-500/20">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-montserrat">
                Ready to Showcase Your Innovation?
              </h3>
              <p className="text-lg md:text-xl text-red-100 mb-6 md:mb-8 max-w-2xl mx-auto font-poppins leading-relaxed">
                Join 150+ startups already featured on Startup Northeast. Get visibility, connect with investors, and grow your business in India's fastest-growing ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleListStartupClick}
                  className="bg-white text-red-600 hover:bg-red-50 font-bold px-8 py-6 text-lg rounded-xl shadow-2xl shadow-white/20 hover:shadow-white/30 transition-all duration-300 group"
                >
                  List Your Startup Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                {/* <Button
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                  onClick={() => navigate("/investor")}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  I'm an Investor
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth and List Startup Modals */}
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
    </div>
  );
}