// src/pages/StartupDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { uploadToCloudinary } from "../utils/cloudinary";
import { 
  ArrowLeft,
  MapPin,
  Briefcase,
  Users,
  Calendar,
  Globe,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ExternalLink,
  TrendingUp,
  DollarSign,
  Building2,
  Share2,
  Loader2,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  FileText,
  Award,
  Download,
  Upload,
  Camera,
  UserPlus,
  Target,
  BarChart,
  Heart,
  BookOpen,
  Users2,
  FileCheck,
  Star,
  Shield,
  CheckCircle,
  Sparkles,
  Zap,
  Eye,
  Flag,
  Clock,
  Award as Trophy,
  Target as Bullseye,
  PieChart,
  Layers,
  Cpu,
  GitBranch,
  Database,
  Cloud,
  Smartphone,
  Globe as Earth,
  MessageCircle,
  Send,
  Copy,
  ChevronRight,
  Bookmark,
  Bell,
  ThumbsUp,
  TrendingDown
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

// Helper functions
const getStageColor = (stage) => {
  switch (stage?.toLowerCase()) {
    case "ideation": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600";
    case "mvp": return "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-600";
    case "revenue": return "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600";
    case "series a+": return "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600";
    case "acquired": return "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-600";
    default: return "bg-gradient-to-r from-slate-500 to-slate-600 text-white border-slate-600";
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

const formatCurrency = (value) => {
  if (!value) return "N/A";
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return value;
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  return `₹${num.toLocaleString()}`;
};

// Date formatting helpers
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (error) {
    return "";
  }
};

const parseDateFromInput = (dateString) => {
  if (!dateString || dateString.trim() === "") return null;
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch (error) {
    return null;
  }
};

// Check if user can edit (admin OR creator)
const checkIfCanEdit = (startupData, currentUser) => {
  if (!currentUser || !startupData) return false;
  
  if (currentUser.role === 'admin') return true;
  return startupData.user_id === currentUser.id;
};

export function StartupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    sector: "",
    stage: "",
    location: "",
    website: "",
    startup_email: "",
    contact: "",
    current_valuation: "",
    funded_by: "",
    problem_statement: "",
    solution: "",
    traction_metrics: "",
    revenue_model: "",
    funding_round: "",
    amount_raised: "",
    team_size: "",
    hiring_status: "",
    founded_date: "",
    registration_number: "",
    legal_entity: "",
    partnerships: "",
    video_url: "",
    pitch_deck_url: "",
  });

  // Social links
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  // Arrays
  const [founders, setFounders] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [pressMentions, setPressMentions] = useState([]);
  const [techStack, setTechStack] = useState([]);

  // Upload states
  const [logoUploading, setLogoUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [documentUploading, setDocumentUploading] = useState(false);

  // File input refs
  const logoInputRef = useState(null);
  const galleryInputRef = useState(null);
  const documentInputRef = useState(null);

  useEffect(() => {
    const initialize = async () => {
      await checkUser();
      await fetchStartup();
    };
    initialize();
  }, [id]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        
        const role = userData?.role || 'user';
        setUserRole(role);
        return { ...user, role };
      }
      return null;
    } catch (error) {
      console.error("Error checking user:", error);
      return null;
    }
  };

  const fetchStartup = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Startup not found");

      setStartup(data);
      
      const currentUser = await checkUser();
      const canUserEdit = checkIfCanEdit(data, currentUser);
      setCanEdit(canUserEdit);

      // Initialize form data
      setFormData({
        name: data.name || "",
        tagline: data.tagline || "",
        description: data.description || "",
        sector: data.sector || "",
        stage: data.stage || "",
        location: data.location || "",
        website: data.website || "",
        startup_email: data.startup_email || "",
        contact: data.contact || "",
        current_valuation: data.current_valuation || "",
        funded_by: data.funded_by || "",
        problem_statement: data.problem_statement || "",
        solution: data.solution || "",
        traction_metrics: data.traction_metrics || "",
        revenue_model: data.revenue_model || "",
        funding_round: data.funding_round || "",
        amount_raised: data.amount_raised || "",
        team_size: data.team_size || "",
        hiring_status: data.hiring_status || "",
        founded_date: data.founded_date || "",
        registration_number: data.registration_number || "",
        legal_entity: data.legal_entity || "",
        partnerships: data.partnerships || "",
        video_url: data.video_url || "",
        pitch_deck_url: data.pitch_deck_url || "",
      });

      setSocialLinks({
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        linkedin: data.linkedin || "",
        twitter: data.twitter || "",
      });

      // Initialize arrays
      setFounders(Array.isArray(data.founders) ? data.founders : []);
      setGalleryImages(Array.isArray(data.gallery_images) ? data.gallery_images : []);
      setDocuments(Array.isArray(data.documents) ? data.documents : []);
      setAchievements(Array.isArray(data.achievements) ? data.achievements : []);
      setPressMentions(Array.isArray(data.press_mentions) ? data.press_mentions : []);
      setTechStack(Array.isArray(data.tech_stack) ? data.tech_stack : []);

    } catch (err) {
      console.error("Error fetching startup:", err.message);
      toast.error("Failed to load startup details");
    } finally {
      setLoading(false);
    }
  };

  const getLogoUrl = () => {
    if (!startup?.logo_path) return null;
    if (startup.logo_path.startsWith('http')) return startup.logo_path;
    
    const { data } = supabase
      .storage
      .from('startup-logos')
      .getPublicUrl(startup.logo_path);
    
    return data?.publicUrl || null;
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLogoUploading(true);
    try {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      toast.loading("Uploading logo...");
      const result = await uploadToCloudinary(file, 'startup-logos');
      
      const { error } = await supabase
        .from("startups")
        .update({ logo_path: result.url })
        .eq("id", id);

      if (error) throw error;
      
      setStartup(prev => ({ ...prev, logo_path: result.url }));
      toast.success("Logo updated successfully!");
      
      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo");
    } finally {
      setLogoUploading(false);
    }
  };

  const handleGalleryUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    setGalleryUploading(true);
    const newImages = [];

    for (const file of Array.from(files)) {
      try {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`);
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} exceeds 5MB limit`);
          continue;
        }

        const result = await uploadToCloudinary(file, 'startup-gallery');
        newImages.push({
          url: result.url,
          public_id: result.public_id,
          caption: "",
          uploaded_at: new Date().toISOString()
        });
        toast.success(`Uploaded ${file.name}`);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    if (newImages.length > 0) {
      setGalleryImages(prev => [...prev, ...newImages]);
    }
    setGalleryUploading(false);
    
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  const handleDocumentUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    setDocumentUploading(true);
    const newDocs = [];

    for (const file of Array.from(files)) {
      try {
        const result = await uploadToCloudinary(file, 'startup-documents');
        newDocs.push({
          url: result.url,
          public_id: result.public_id,
          name: file.name,
          type: file.type,
          size: file.size,
          uploaded_at: new Date().toISOString()
        });
        toast.success(`Uploaded ${file.name}`);
      } catch (error) {
        console.error("Error uploading document:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    if (newDocs.length > 0) {
      setDocuments(prev => [...prev, ...newDocs]);
    }
    setDocumentUploading(false);
    
    if (documentInputRef.current) {
      documentInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const cleanUpdates = {};
      
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (['founded_date'].includes(key)) {
          cleanUpdates[key] = value && value.trim() !== '' ? value : null;
        } else if (typeof value === 'string') {
          cleanUpdates[key] = value.trim() !== '' ? value.trim() : null;
        } else {
          cleanUpdates[key] = value;
        }
      });
      
      cleanUpdates.facebook = socialLinks.facebook?.trim() || null;
      cleanUpdates.instagram = socialLinks.instagram?.trim() || null;
      cleanUpdates.linkedin = socialLinks.linkedin?.trim() || null;
      cleanUpdates.twitter = socialLinks.twitter?.trim() || null;
      cleanUpdates.founders = founders;
      cleanUpdates.gallery_images = galleryImages;
      cleanUpdates.documents = documents;
      cleanUpdates.achievements = achievements;
      cleanUpdates.press_mentions = pressMentions;
      cleanUpdates.tech_stack = techStack;
      cleanUpdates.updated_at = new Date().toISOString();

      toast.loading("Saving changes...");
      const { error } = await supabase
        .from("startups")
        .update(cleanUpdates)
        .eq("id", id);

      if (error) throw error;

      setStartup(prev => ({ ...prev, ...cleanUpdates }));
      setEditMode(false);
      toast.success("Startup updated successfully!");
      
      await fetchStartup();
    } catch (error) {
      console.error("Error updating startup:", error);
      let errorMessage = "Failed to update startup";
      if (error.code === '22007') {
        errorMessage = "Invalid date format";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const addFounder = () => {
    setFounders(prev => [...prev, {
      id: Date.now().toString(),
      name: "",
      role: "",
      linkedin: "",
      bio: "",
      email: user?.email || "",
    }]);
  };

  const removeFounder = (index) => {
    setFounders(prev => prev.filter((_, i) => i !== index));
  };

  const addTechStack = () => {
    const newTech = prompt("Enter technology name:");
    if (newTech && newTech.trim()) {
      setTechStack(prev => [...prev, newTech.trim()]);
    }
  };

  const addAchievement = () => {
    const newAchievement = prompt("Enter achievement:");
    if (newAchievement && newAchievement.trim()) {
      setAchievements(prev => [...prev, newAchievement.trim()]);
    }
  };

  const addPressMention = () => {
    const title = prompt("Article title:");
    const url = prompt("Article URL:");
    if (title && url && title.trim() && url.trim()) {
      setPressMentions(prev => [...prev, { 
        title: title.trim(), 
        url: url.trim(),
        date: new Date().toISOString()
      }]);
    }
  };

  const DateInput = ({ label, value, onChange }) => (
    <div>
      <Label className="text-sm font-medium text-slate-700 mb-2 block">{label}</Label>
      <Input
        type="date"
        value={formatDateForInput(value)}
        onChange={(e) => onChange(parseDateFromInput(e.target.value))}
      />
    </div>
  );

  const triggerFileInput = (inputRef) => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: startup.name,
        text: `Check out ${startup.name} on Startup Northeast`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50/30 to-blue-50/30">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-red-200 animate-pulse mb-4 mx-auto flex items-center justify-center">
              <Building2 className="w-8 h-8 text-red-400" />
            </div>
            <div className="absolute inset-0 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mt-4">Loading Startup</h3>
          <p className="text-slate-500">Fetching details...</p>
        </div>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50/30 to-blue-50/30">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Startup Not Found</h3>
          <p className="text-slate-500 mb-6">The startup doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate("/startups")} 
            className="gap-2 bg-gradient-to-r from-red-600 to-red-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Startups
          </Button>
        </div>
      </div>
    );
  }

  const logoUrl = getLogoUrl();
  const isAdmin = userRole === 'admin';
  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-blue-50/30">
      {/* Floating Header - Mobile Optimized */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-lg shadow-red-100/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/startups")}
              className="gap-2 text-slate-700 hover:text-red-700 hover:bg-red-50 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            
            <div className="flex items-center gap-2">
              {!editMode && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`rounded-xl ${isBookmarked ? 'text-amber-500 hover:text-amber-600 bg-amber-50' : 'hover:bg-slate-100'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`rounded-xl ${isLiked ? 'text-red-500 hover:text-red-600 bg-red-50' : 'hover:bg-slate-100'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                </>
              )}
              
              {canEdit && !editMode && (
                <Button
                  onClick={() => setEditMode(true)}
                  className="gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-xl shadow-lg shadow-red-200"
                  size={isMobile ? "sm" : "default"}
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
              )}
              
              {editMode && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditMode(false);
                      fetchStartup();
                    }}
                    className="gap-2 rounded-xl border-slate-300"
                    disabled={saving}
                    size={isMobile ? "sm" : "default"}
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Cancel</span>
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="gap-2 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 rounded-xl shadow-lg shadow-green-200"
                    size={isMobile ? "sm" : "default"}
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">{saving ? "Saving" : "Save"}</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600/10 via-red-500/5 to-blue-500/5">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          <div className="max-w-7xl mx-auto">
            {/* Header Card */}
            <Card className="border-2 border-white/80 bg-white/90 backdrop-blur-xl shadow-2xl shadow-red-100/30 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Logo Section */}
                  <div className="relative group">
                    <div className="relative z-10">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-red-50 to-white p-3 border-4 border-white shadow-2xl shadow-red-200/50">
                        {logoUrl && !imageError ? (
                          <img
                            src={logoUrl}
                            alt={`${startup.name} logo`}
                            className="w-full h-full rounded-xl object-cover"
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-4xl">
                            {getSectorIcon(startup.sector)}
                          </div>
                        )}
                      </div>
                      
                      {editMode && (
                        <>
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                            disabled={logoUploading}
                            ref={el => logoInputRef.current = el}
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              size="sm" 
                              className="gap-2 bg-white text-slate-900 hover:bg-slate-100" 
                              disabled={logoUploading}
                              onClick={() => triggerFileInput(logoInputRef)}
                            >
                              {logoUploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Camera className="w-4 h-4" />
                              )}
                              {logoUploading ? "Uploading..." : "Change"}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Startup Info */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-3">
                        {editMode ? (
                          <div className="space-y-4">
                            <Input
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Startup Name"
                              className="text-2xl md:text-3xl font-bold h-12 rounded-xl"
                            />
                            <Input
                              value={formData.tagline}
                              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                              placeholder="Tagline (e.g., 'Revolutionizing Agriculture')"
                              className="text-lg rounded-xl"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                                {startup.name}
                              </h1>
                              <Sparkles className="w-5 h-5 text-amber-500 hidden md:block" />
                            </div>
                            {startup.tagline && (
                              <p className="text-lg md:text-xl text-slate-700 italic font-medium">
                                "{startup.tagline}"
                              </p>
                            )}
                          </>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {editMode ? (
                            <div className="flex flex-wrap gap-2">
                              <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                                <SelectTrigger className="w-40 rounded-xl border-slate-300">
                                  <SelectValue placeholder="Select Stage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ideation">Ideation</SelectItem>
                                  <SelectItem value="mvp">MVP</SelectItem>
                                  <SelectItem value="revenue">Revenue</SelectItem>
                                  <SelectItem value="series a+">Series A+</SelectItem>
                                  <SelectItem value="acquired">Acquired</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                                <SelectTrigger className="w-40 rounded-xl border-slate-300">
                                  <SelectValue placeholder="Select Sector" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="AgriTech">AgriTech</SelectItem>
                                  <SelectItem value="HealthTech">HealthTech</SelectItem>
                                  <SelectItem value="FinTech">FinTech</SelectItem>
                                  <SelectItem value="EdTech">EdTech</SelectItem>
                                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                                  <SelectItem value="Sustainability">Sustainability</SelectItem>
                                  <SelectItem value="DeepTech">DeepTech</SelectItem>
                                  <SelectItem value="Logistics">Logistics</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <>
                              <Badge className={`${getStageColor(startup.stage)} text-sm font-semibold px-3 py-1.5`}>
                                {getStageIcon(startup.stage)} {startup.stage || "Pre-seed"}
                              </Badge>
                              {startup.sector && (
                                <Badge variant="outline" className="border-blue-300 bg-blue-50/80 text-blue-700 px-3 py-1.5">
                                  {getSectorIcon(startup.sector)} {startup.sector}
                                </Badge>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Quick Stats - Desktop Only */}
                      <div className="hidden lg:grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-100">
                          <Users className="w-6 h-6 text-red-500 mx-auto mb-1" />
                          <div className="text-sm text-slate-600">Team Size</div>
                          <div className="font-bold text-slate-900">{startup.team_size || "N/A"}</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                          <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                          <div className="text-sm text-slate-600">Stage</div>
                          <div className="font-bold text-slate-900">{startup.stage || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats Bar - Mobile Optimized */}
            <div className="grid grid-cols-4 gap-2 mt-4 md:hidden">
              <div className="text-center p-2 bg-gradient-to-br from-red-50 to-white rounded-lg border border-red-100">
                <Users className="w-4 h-4 text-red-500 mx-auto mb-1" />
                <div className="text-xs text-slate-600">Team</div>
                <div className="text-sm font-bold text-slate-900">{startup.team_size || "N/A"}</div>
              </div>
              <div className="text-center p-2 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
                <MapPin className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <div className="text-xs text-slate-600">Location</div>
                <div className="text-sm font-bold text-slate-900 truncate">{startup.location || "N/A"}</div>
              </div>
              <div className="text-center p-2 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100">
                <Calendar className="w-4 h-4 text-green-500 mx-auto mb-1" />
                <div className="text-xs text-slate-600">Founded</div>
                <div className="text-sm font-bold text-slate-900">
                  {startup.founded_date ? new Date(startup.founded_date).getFullYear() : "N/A"}
                </div>
              </div>
              <div className="text-center p-2 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100">
                <DollarSign className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                <div className="text-xs text-slate-600">Funding</div>
                <div className="text-sm font-bold text-slate-900">
                  {startup.funding_round ? startup.funding_round.substring(0, 6) : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs Navigation - Modern */}
          <div className="sticky top-[64px] md:top-0 z-40 mb-6 bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/80 shadow-lg shadow-slate-100/50">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-transparent p-1">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="team"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <div className="flex items-center gap-2">
                    <Users2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Team</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Gallery</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="achievements"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span className="hidden sm:inline">Achievements</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="funding"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="hidden sm:inline">Funding</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="documents"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-slate-600 data-[state=active]:text-white rounded-lg py-3"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Docs</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Description Card */}
                  <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-100/30 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-red-50 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-red-600" />
                          </div>
                          <span>About the Startup</span>
                        </h2>
                        {editMode && (
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                            <Edit2 className="w-3 h-3 mr-1" />
                            Editing
                          </Badge>
                        )}
                      </div>
                      
                      {editMode ? (
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your startup in detail..."
                          className="min-h-[200px] rounded-xl border-slate-300 focus:border-red-300"
                        />
                      ) : (
                        <div className="prose prose-slate max-w-none">
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                            {startup.description || "No description available."}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Problem & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border border-slate-200/80 bg-gradient-to-br from-red-50/50 to-white backdrop-blur-sm shadow-lg shadow-red-100/20 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                            <Bullseye className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">Problem Statement</h3>
                            <p className="text-sm text-slate-500">What problem are we solving?</p>
                          </div>
                        </div>
                        
                        {editMode ? (
                          <Textarea
                            value={formData.problem_statement}
                            onChange={(e) => setFormData(prev => ({ ...prev, problem_statement: e.target.value }))}
                            placeholder="What problem are you solving?"
                            className="min-h-[120px] rounded-xl"
                          />
                        ) : (
                          <p className="text-slate-700">{startup.problem_statement || "Not specified"}</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border border-slate-200/80 bg-gradient-to-br from-green-50/50 to-white backdrop-blur-sm shadow-lg shadow-green-100/20 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">Our Solution</h3>
                            <p className="text-sm text-slate-500">How we're making a difference</p>
                          </div>
                        </div>
                        
                        {editMode ? (
                          <Textarea
                            value={formData.solution}
                            onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                            placeholder="How are you solving this problem?"
                            className="min-h-[120px] rounded-xl"
                          />
                        ) : (
                          <p className="text-slate-700">{startup.solution || "Not specified"}</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Tech Stack */}
                  <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-100/30 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">Tech Stack</h3>
                            <p className="text-sm text-slate-500">Technologies powering our solution</p>
                          </div>
                        </div>
                        {editMode && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={addTechStack}
                            className="gap-2 rounded-xl border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Plus className="w-4 h-4" />
                            Add Tech
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                            {tech === 'React' && '⚛️'}
                            {tech === 'Node.js' && '🟢'}
                            {tech === 'Python' && '🐍'}
                            {tech === 'AWS' && '☁️'}
                            {tech === 'MongoDB' && '🍃'}
                            {tech}
                            {editMode && (
                              <button
                                onClick={() => setTechStack(prev => prev.filter((_, i) => i !== index))}
                                className="ml-1 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                        
                        {techStack.length === 0 && !editMode && (
                          <div className="text-center w-full py-8">
                            <Cpu className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500">No tech stack listed</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Team Tab */}
              {activeTab === "team" && (
                <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-100/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 flex items-center justify-center">
                          <Users2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Team Members</h2>
                          <p className="text-sm text-slate-500">The brains behind the operation</p>
                        </div>
                      </div>
                      {editMode && (
                        <Button onClick={addFounder} className="gap-2 bg-gradient-to-r from-purple-600 to-purple-800">
                          <UserPlus className="w-4 h-4" />
                          Add Founder
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {founders.map((founder, index) => (
                        <Card key={founder.id || index} className="border border-slate-200 bg-gradient-to-br from-white to-slate-50/50 hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-200 to-purple-300 flex items-center justify-center flex-shrink-0">
                                <Users className="w-6 h-6 text-purple-700" />
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                {editMode ? (
                                  <div className="space-y-2">
                                    <Input
                                      value={founder.name}
                                      onChange={(e) => {
                                        const newFounders = [...founders];
                                        newFounders[index].name = e.target.value;
                                        setFounders(newFounders);
                                      }}
                                      placeholder="Full Name"
                                      className="rounded-lg"
                                    />
                                    <Input
                                      value={founder.role}
                                      onChange={(e) => {
                                        const newFounders = [...founders];
                                        newFounders[index].role = e.target.value;
                                        setFounders(newFounders);
                                      }}
                                      placeholder="Role/Title"
                                      className="rounded-lg"
                                    />
                                    <Textarea
                                      value={founder.bio}
                                      onChange={(e) => {
                                        const newFounders = [...founders];
                                        newFounders[index].bio = e.target.value;
                                        setFounders(newFounders);
                                      }}
                                      placeholder="Short bio..."
                                      className="min-h-[80px] rounded-lg"
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div>
                                      <h3 className="font-bold text-slate-900">{founder.name}</h3>
                                      <p className="text-sm text-purple-600 font-medium">{founder.role}</p>
                                      {founder.bio && (
                                        <p className="text-sm text-slate-700 mt-2">{founder.bio}</p>
                                      )}
                                    </div>
                                    <div className="flex gap-2">
                                      {founder.linkedin && (
                                        <a
                                          href={founder.linkedin}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                                          title="LinkedIn"
                                        >
                                          <Linkedin className="w-4 h-4 text-blue-600" />
                                        </a>
                                      )}
                                      {founder.email && (
                                        <a
                                          href={`mailto:${founder.email}`}
                                          className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                                          title="Email"
                                        >
                                          <Mail className="w-4 h-4 text-red-600" />
                                        </a>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                              
                              {editMode && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (window.confirm("Remove this founder?")) {
                                      removeFounder(index);
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {founders.length === 0 && (
                        <div className="col-span-2 text-center py-12">
                          <Users2 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Team Members</h3>
                          <p className="text-slate-500 mb-6">
                            {editMode ? "Add founders to showcase your team" : "Team information not available"}
                          </p>
                          {editMode && (
                            <Button onClick={addFounder} className="gap-2">
                              <UserPlus className="w-4 h-4" />
                              Add First Team Member
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gallery Tab */}
              {activeTab === "gallery" && (
                <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-100/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Gallery</h2>
                          <p className="text-sm text-slate-500">Visual showcase of our journey</p>
                        </div>
                      </div>
                      {editMode && (
                        <>
                          <input
                            id="gallery-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleGalleryUpload(e.target.files)}
                            disabled={galleryUploading}
                            ref={el => galleryInputRef.current = el}
                          />
                          <Button 
                            className="gap-2 bg-gradient-to-r from-green-600 to-green-800" 
                            disabled={galleryUploading}
                            onClick={() => triggerFileInput(galleryInputRef)}
                          >
                            {galleryUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Upload Images
                          </Button>
                        </>
                      )}
                    </div>
                    
                    {galleryUploading && (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
                          <p className="text-slate-600">Uploading images...</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative group aspect-square rounded-xl overflow-hidden">
                          <img
                            src={image.url}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          {editMode && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  if (window.confirm("Delete this image?")) {
                                    setGalleryImages(prev => prev.filter((_, i) => i !== index));
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {galleryImages.length === 0 && (
                        <div className="col-span-3 text-center py-12">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-green-300" />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Images Yet</h3>
                          <p className="text-slate-500 mb-6">
                            {editMode ? "Upload images to showcase your startup" : "Gallery is empty"}
                          </p>
                          {editMode && (
                            <Button 
                              className="gap-2"
                              onClick={() => triggerFileInput(galleryInputRef)}
                            >
                              <Upload className="w-4 h-4" />
                              Upload Your First Image
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Achievements Tab */}
              {activeTab === "achievements" && (
                <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-100/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      {/* Achievements Section */}
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 flex items-center justify-center">
                              <Trophy className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <h2 className="text-xl font-bold text-slate-900">Achievements</h2>
                              <p className="text-sm text-slate-500">Milestones and recognitions</p>
                            </div>
                          </div>
                          {editMode && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={addAchievement}
                              className="gap-2 rounded-xl border-amber-300 text-amber-600 hover:bg-amber-50"
                            >
                              <Plus className="w-4 h-4" />
                              Add Achievement
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {achievements.map((achievement, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50/50 to-white rounded-xl border border-amber-100">
                              <Star className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-slate-800">{achievement}</p>
                              </div>
                              {editMode && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (window.confirm("Remove this achievement?")) {
                                      setAchievements(prev => prev.filter((_, i) => i !== index));
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          
                          {achievements.length === 0 && (
                            <div className="text-center py-8">
                              <Trophy className="w-12 h-12 mx-auto text-amber-300 mb-4" />
                              <p className="text-slate-500">No achievements listed yet</p>
                              {editMode && (
                                <p className="text-sm text-slate-400 mt-2">Add your first achievement</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Press Mentions Section */}
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h2 className="text-xl font-bold text-slate-900">Press Mentions</h2>
                              <p className="text-sm text-slate-500">Media coverage and articles</p>
                            </div>
                          </div>
                          {editMode && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={addPressMention}
                              className="gap-2 rounded-xl border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              <Plus className="w-4 h-4" />
                              Add Press
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {pressMentions.map((mention, index) => (
                            <div key={index} className="p-4 bg-gradient-to-r from-blue-50/50 to-white rounded-xl border border-blue-100 hover:shadow-sm transition-shadow">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-medium text-slate-900 mb-2">{mention.title}</p>
                                  <div className="flex items-center gap-2">
                                    <a
                                      href={mention.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      Read article
                                    </a>
                                    {mention.date && (
                                      <span className="text-xs text-slate-500">
                                        • {new Date(mention.date).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {editMode && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      if (window.confirm("Remove this press mention?")) {
                                        setPressMentions(prev => prev.filter((_, i) => i !== index));
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {pressMentions.length === 0 && (
                            <div className="text-center py-8">
                              <BookOpen className="w-12 h-12 mx-auto text-blue-300 mb-4" />
                              <p className="text-slate-500">No press mentions yet</p>
                              {editMode && (
                                <p className="text-sm text-slate-400 mt-2">Add your first press mention</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Funding Tab */}
              {activeTab === "funding" && (
                <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-100/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      {editMode ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Current Valuation (in Cr)</Label>
                            <Input
                              value={formData.current_valuation}
                              onChange={(e) => setFormData(prev => ({ ...prev, current_valuation: e.target.value }))}
                              placeholder="e.g., ₹5 Crore"
                              className="rounded-xl"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Funding Round</Label>
                            <Input
                              value={formData.funding_round}
                              onChange={(e) => setFormData(prev => ({ ...prev, funding_round: e.target.value }))}
                              placeholder="e.g., Seed, Series A"
                              className="rounded-xl"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Amount Raised</Label>
                            <Input
                              value={formData.amount_raised}
                              onChange={(e) => setFormData(prev => ({ ...prev, amount_raised: e.target.value }))}
                              placeholder="e.g., $500K"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Investors</Label>
                            <Input
                              value={formData.funded_by}
                              onChange={(e) => setFormData(prev => ({ ...prev, funded_by: e.target.value }))}
                              placeholder="Investor names"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Revenue Model</Label>
                            <Textarea
                              value={formData.revenue_model}
                              onChange={(e) => setFormData(prev => ({ ...prev, revenue_model: e.target.value }))}
                              placeholder="Describe your revenue model..."
                              className="min-h-[100px] rounded-xl"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Traction Metrics</Label>
                            <Textarea
                              value={formData.traction_metrics}
                              onChange={(e) => setFormData(prev => ({ ...prev, traction_metrics: e.target.value }))}
                              placeholder="User growth, revenue, etc..."
                              className="min-h-[100px] rounded-xl"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Funding Stats Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {startup.current_valuation && (
                              <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                                      <DollarSign className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-slate-600">Current Valuation (in Cr)</p>
                                      <p className="text-xl font-bold text-slate-900">{formatCurrency(startup.current_valuation)}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                            
                            {startup.amount_raised && (
                              <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                      <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-slate-600">Amount Raised</p>
                                      <p className="text-xl font-bold text-slate-900">{formatCurrency(startup.amount_raised)}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                            
                            {startup.funding_round && (
                              <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                                      <BarChart className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <p className="text-sm text-slate-600">Funding Round</p>
                                      <p className="text-xl font-bold text-slate-900">{startup.funding_round}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </div>

                          {/* Details */}
                          <div className="space-y-6">
                            {startup.funded_by && (
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                  <Users className="w-5 h-5 text-slate-500" />
                                  Investors
                                </h3>
                                <p className="text-slate-700 bg-gradient-to-r from-slate-50 to-white p-4 rounded-xl border border-slate-200">
                                  {startup.funded_by}
                                </p>
                              </div>
                            )}

                            {startup.revenue_model && (
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                  <PieChart className="w-5 h-5 text-slate-500" />
                                  Revenue Model
                                </h3>
                                <p className="text-slate-700 bg-gradient-to-r from-slate-50 to-white p-4 rounded-xl border border-slate-200">
                                  {startup.revenue_model}
                                </p>
                              </div>
                            )}

                            {startup.traction_metrics && (
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                  <Zap className="w-5 h-5 text-slate-500" />
                                  Traction Metrics
                                </h3>
                                <p className="text-slate-700 bg-gradient-to-r from-slate-50 to-white p-4 rounded-xl border border-slate-200">
                                  {startup.traction_metrics}
                                </p>
                              </div>
                            )}

                            {!startup.current_valuation && !startup.funded_by && !startup.amount_raised && 
                             !startup.revenue_model && !startup.traction_metrics && (
                              <div className="text-center py-12">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
                                  <DollarSign className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">No Funding Info</h3>
                                <p className="text-slate-500">Funding information not available yet</p>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documents Tab */}
              {activeTab === "documents" && (
                <Card className="border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-100/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Documents</h2>
                          <p className="text-sm text-slate-500">Pitch decks, certificates, and more</p>
                        </div>
                      </div>
                      {editMode && (
                        <>
                          <input
                            id="document-upload"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => handleDocumentUpload(e.target.files)}
                            disabled={documentUploading}
                            ref={el => documentInputRef.current = el}
                          />
                          <Button 
                            className="gap-2 bg-gradient-to-r from-slate-600 to-slate-800" 
                            disabled={documentUploading}
                            onClick={() => triggerFileInput(documentInputRef)}
                          >
                            {documentUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Upload Docs
                          </Button>
                        </>
                      )}
                    </div>
                    
                    {documentUploading && (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 animate-spin text-slate-600 mx-auto mb-4" />
                          <p className="text-slate-600">Uploading documents...</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/50 to-white rounded-xl border border-slate-200 hover:shadow-sm transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-100 to-red-50 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{doc.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-slate-500">
                                  {doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : ''}
                                </span>
                                <span className="text-xs text-slate-500">•</span>
                                <span className="text-xs text-slate-500">
                                  {new Date(doc.uploaded_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                            {editMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (window.confirm("Delete this document?")) {
                                    setDocuments(prev => prev.filter((_, i) => i !== index));
                                  }
                                }}
                                className="p-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {documents.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
                            <FileText className="w-10 h-10 text-slate-300" />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Documents</h3>
                          <p className="text-slate-500 mb-6">
                            {editMode ? "Upload pitch decks, certificates, and other documents" : "No documents available"}
                          </p>
                          {editMode && (
                            <Button 
                              className="gap-2"
                              onClick={() => triggerFileInput(documentInputRef)}
                            >
                              <Upload className="w-4 h-4" />
                              Upload Your First Document
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="border border-slate-200/80 bg-gradient-to-br from-white to-red-50/30 backdrop-blur-sm shadow-lg shadow-red-100/20 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Contact Details</h3>
                      <p className="text-sm text-slate-500">Get in touch with the team</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {editMode ? (
                      <>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Website</Label>
                          <Input
                            value={formData.website}
                            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                            placeholder="https://example.com"
                            type="url"
                            className="rounded-xl"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Email</Label>
                          <Input
                            value={formData.startup_email}
                            onChange={(e) => setFormData(prev => ({ ...prev, startup_email: e.target.value }))}
                            placeholder="contact@startup.com"
                            type="email"
                            className="rounded-xl"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Phone</Label>
                          <Input
                            value={formData.contact}
                            onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                            placeholder="+91 9876543210"
                            type="tel"
                            className="rounded-xl"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {startup.website && (
                          <a
                            href={startup.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/50 to-white rounded-xl border border-blue-100 hover:shadow-sm transition-shadow"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                              <Globe className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-600">Website</p>
                              <p className="text-blue-600 font-medium truncate">{startup.website}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </a>
                        )}
                        
                        {startup.startup_email && (
                          <a
                            href={`mailto:${startup.startup_email}`}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50/50 to-white rounded-xl border border-red-100 hover:shadow-sm transition-shadow"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                              <Mail className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-600">Email</p>
                              <p className="text-red-600 font-medium truncate">{startup.startup_email}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </a>
                        )}
                        
                        {startup.contact && (
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50/50 to-white rounded-xl border border-green-100">
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                              <Phone className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-600">Phone</p>
                              <p className="text-slate-900 font-medium">{startup.contact}</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links Card */}
              <Card className="border border-slate-200/80 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm shadow-lg shadow-blue-100/20 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Social Links</h3>
                      <p className="text-sm text-slate-500">Follow their journey</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {editMode ? (
                      <div className="space-y-3">
                        <Input
                          value={socialLinks.linkedin}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))}
                          placeholder="LinkedIn URL"
                          type="url"
                          className="rounded-xl"
                        />
                        <Input
                          value={socialLinks.twitter}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                          placeholder="Twitter/X URL"
                          type="url"
                          className="rounded-xl"
                        />
                        <Input
                          value={socialLinks.facebook}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, facebook: e.target.value }))}
                          placeholder="Facebook URL"
                          type="url"
                          className="rounded-xl"
                        />
                        <Input
                          value={socialLinks.instagram}
                          onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                          placeholder="Instagram URL"
                          type="url"
                          className="rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {startup.linkedin && (
                          <a
                            href={startup.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 hover:shadow-sm transition-all hover:border-blue-300"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-2">
                              <Linkedin className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">LinkedIn</span>
                          </a>
                        )}
                        
                        {startup.twitter && (
                          <a
                            href={startup.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-white rounded-xl border border-sky-200 hover:shadow-sm transition-all hover:border-sky-300"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-center mb-2">
                              <Twitter className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Twitter</span>
                          </a>
                        )}
                        
                        {startup.facebook && (
                          <a
                            href={startup.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-200 hover:shadow-sm transition-all hover:border-indigo-300"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center mb-2">
                              <Facebook className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Facebook</span>
                          </a>
                        )}
                        
                        {startup.instagram && (
                          <a
                            href={startup.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-white rounded-xl border border-pink-200 hover:shadow-sm transition-all hover:border-pink-300"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center mb-2">
                              <Instagram className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Instagram</span>
                          </a>
                        )}
                        
                        {!startup.linkedin && !startup.twitter && !startup.facebook && !startup.instagram && (
                          <div className="col-span-2 text-center py-6">
                            <MessageCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                            <p className="text-slate-500 text-sm">No social links available</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className="border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/30 backdrop-blur-sm shadow-lg shadow-slate-100/20 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-white rounded-xl border border-slate-200">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-700">Team Members</span>
                      </div>
                      <span className="font-bold text-slate-900">{founders.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-white rounded-xl border border-slate-200">
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-700">Gallery Images</span>
                      </div>
                      <span className="font-bold text-slate-900">{galleryImages.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-white rounded-xl border border-slate-200">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-700">Achievements</span>
                      </div>
                      <span className="font-bold text-slate-900">{achievements.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-white rounded-xl border border-slate-200">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-700">Documents</span>
                      </div>
                      <span className="font-bold text-slate-900">{documents.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50/50 to-white rounded-xl border border-slate-200">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-700">Last Updated</span>
                      </div>
                      <span className="font-bold text-slate-900 text-xs">
                        {startup.updated_at 
                          ? new Date(startup.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleShare}
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 gap-3 py-6 rounded-xl shadow-lg shadow-red-200/50"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share This Profile</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full gap-3 py-6 rounded-xl border-slate-300 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  onClick={() => {
                    if (startup.startup_email) {
                      window.location.href = `mailto:${startup.startup_email}`;
                    } else {
                      toast.error("No email available");
                    }
                  }}
                >
                  <Send className="w-5 h-5" />
                  <span>Contact Startup</span>
                </Button>
                
                {canEdit && !editMode && (
                  <Button 
                    onClick={() => setEditMode(true)}
                    className={`w-full gap-3 py-6 rounded-xl ${
                      isAdmin 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                        : 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900'
                    }`}
                  >
                    <Edit2 className="w-5 h-5" />
                    <span>{isAdmin ? 'Edit as Admin' : 'Edit Startup'}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}