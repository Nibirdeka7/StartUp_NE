// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/textarea";
import {
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  MessageCircle,
  MapPin, 
  Briefcase, 
  Globe,
  User,
  Mail,
  Phone,
  ExternalLink,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Calendar,
  Building,
  DollarSign,
  Download as DownloadIcon,
  Shield
} from "lucide-react";
import { sendApprovalEmail, sendRejectionEmail } from '../utils/emailService';
export default function AdminDashboard() {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [dpiitFilter, setDpiitFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    dpiitRecognized: 0
  });

  // Fetch all startups
  const fetchStartups = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("startups")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching startups:", error.message);
    } else {
      setStartups(data || []);
      setFilteredStartups(data || []);
      calculateStats(data || []);
    }
    setLoading(false);
  };

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter(s => s.status === "pending").length;
    const approved = data.filter(s => s.status === "approved").length;
    const rejected = data.filter(s => s.status === "rejected").length;
    const dpiitRecognized = data.filter(s => s.dpiit_certificate_path).length;
    setStats({ total, pending, approved, rejected, dpiitRecognized });
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = startups;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.sector?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.startup_email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    // Sector filter
    if (sectorFilter !== "all") {
      filtered = filtered.filter(s => s.sector === sectorFilter);
    }

    // DPIIT filter
    if (dpiitFilter === "with_dpiit") {
      filtered = filtered.filter(s => s.dpiit_certificate_path);
    } else if (dpiitFilter === "without_dpiit") {
      filtered = filtered.filter(s => !s.dpiit_certificate_path);
    }

    setFilteredStartups(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, sectorFilter, dpiitFilter, startups]);

  // Get unique sectors
  const sectors = [...new Set(startups.map(s => s.sector).filter(Boolean))];

  // Pagination logic
  const totalPages = Math.ceil(filteredStartups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStartups = filteredStartups.slice(startIndex, endIndex);

  // Handle Approve/Reject
  const updateStatus = async (id, status, review = "") => {
  setUpdatingId(id);
  
  try {
    // First, get the startup details
    const { data: startup, error: fetchError } = await supabase
      .from("startups")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      throw new Error("Failed to fetch startup details");
    }

    const updates = {
      status,
      review,
      approved_at: status === "approved" ? new Date().toISOString() : null,
      is_approved: status === "approved",
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from("startups")
      .update(updates)
      .eq("id", id);

    if (error) {
      throw error;
    }

    // Send email notification based on status
    if (status === "approved") {
      // Get founder's name
      const founderName = startup.founders && startup.founders[0] 
        ? startup.founders[0].name 
        : "Founder";
      
      // console.log('Sending approval email to:', startup.startup_email);
      
      const emailResult = await sendApprovalEmail(
        startup.startup_email,
        startup.name,
        startup.id,
        founderName
      );
      
      if (emailResult.success) {
        console.alert('✅ Approval email sent successfully');
        // Show success toast/message
        // toast.success(`Startup approved! Email sent to ${startup.startup_email}`);
      } else {
        console.alert('❌ Failed to send approval email:', emailResult.error);
        // Show warning but continue
        // toast.warning(`Startup approved but email failed: ${emailResult.error}`);
      }
      
      // Also send to user's email if different from startup email
      if (startup.user_id) {
        const { data: user } = await supabase
          .from("users")
          .select("email")
          .eq("id", startup.user_id)
          .single();
        
        if (user && user.email !== startup.startup_email) {
          const userEmailResult = await sendApprovalEmail(
            user.email,
            startup.name,
            startup.id,
            founderName
          );
          
          if (!userEmailResult.success) {
            console.warn('Failed to send email to user:', userEmailResult.error);
          }
        }
      }
    } 
    else if (status === "rejected") {
      const founderName = startup.founders && startup.founders[0] 
        ? startup.founders[0].name 
        : "Founder";
      
      console.log('Sending rejection email to:', startup.startup_email);
      
      const emailResult = await sendRejectionEmail(
        startup.startup_email,
        startup.name,
        founderName,
        review,
        "Please review the feedback and consider reapplying with improvements."
      );
      
      if (emailResult.success) {
        // console.log('✅ Rejection email sent successfully');
        console.alert(`Startup rejected. Feedback sent to ${startup.startup_email}`);
      } else {
        console.alert('❌ Failed to send rejection email:', emailResult.error);
      }
    }

    // Refresh the list
    fetchStartups();
    
  } catch (err) {
    console.error("Error updating status:", err.message);
    toast.error(`Error: ${err.message}`);
  } finally {
    setUpdatingId(null);
    setSelectedStartup(null);
  }
};

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "ID", "Name", "Email", "Contact", "Location", "Sector", 
      "Stage", "Status", "DPIIT", "Created At", "Description"
    ];
    
    const csvData = startups.map(s => [
      s.id,
      s.name,
      s.startup_email,
      s.contact,
      s.location,
      s.sector,
      s.stage,
      s.status,
      s.dpiit_certificate_path ? "Yes" : "No",
      new Date(s.created_at).toLocaleDateString(),
      s.description?.replace(/,/g, ';')
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `startups_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // View startup details
  const ViewStartupModal = ({ startup, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">{startup.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  className={`
                    ${startup.status === "approved" ? "bg-green-100 text-green-700 border-green-300" :
                      startup.status === "rejected" ? "bg-red-100 text-red-700 border-red-300" :
                      "bg-yellow-100 text-yellow-700 border-yellow-300"}
                    text-xs sm:text-sm
                  `}
                >
                  {startup.status}
                </Badge>
                {startup.dpiit_certificate_path && (
                  <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs sm:text-sm">
                    <FileCheck className="w-3 h-3 mr-1" />
                    DPIIT Certified
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
            >
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">Founders</p>
                  <p className="font-medium text-sm sm:text-base truncate">
                    {startup.founders && Array.isArray(startup.founders) 
                      ? startup.founders.map(f => `${f.name} (${f.designation || 'Founder'})`).join(", ")
                      : "No founder info"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">Email</p>
                  <p className="font-medium text-sm sm:text-base truncate">{startup.startup_email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">Contact</p>
                  <p className="font-medium text-sm sm:text-base">{startup.contact || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">Location</p>
                  <p className="font-medium text-sm sm:text-base">{startup.location || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">Sector & Stage</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs">
                      {startup.sector || "N/A"}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-300 text-xs">
                      {startup.stage || "N/A"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">Current Valuation</p>
                  <p className="font-medium text-sm sm:text-base">{startup.current_valuation || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">Funded By</p>
                  <p className="font-medium text-sm sm:text-base">{startup.funded_by || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500">Website</p>
                  {startup.website ? (
                    <a 
                      href={startup.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline flex items-center gap-1 text-sm sm:text-base truncate"
                    >
                      {startup.website.replace(/^https?:\/\//, '')}
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    </a>
                  ) : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              Documents & Certificates
            </h3>
            <div className="space-y-3">
              {startup.logo_path && (
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm font-medium text-red-600">LOGO</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">Company Logo</p>
                      <p className="text-xs text-slate-500 truncate">Uploaded during registration</p>
                    </div>
                  </div>
                  <a 
                    href={startup.logo_path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 p-1 sm:p-2 flex-shrink-0"
                    title="View Logo"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              )}
              
              {startup.dpiit_certificate_path && (
                <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">DPIIT Certificate</p>
                      <p className="text-xs text-slate-500 truncate">Government recognized certificate</p>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                    <a 
                      href={startup.dpiit_certificate_path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 p-1 sm:p-2 hover:bg-blue-100 rounded"
                      title="View Certificate"
                    >
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    <a 
                      href={startup.dpiit_certificate_path} 
                      download={`${startup.name.replace(/\s+/g, '_')}_DPIIT_Certificate`}
                      className="text-blue-600 hover:text-blue-700 p-1 sm:p-2 hover:bg-blue-100 rounded"
                      title="Download Certificate"
                    >
                      <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  </div>
                </div>
              )}
              
              {!startup.dpiit_certificate_path && (
                <div className="text-center py-4 sm:py-6 border-2 border-dashed border-slate-300 rounded-lg">
                  <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm sm:text-base">No DPIIT Certificate uploaded</p>
                  <p className="text-xs text-slate-400 mt-1">Startup hasn't provided DPIIT recognition certificate</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg">Description</h3>
            <p className="text-slate-600 bg-slate-50 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
              {startup.description || "No description provided."}
            </p>
          </div>

          {startup.feedback && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg">User Feedback</h3>
              <p className="text-slate-600 bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200 text-sm sm:text-base">
                {startup.feedback}
              </p>
            </div>
          )}

          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg">Admin Review</h3>
            <Textarea
              placeholder="Add your review here..."
              defaultValue={startup.review || ""}
              id={`review-${startup.id}`}
              className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t">
            <Button
              onClick={() => updateStatus(
                startup.id,
                "approved",
                document.getElementById(`review-${startup.id}`)?.value || ""
              )}
              disabled={updatingId === startup.id}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
              size="sm"
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Approve Startup
            </Button>
            <Button
              onClick={() => updateStatus(
                startup.id,
                "rejected",
                document.getElementById(`review-${startup.id}`)?.value || ""
              )}
              disabled={updatingId === startup.id}
              variant="destructive"
              className="flex-1"
              size="sm"
            >
              <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Reject Startup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-blue-50 p-3 sm:p-4 md:p-6">
      {/* Mobile Header */}
      <div className="md:hidden mb-4">
        <h1 className="text-xl font-bold text-slate-900 font-montserrat">Startup Dashboard</h1>
        <p className="text-xs text-slate-600 font-poppins">Manage applications</p>
      </div>

      {/* Stats Cards - Mobile Responsive */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Total</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stats.total}</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Pending</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stats.pending}</p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Approved</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stats.approved}</p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Rejected</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stats.rejected}</p>
              </div>
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 col-span-2 md:col-span-1">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">DPIIT</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stats.dpiitRecognized}</p>
              </div>
              <FileCheck className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 font-montserrat">Startup Management Dashboard</h1>
        <p className="text-slate-600 font-poppins">Review and manage startup applications from Northeast India</p>
      </div>

      {/* Filters and Search - Mobile Responsive */}
      <Card className="mb-6 md:mb-8 bg-white/90 backdrop-blur-sm border-2 border-red-100 shadow-md">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-red-500"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10 sm:h-12 border-slate-300 focus:border-red-500 text-sm sm:text-base">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="h-10 sm:h-12 border-slate-300 focus:border-red-500 text-sm sm:text-base">
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector} className="text-sm sm:text-base">
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dpiitFilter} onValueChange={setDpiitFilter}>
              <SelectTrigger className="h-10 sm:h-12 border-slate-300 focus:border-red-500 text-sm sm:text-base">
                <FileCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <SelectValue placeholder="DPIIT" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Startups</SelectItem>
                <SelectItem value="with_dpiit">With DPIIT</SelectItem>
                <SelectItem value="without_dpiit">Without DPIIT</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
              <Button 
                onClick={fetchStartups}
                variant="outline" 
                className="h-10 sm:h-12 flex-1 border-slate-300 hover:bg-slate-50 text-sm sm:text-base"
                size="sm"
              >
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="hidden sm:inline">Refresh</span>
                <span className="sm:hidden">Refresh</span>
              </Button>
              <Button 
                onClick={exportToCSV}
                variant="outline" 
                className="h-10 sm:h-12 flex-1 border-slate-300 hover:bg-slate-50 text-sm sm:text-base"
                size="sm"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
                <span className="sm:hidden">CSV</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-slate-600">
          Showing {Math.min(startIndex + 1, filteredStartups.length)} to {Math.min(endIndex, filteredStartups.length)} of {filteredStartups.length} startups
        </div>
        {filteredStartups.length > 0 && (
          <div className="text-xs sm:text-sm text-slate-500">
            {stats.dpiitRecognized} startups with DPIIT recognition
          </div>
        )}
      </div>

      {/* Startups List */}
      {loading ? (
        <Card className="text-center py-8 sm:py-12">
          <CardContent>
            <RefreshCw className="w-8 h-8 sm:w-12 sm:h-12 animate-spin mx-auto text-red-600 mb-3 sm:mb-4" />
            <p className="text-slate-600 text-sm sm:text-base">Loading startups...</p>
          </CardContent>
        </Card>
      ) : filteredStartups.length === 0 ? (
        <Card className="text-center py-8 sm:py-12">
          <CardContent>
            <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-slate-300 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">No startups found</h3>
            <p className="text-slate-500 text-sm sm:text-base">No startups match your current filters.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSectorFilter("all");
                setDpiitFilter("all");
              }}
              className="mt-4"
              size="sm"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {paginatedStartups.map((startup) => (
            <Card 
              key={startup.id}
              className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 sm:hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 truncate">
                      {startup.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      <Badge
                        className={`
                          ${startup.status === "approved" ? "bg-green-100 text-green-700 border-green-300" :
                            startup.status === "rejected" ? "bg-red-100 text-red-700 border-red-300" :
                            "bg-yellow-100 text-yellow-700 border-yellow-300"}
                          text-xs
                        `}
                      >
                        {startup.status}
                      </Badge>
                      {startup.dpiit_certificate_path && (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs">
                          <FileCheck className="w-2.5 h-2.5 mr-1" />
                          DPIIT
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {new Date(startup.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStartup(startup)}
                    className="rounded-full h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 ml-2"
                  >
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-600 truncate">
                      {startup.location || "No location"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                    <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-700 text-xs">
                      {startup.sector || "No sector"}
                    </Badge>
                    <Badge variant="outline" className="border-purple-300 bg-purple-50 text-purple-700 text-xs">
                      {startup.stage || "No stage"}
                    </Badge>
                    {startup.current_valuation && (
                      <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700 text-xs">
                        <DollarSign className="w-2.5 h-2.5 mr-1" />
                        {startup.current_valuation}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-600">
                      {startup.founders && Array.isArray(startup.founders) 
                        ? `${startup.founders.length} founder${startup.founders.length !== 1 ? 's' : ''}`
                        : "No founder info"
                      }
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 line-clamp-2 text-xs sm:text-sm">
                  {startup.description || "No description provided."}
                </p>

                <div className="flex gap-2 pt-2 sm:pt-3 border-t border-slate-100">
                  <Button
                    onClick={() => setSelectedStartup(startup)}
                    className="flex-1 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 gap-2"
                    size="sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Review</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateStatus(startup.id, "approved")}
                      disabled={updatingId === startup.id || startup.status === "approved"}
                      variant="outline"
                      className="border-green-300 hover:bg-green-50 h-9 w-9 sm:h-10 sm:w-10 p-0"
                      title="Approve"
                    >
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(startup.id, "rejected")}
                      disabled={updatingId === startup.id || startup.status === "rejected"}
                      variant="outline"
                      className="border-red-300 hover:bg-red-50 h-9 w-9 sm:h-10 sm:w-10 p-0"
                      title="Reject"
                    >
                      <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination - Mobile Responsive */}
      {filteredStartups.length > itemsPerPage && (
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-slate-300 h-9 w-9 sm:h-10 sm:w-10 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 3) {
                pageNum = i + 1;
              } else if (currentPage <= 2) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 1) {
                pageNum = totalPages - 2 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }
              
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <Button
                    key={pageNum}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-9 w-9 sm:h-10 sm:w-10 ${
                      currentPage === pageNum
                        ? "bg-red-600 hover:bg-red-700"
                        : "border-slate-300"
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              }
              return null;
            }).filter(Boolean)}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-slate-300 h-9 w-9 sm:h-10 sm:w-10 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Selected Startup Modal */}
      {selectedStartup && (
        <ViewStartupModal 
          startup={selectedStartup} 
          onClose={() => setSelectedStartup(null)} 
        />
      )}
    </div>
  );
}