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
  CheckCircle
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
    case "idea": return "bg-blue-100 text-blue-800 border-blue-300";
    case "validation": return "bg-amber-100 text-amber-800 border-amber-300";
    case "early": return "bg-green-100 text-green-800 border-green-300";
    case "growth": return "bg-purple-100 text-purple-800 border-purple-300";
    case "scale": return "bg-red-100 text-red-800 border-red-300";
    default: return "bg-slate-100 text-slate-800 border-slate-300";
  }
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
  
  // 1. Admins can edit any startup
  if (currentUser.role === 'admin') return true;
  
  // 2. Only the user who created the startup can edit it
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
        // Get user's role from users table
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
      
      // Get current user with role
      const currentUser = await checkUser();
      
      // Check if user can edit (admin OR creator)
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
      
      // Reset file input
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
    
    // Reset file input
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
    
    // Reset file input
    if (documentInputRef.current) {
      documentInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Create a clean copy of updates
      const cleanUpdates = {};
      
      // Copy all form data
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        
        // Handle date fields
        if (['founded_date'].includes(key)) {
          cleanUpdates[key] = value && value.trim() !== '' ? value : null;
        } 
        // Handle string fields
        else if (typeof value === 'string') {
          cleanUpdates[key] = value.trim() !== '' ? value.trim() : null;
        }
        // Handle other types
        else {
          cleanUpdates[key] = value;
        }
      });
      
      // Add other fields
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

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setStartup(prev => ({ ...prev, ...cleanUpdates }));
      setEditMode(false);
      toast.success("Startup updated successfully!");
      
      await fetchStartup();
    } catch (error) {
      console.error("Error updating startup:", error);
      
      // More detailed error message
      let errorMessage = "Failed to update startup";
      if (error.code === '22007') {
        errorMessage = "Invalid date format. Please check date fields.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Add new founder
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

  // Remove founder
  const removeFounder = (index) => {
    setFounders(prev => prev.filter((_, i) => i !== index));
  };

  // Add tech stack item
  const addTechStack = () => {
    const newTech = prompt("Enter technology name:");
    if (newTech && newTech.trim()) {
      setTechStack(prev => [...prev, newTech.trim()]);
    }
  };

  // Add achievement
  const addAchievement = () => {
    const newAchievement = prompt("Enter achievement:");
    if (newAchievement && newAchievement.trim()) {
      setAchievements(prev => [...prev, newAchievement.trim()]);
    }
  };

  // Add press mention
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

  // Helper function for date input
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

  // Trigger file input click
  const triggerFileInput = (inputRef) => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-red-600 mb-4" />
          <p className="text-slate-600">Loading startup details...</p>
        </div>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50 to-blue-50">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Startup Not Found</h3>
          <p className="text-slate-500 mb-6">The startup you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/startups")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Startups
          </Button>
        </div>
      </div>
    );
  }

  const logoUrl = getLogoUrl();
  const isAdmin = userRole === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header with Back Button and Edit Toggle */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/startups")}
            className="gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Startups
          </Button>
          
          {canEdit && (
            <div className="flex items-center gap-3">
              {editMode ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditMode(false);
                      fetchStartup();
                    }}
                    className="gap-2"
                    disabled={saving}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="gap-2 bg-gradient-to-r from-green-600 to-green-800"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditMode(true)}
                  className="gap-2 bg-gradient-to-r from-red-600 to-red-800"
                >
                  <Edit2 className="w-4 h-4" />
                  {isAdmin ? 'Edit Startup (Admin)' : 'Edit Startup'}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Admin/Founder Notice */}
        {canEdit && !editMode && (
          <div className={`mb-6 p-4 rounded-lg border ${
            isAdmin 
              ? 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200' 
              : 'bg-gradient-to-r from-green-50 to-green-100 border-green-200'
          }`}>
            <div className="flex items-center gap-3">
              <Shield className={`w-5 h-5 ${isAdmin ? 'text-purple-600' : 'text-green-600'}`} />
              <div>
                <p className={`font-medium ${isAdmin ? 'text-purple-800' : 'text-green-800'}`}>
                  {isAdmin 
                    ? 'You are viewing as an Administrator' 
                    : 'You are the creator of this startup'}
                </p>
                <p className={`text-sm ${isAdmin ? 'text-purple-600' : 'text-green-600'}`}>
                  {isAdmin 
                    ? 'You can edit this startup\'s information' 
                    : 'You can edit your startup\'s information'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <Card className="border-2 border-slate-200 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 border-b border-slate-200">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Logo Section */}
                <div className="flex-shrink-0 relative group">
                  {logoUrl && !imageError ? (
                    <img
                      src={logoUrl}
                      alt={`${startup.name} logo`}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-200 to-red-300 border-4 border-white shadow-lg flex items-center justify-center text-4xl">
                      🚀
                    </div>
                  )}
                  
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
                          className="gap-2" 
                          disabled={logoUploading}
                          onClick={() => triggerFileInput(logoInputRef)}
                        >
                          {logoUploading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Camera className="w-4 h-4" />
                          )}
                          {logoUploading ? "Uploading..." : "Change Logo"}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Startup Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      {editMode ? (
                        <div className="space-y-4">
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Startup Name"
                            className="text-2xl font-bold h-12"
                          />
                          <Input
                            value={formData.tagline}
                            onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                            placeholder="Tagline (e.g., 'Revolutionizing Agriculture')"
                            className="text-lg"
                          />
                        </div>
                      ) : (
                        <>
                          <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            {startup.name}
                          </h1>
                          {startup.tagline && (
                            <p className="text-lg text-slate-700 italic mb-4">"{startup.tagline}"</p>
                          )}
                        </>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {editMode ? (
                          <div className="flex flex-wrap gap-2">
                            <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select Stage" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="idea">Idea Stage</SelectItem>
                                <SelectItem value="validation">Validation</SelectItem>
                                <SelectItem value="early">Early Stage</SelectItem>
                                <SelectItem value="growth">Growth Stage</SelectItem>
                                <SelectItem value="scale">Scale Stage</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                              <SelectTrigger className="w-40">
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
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <>
                            <Badge className={getStageColor(startup.stage)}>
                              {startup.stage || "Pre-seed"}
                            </Badge>
                            {startup.sector && (
                              <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-700">
                                {startup.sector}
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const shareUrl = window.location.href;
                          navigator.clipboard.writeText(shareUrl);
                          toast.success("Link copied to clipboard!");
                        }}
                        className="gap-2 border-slate-300"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6 pt-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="funding">Funding</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <>
                  {/* Description */}
                  <Card className="border-2 border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-red-600" />
                          About
                        </h2>
                        {editMode && (
                          <Badge variant="outline" className="border-green-300 text-green-700">
                            <Edit2 className="w-3 h-3 mr-1" />
                            Editable
                          </Badge>
                        )}
                      </div>
                      
                      {editMode ? (
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your startup in detail..."
                          className="min-h-[200px]"
                        />
                      ) : (
                        <p className="text-slate-700 whitespace-pre-line">
                          {startup.description || "No description available."}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Problem & Solution */}
                  <Card className="border-2 border-slate-200">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-red-600" />
                            Problem Statement
                          </h3>
                          {editMode ? (
                            <Textarea
                              value={formData.problem_statement}
                              onChange={(e) => setFormData(prev => ({ ...prev, problem_statement: e.target.value }))}
                              placeholder="What problem are you solving?"
                              className="min-h-[120px]"
                            />
                          ) : (
                            <p className="text-slate-700">{startup.problem_statement || "Not specified"}</p>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-green-600" />
                            Our Solution
                          </h3>
                          {editMode ? (
                            <Textarea
                              value={formData.solution}
                              onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                              placeholder="How are you solving this problem?"
                              className="min-h-[120px]"
                            />
                          ) : (
                            <p className="text-slate-700">{startup.solution || "Not specified"}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tech Stack */}
                  <Card className="border-2 border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">Tech Stack</h3>
                        {editMode && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={addTechStack}
                            className="gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Tech
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
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
                          <p className="text-slate-500">No tech stack listed</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Team Tab */}
              {activeTab === "team" && (
                <Card className="border-2 border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-slate-900">Team</h2>
                      {editMode && (
                        <Button onClick={addFounder} className="gap-2">
                          <UserPlus className="w-4 h-4" />
                          Add Founder
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      {founders.map((founder, index) => (
                        <div key={founder.id || index} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center flex-shrink-0">
                            <Users className="w-8 h-8 text-red-600" />
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            {editMode ? (
                              <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <Input
                                    value={founder.name}
                                    onChange={(e) => {
                                      const newFounders = [...founders];
                                      newFounders[index].name = e.target.value;
                                      setFounders(newFounders);
                                    }}
                                    placeholder="Full Name"
                                  />
                                  <Input
                                    value={founder.role}
                                    onChange={(e) => {
                                      const newFounders = [...founders];
                                      newFounders[index].role = e.target.value;
                                      setFounders(newFounders);
                                    }}
                                    placeholder="Role/Title"
                                  />
                                  <Input
                                    value={founder.linkedin}
                                    onChange={(e) => {
                                      const newFounders = [...founders];
                                      newFounders[index].linkedin = e.target.value;
                                      setFounders(newFounders);
                                    }}
                                    placeholder="LinkedIn URL"
                                  />
                                  <Input
                                    value={founder.email}
                                    onChange={(e) => {
                                      const newFounders = [...founders];
                                      newFounders[index].email = e.target.value;
                                      setFounders(newFounders);
                                    }}
                                    placeholder="Email"
                                    type="email"
                                  />
                                </div>
                                <Textarea
                                  value={founder.bio}
                                  onChange={(e) => {
                                    const newFounders = [...founders];
                                      newFounders[index].bio = e.target.value;
                                      setFounders(newFounders);
                                    }}
                                  placeholder="Short bio..."
                                  className="min-h-[80px]"
                                />
                              </>
                            ) : (
                              <>
                                <div>
                                  <h3 className="font-semibold text-slate-900">{founder.name}</h3>
                                  <p className="text-sm text-slate-600">{founder.role}</p>
                                  {founder.bio && (
                                    <p className="text-sm text-slate-700 mt-2">{founder.bio}</p>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-3">
                                  {founder.linkedin && (
                                    <a
                                      href={founder.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                      <Linkedin className="w-3 h-3" />
                                      LinkedIn
                                    </a>
                                  )}
                                  {founder.email && (
                                    <a
                                      href={`mailto:${founder.email}`}
                                      className="text-xs text-red-600 hover:underline flex items-center gap-1"
                                    >
                                      <Mail className="w-3 h-3" />
                                      Email
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
                      ))}
                      
                      {founders.length === 0 && (
                        <div className="text-center py-8">
                          <Users className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                          <p className="text-slate-500">No team information available</p>
                          {editMode && (
                            <p className="text-sm text-slate-400 mt-2">Add founders to showcase your team</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Gallery Tab */}
              {activeTab === "gallery" && (
                <Card className="border-2 border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-slate-900">Gallery</h2>
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
                            className="gap-2" 
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
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-red-600 mr-3" />
                        <p className="text-slate-600">Uploading images...</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.url}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {editMode && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
                          <ImageIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                          <p className="text-slate-500">No images in gallery</p>
                          {editMode && (
                            <p className="text-sm text-slate-400 mt-2">Upload images to showcase your startup</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Achievements Tab */}
              {activeTab === "achievements" && (
                <Card className="border-2 border-slate-200">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Achievements */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-600" />
                            Achievements
                          </h3>
                          {editMode && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={addAchievement}
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add Achievement
                            </Button>
                          )}
                        </div>
                        
                        <ul className="space-y-3">
                          {achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
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
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </li>
                          ))}
                          
                          {achievements.length === 0 && (
                            <div className="text-center py-8">
                              <Award className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                              <p className="text-slate-500">No achievements listed</p>
                              {editMode && (
                                <p className="text-sm text-slate-400 mt-2">Add your startup's achievements</p>
                              )}
                            </div>
                          )}
                        </ul>
                      </div>

                      {/* Press Mentions */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            Press Mentions
                          </h3>
                          {editMode && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={addPressMention}
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add Press
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          {pressMentions.map((mention, index) => (
                            <div key={index} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-slate-900">{mention.title}</p>
                                  <a
                                    href={mention.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Read article
                                  </a>
                                  {mention.date && (
                                    <p className="text-xs text-slate-500 mt-2">
                                      {new Date(mention.date).toLocaleDateString()}
                                    </p>
                                  )}
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
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {pressMentions.length === 0 && (
                            <div className="text-center py-8">
                              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                              <p className="text-slate-500">No press mentions</p>
                              {editMode && (
                                <p className="text-sm text-slate-400 mt-2">Add press articles about your startup</p>
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
                <Card className="border-2 border-slate-200">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {editMode ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Funding Round</Label>
                            <Input
                              value={formData.funding_round}
                              onChange={(e) => setFormData(prev => ({ ...prev, funding_round: e.target.value }))}
                              placeholder="e.g., Seed, Series A"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Amount Raised</Label>
                            <Input
                              value={formData.amount_raised}
                              onChange={(e) => setFormData(prev => ({ ...prev, amount_raised: e.target.value }))}
                              placeholder="e.g., $500K"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Investors</Label>
                            <Input
                              value={formData.funded_by}
                              onChange={(e) => setFormData(prev => ({ ...prev, funded_by: e.target.value }))}
                              placeholder="Investor names"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Current Valuation</Label>
                            <Input
                              value={formData.current_valuation}
                              onChange={(e) => setFormData(prev => ({ ...prev, current_valuation: e.target.value }))}
                              placeholder="e.g., $5M"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Revenue Model</Label>
                            <Textarea
                              value={formData.revenue_model}
                              onChange={(e) => setFormData(prev => ({ ...prev, revenue_model: e.target.value }))}
                              placeholder="Describe your revenue model..."
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-sm font-medium text-slate-700 mb-2 block">Traction Metrics</Label>
                            <Textarea
                              value={formData.traction_metrics}
                              onChange={(e) => setFormData(prev => ({ ...prev, traction_metrics: e.target.value }))}
                              placeholder="User growth, revenue, etc..."
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          {(startup.current_valuation || startup.funded_by || startup.amount_raised) && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {startup.current_valuation && (
                                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                  <p className="text-sm text-slate-600">Valuation</p>
                                  <p className="text-2xl font-bold text-slate-900">{startup.current_valuation}</p>
                                </div>
                              )}
                              {startup.amount_raised && (
                                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                  <p className="text-sm text-slate-600">Amount Raised</p>
                                  <p className="text-2xl font-bold text-slate-900">{startup.amount_raised}</p>
                                </div>
                              )}
                              {startup.funding_round && (
                                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                                  <BarChart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                  <p className="text-sm text-slate-600">Funding Round</p>
                                  <p className="text-2xl font-bold text-slate-900">{startup.funding_round}</p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="space-y-4">
                            {startup.funded_by && (
                              <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Investors</h3>
                                <p className="text-slate-700">{startup.funded_by}</p>
                              </div>
                            )}

                            {startup.revenue_model && (
                              <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Revenue Model</h3>
                                <p className="text-slate-700">{startup.revenue_model}</p>
                              </div>
                            )}

                            {startup.traction_metrics && (
                              <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Traction</h3>
                                <p className="text-slate-700">{startup.traction_metrics}</p>
                              </div>
                            )}

                            {!startup.current_valuation && !startup.funded_by && !startup.amount_raised && 
                             !startup.revenue_model && !startup.traction_metrics && (
                              <div className="text-center py-8">
                                <DollarSign className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-500">No funding information available</p>
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
                <Card className="border-2 border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-slate-900">Documents</h2>
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
                            className="gap-2" 
                            disabled={documentUploading}
                            onClick={() => triggerFileInput(documentInputRef)}
                          >
                            {documentUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Upload Documents
                          </Button>
                        </>
                      )}
                    </div>
                    
                    {documentUploading && (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-red-600 mr-3" />
                        <p className="text-slate-600">Uploading documents...</p>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-red-600" />
                            <div>
                              <p className="font-medium text-slate-900">{doc.name}</p>
                              <p className="text-sm text-slate-500">
                                {doc.size && `${(doc.size / 1024).toFixed(1)} KB`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                              title="Download"
                            >
                              <Download className="w-5 h-5" />
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
                                className="text-red-600 hover:text-red-700"
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
                          <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                          <p className="text-slate-500">No documents uploaded</p>
                          {editMode && (
                            <p className="text-sm text-slate-400 mt-2">Upload pitch decks, certificates, etc.</p>
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
              {/* Contact & Social */}
              <Card className="border-2 border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Contact & Social</h3>
                    {editMode && (
                      <Badge variant="outline" className="border-green-300 text-green-700 text-xs">
                        Editable
                      </Badge>
                    )}
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
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Email</Label>
                          <Input
                            value={formData.startup_email}
                            onChange={(e) => setFormData(prev => ({ ...prev, startup_email: e.target.value }))}
                            placeholder="contact@startup.com"
                            type="email"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Phone</Label>
                          <Input
                            value={formData.contact}
                            onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                            placeholder="+91 9876543210"
                            type="tel"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-slate-700">Social Links</Label>
                          <Input
                            value={socialLinks.linkedin}
                            onChange={(e) => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))}
                            placeholder="LinkedIn URL"
                            type="url"
                          />
                          <Input
                            value={socialLinks.twitter}
                            onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                            placeholder="Twitter/X URL"
                            type="url"
                          />
                          <Input
                            value={socialLinks.facebook}
                            onChange={(e) => setSocialLinks(prev => ({ ...prev, facebook: e.target.value }))}
                            placeholder="Facebook URL"
                            type="url"
                          />
                          <Input
                            value={socialLinks.instagram}
                            onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                            placeholder="Instagram URL"
                            type="url"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {startup.website && (
                          <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-slate-400" />
                            <a
                              href={startup.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Visit Website
                            </a>
                          </div>
                        )}
                        {startup.startup_email && (
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-slate-400" />
                            <a
                              href={`mailto:${startup.startup_email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {startup.startup_email}
                            </a>
                          </div>
                        )}
                        {startup.contact && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-700">{startup.contact}</span>
                          </div>
                        )}
                        <div className="flex gap-3 pt-3">
                          {startup.linkedin && (
                            <a
                              href={startup.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                              title="LinkedIn"
                            >
                              <Linkedin className="w-5 h-5 text-blue-600" />
                            </a>
                          )}
                          {startup.twitter && (
                            <a
                              href={startup.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition-colors"
                              title="Twitter/X"
                            >
                              <Twitter className="w-5 h-5 text-sky-600" />
                            </a>
                          )}
                          {startup.facebook && (
                            <a
                              href={startup.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                              title="Facebook"
                            >
                              <Facebook className="w-5 h-5 text-blue-600" />
                            </a>
                          )}
                          {startup.instagram && (
                            <a
                              href={startup.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-lg bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors"
                              title="Instagram"
                            >
                              <Instagram className="w-5 h-5 text-pink-600" />
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Location & Details */}
              <Card className="border-2 border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Details</h3>
                    {editMode && (
                      <Badge variant="outline" className="border-green-300 text-green-700 text-xs">
                        Editable
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-4">
                    {editMode ? (
                      <>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Location</Label>
                          <Input
                            value={formData.location}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="City, State"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Team Size</Label>
                          <Input
                            value={formData.team_size}
                            onChange={(e) => setFormData(prev => ({ ...prev, team_size: e.target.value }))}
                            placeholder="e.g., 5-10 employees"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Hiring Status</Label>
                          <Select value={formData.hiring_status} onValueChange={(value) => setFormData(prev => ({ ...prev, hiring_status: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="actively_hiring">Actively Hiring</SelectItem>
                              <SelectItem value="selective_hiring">Selective Hiring</SelectItem>
                              <SelectItem value="not_hiring">Not Hiring</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">Legal Entity</Label>
                          <Input
                            value={formData.legal_entity}
                            onChange={(e) => setFormData(prev => ({ ...prev, legal_entity: e.target.value }))}
                            placeholder="e.g., Private Limited"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {startup.location && (
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-700">{startup.location}</span>
                          </div>
                        )}
                        {startup.team_size && (
                          <div className="flex items-center gap-3">
                            <Users2 className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-700">Team: {startup.team_size}</span>
                          </div>
                        )}
                        {startup.hiring_status && (
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-700">
                              {startup.hiring_status === 'actively_hiring' ? 'Actively Hiring' :
                               startup.hiring_status === 'selective_hiring' ? 'Selective Hiring' :
                               'Not Hiring'}
                            </span>
                          </div>
                        )}
                        {startup.legal_entity && (
                          <div className="flex items-center gap-3">
                            <FileCheck className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-700">{startup.legal_entity}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-2 border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Founders</span>
                      <span className="font-semibold">{founders.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Gallery Images</span>
                      <span className="font-semibold">{galleryImages.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Achievements</span>
                      <span className="font-semibold">{achievements.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Documents</span>
                      <span className="font-semibold">{documents.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Last Updated</span>
                      <span className="font-semibold">
                        {startup.updated_at 
                          ? new Date(startup.updated_at).toLocaleDateString() 
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 gap-2"
                  onClick={() => window.location.href = `mailto:${startup.startup_email || ''}`}
                  disabled={!startup.startup_email}
                >
                  <Mail className="w-4 h-4" />
                  Contact Startup
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full gap-2 border-slate-300"
                  onClick={() => {
                    const shareUrl = window.location.href;
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Link copied to clipboard!");
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Share Profile
                </Button>
                
                {canEdit && !editMode && (
                  <Button 
                    variant="secondary"
                    className={`w-full gap-2 ${
                      isAdmin 
                        ? 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200'
                        : 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 hover:bg-green-200'
                    }`}
                    onClick={() => setEditMode(true)}
                  >
                    <Edit2 className="w-4 h-4" />
                    {isAdmin ? 'Edit as Admin' : 'Edit Startup'}
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