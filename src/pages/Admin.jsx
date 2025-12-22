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
import {Card, CardContent} from "../components/ui/Card";
import {Badge} from "../components/ui/Badge";
import {Input} from "../components/ui/Input";
import {Textarea} from "../components/ui/textarea";


 
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
  Users
} from "lucide-react";

export default function AdminDashboard() {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
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
    setStats({ total, pending, approved, rejected });
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
        s.location?.toLowerCase().includes(searchTerm.toLowerCase())
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

    setFilteredStartups(filtered);
  }, [searchTerm, statusFilter, sectorFilter, startups]);

  // Get unique sectors
  const sectors = [...new Set(startups.map(s => s.sector).filter(Boolean))];

  // Handle Approve/Reject
  const updateStatus = async (id, status, review = "") => {
    setUpdatingId(id);
    const updates = {
      status,
      review,
      approved_at: status === "approved" ? new Date().toISOString() : null,
      is_approved: status === "approved"
    };

    const { error } = await supabase
      .from("startups")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error.message);
    } else {
      fetchStartups();
    }
    setUpdatingId(null);
    setSelectedStartup(null);
  };

  // Handle bulk actions
  const handleBulkApprove = async (ids) => {
    const { error } = await supabase
      .from("startups")
      .update({ 
        status: "approved", 
        is_approved: true, 
        approved_at: new Date().toISOString() 
      })
      .in("id", ids);

    if (error) {
      console.error("Error bulk approving:", error.message);
    } else {
      fetchStartups();
    }
  };

  const handleBulkReject = async (ids) => {
    const { error } = await supabase
      .from("startups")
      .update({ 
        status: "rejected", 
        is_approved: false 
      })
      .in("id", ids);

    if (error) {
      console.error("Error bulk rejecting:", error.message);
    } else {
      fetchStartups();
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "ID", "Name", "Email", "Contact", "Location", "Sector", 
      "Stage", "Status", "Created At", "Description"
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
    a.download = "startups.csv";
    a.click();
  };

  // View startup details
  const ViewStartupModal = ({ startup, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900">{startup.name}</h2>
            <Button variant="ghost" onClick={onClose} className="rounded-full">
              ✕
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-slate-500">Founders</p>
                  <p className="font-medium">
                    {startup.founders && Array.isArray(startup.founders) 
                      ? startup.founders.map(f => `${f.name} (${f.role})`).join(", ")
                      : "No founder info"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium">{startup.startup_email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-slate-500">Contact</p>
                  <p className="font-medium">{startup.contact || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="font-medium">{startup.location || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-500">Sector</p>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                    {startup.sector || "N/A"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-500">Stage</p>
                  <p className="font-medium">{startup.stage || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-slate-500">Valuation</p>
                  <p className="font-medium">{startup.current_valuation || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-slate-500">Website</p>
                  {startup.website ? (
                    <a 
                      href={startup.website} 
                      target="_blank" 
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      {startup.website}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : "N/A"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">
              {startup.description || "No description provided."}
            </p>
          </div>

          {startup.feedback && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">User Feedback</h3>
              <p className="text-slate-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                {startup.feedback}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Admin Review</h3>
            <Textarea
              placeholder="Add your review here..."
              defaultValue={startup.review || ""}
              id={`review-${startup.id}`}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => updateStatus(
                startup.id,
                "approved",
                document.getElementById(`review-${startup.id}`)?.value || ""
              )}
              disabled={updatingId === startup.id}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
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
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Startup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-blue-50 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Startups</p>
                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Pending Review</p>
                <p className="text-3xl font-bold text-slate-900">{stats.pending}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Approved</p>
                <p className="text-3xl font-bold text-slate-900">{stats.approved}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Rejected</p>
                <p className="text-3xl font-bold text-slate-900">{stats.rejected}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-montserrat">Startup Management Dashboard</h1>
        <p className="text-slate-600 font-poppins">Review and manage startup applications from Northeast India</p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-8 bg-white/90 backdrop-blur-sm border-2 border-red-100 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-slate-300 focus:border-red-500"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 border-slate-300 focus:border-red-500">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="h-12 border-slate-300 focus:border-red-500">
                <Briefcase className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button 
                onClick={fetchStartups}
                variant="outline" 
                className="h-12 flex-1 border-slate-300 hover:bg-slate-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button 
                onClick={exportToCSV}
                variant="outline" 
                className="h-12 flex-1 border-slate-300 hover:bg-slate-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Startups List */}
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto text-red-600 mb-4" />
          <p className="text-slate-600">Loading startups...</p>
        </div>
      ) : filteredStartups.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No startups found</h3>
            <p className="text-slate-500">No startups match your current filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStartups.map((startup) => (
            <Card 
              key={startup.id}
              className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-1">{startup.name}</h3>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`
                          ${startup.status === "approved" ? "bg-green-100 text-green-700 border-green-300" :
                            startup.status === "rejected" ? "bg-red-100 text-red-700 border-red-300" :
                            "bg-yellow-100 text-yellow-700 border-yellow-300"}
                        `}
                      >
                        {startup.status}
                      </Badge>
                      <span className="text-sm text-slate-500">
                        {new Date(startup.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStartup(startup)}
                    className="rounded-full"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-slate-600">{startup.location || "No location"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-700">
                      {startup.sector || "No sector"}
                    </Badge>
                    <Badge variant="outline" className="border-purple-300 bg-purple-50 text-purple-700">
                      {startup.stage || "No stage"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-600">
                      {startup.founders && Array.isArray(startup.founders) 
                        ? `${startup.founders.length} founder${startup.founders.length !== 1 ? 's' : ''}`
                        : "No founder info"
                      }
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 line-clamp-2 text-sm">
                  {startup.description || "No description provided."}
                </p>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <Button
                    onClick={() => setSelectedStartup(startup)}
                    className="flex-1 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Review
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateStatus(startup.id, "approved")}
                      disabled={updatingId === startup.id || startup.status === "approved"}
                      variant="outline"
                      className="border-green-300 hover:bg-green-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(startup.id, "rejected")}
                      disabled={updatingId === startup.id || startup.status === "rejected"}
                      variant="outline"
                      className="border-red-300 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredStartups.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-300">
              Previous
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              1
            </Button>
            <Button variant="outline" size="sm" className="border-slate-300">
              2
            </Button>
            <Button variant="outline" size="sm" className="border-slate-300">
              Next
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