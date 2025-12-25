// app/profile/page.jsx or pages/profile.jsx depending on your setup
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Briefcase, 
  Settings, 
  Award, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Globe,
  Mail,
  Phone,
  Link as LinkIcon,
  Edit2,
  Check,
  X,
  Upload,
  Shield,
  Users as UsersIcon,
  BarChart3,
  Target,
  DollarSign,
  Building,
  FileText,
  Video,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { GridBeam } from "../components/ui/GridBeam";
import { Highlight } from "../components/ui/hero-highlight";
import { supabase } from "../utils/supabaseClient"; // Adjust based on your setup

// Tab Navigation Component
function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'startups', label: 'My Startups', icon: Briefcase },
    { id: 'activity', label: 'Activity', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 font-poppins font-medium ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// Profile Header Component
function ProfileHeader({ user, startupCount, isEditing, setIsEditing, onSave }) {
  const [tempAvatar, setTempAvatar] = useState(null);
  
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Implement Supabase storage upload here
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-red-50/30 to-blue-50/30 rounded-2xl border border-slate-200 p-8">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="relative w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
            {user?.avatar_url || tempAvatar ? (
              <img 
                src={tempAvatar || user.avatar_url} 
                alt={user?.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-slate-400" />
              </div>
            )}
            
            {isEditing && (
              <label className="absolute bottom-2 right-2 cursor-pointer">
                <div className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Upload className="w-4 h-4 text-slate-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </div>
              </label>
            )}
          </div>
          
          {/* Role Badge */}
          {user?.role && (
            <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
              user.role === 'admin' 
                ? 'bg-red-100 text-red-700 border border-red-200'
                : user.role === 'founder'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}>
              <Shield className="w-3 h-3" />
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={user?.username}
                  className="text-3xl font-bold bg-transparent border-b-2 border-red-200 focus:border-red-500 outline-none font-montserrat"
                />
              ) : (
                <h1 className="text-3xl font-bold text-slate-900 font-montserrat">
                  {user?.username}
                </h1>
              )}
              
              {isEditing ? (
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="mt-1 text-slate-600 bg-transparent border-b border-slate-200 focus:border-red-300 outline-none font-poppins"
                />
              ) : (
                <p className="mt-1 text-slate-600 font-poppins flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <Button
                    onClick={onSave}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4">
              <div className="text-2xl font-bold text-red-700 font-montserrat">
                {startupCount}
              </div>
              <div className="text-sm text-slate-600 font-poppins flex items-center gap-2">
                <Briefcase className="w-3 h-3" />
                Startups
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4">
              <div className="text-2xl font-bold text-amber-700 font-montserrat">
                12
              </div>
              <div className="text-sm text-slate-600 font-poppins flex items-center gap-2">
                <Award className="w-3 h-3" />
                Achievements
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4">
              <div className="text-2xl font-bold text-blue-700 font-montserrat">
                8
              </div>
              <div className="text-sm text-slate-600 font-poppins flex items-center gap-2">
                <UsersIcon className="w-3 h-3" />
                Connections
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4">
              <div className="text-2xl font-bold text-emerald-700 font-montserrat">
                95%
              </div>
              <div className="text-sm text-slate-600 font-poppins flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Profile Score
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Startup Card Component
function StartupCard({ startup, onEdit }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-r from-slate-50 to-slate-100">
        {startup.logo_path ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img 
              src={startup.logo_path} 
              alt={startup.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Building className="w-16 h-16 text-slate-300" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
          startup.status === 'approved'
            ? 'bg-green-100 text-green-700 border border-green-200'
            : startup.status === 'pending'
            ? 'bg-amber-100 text-amber-700 border border-amber-200'
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {startup.status?.charAt(0).toUpperCase() + startup.status?.slice(1)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-montserrat">
              {startup.name}
            </h3>
            <p className="text-slate-600 font-poppins line-clamp-2 mt-1">
              {startup.tagline || startup.description}
            </p>
          </div>
          <button
            onClick={() => onEdit(startup)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{startup.location || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Target className="w-3 h-3" />
            <span className="truncate">{startup.stage || 'Early'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <DollarSign className="w-3 h-3" />
            <span className="truncate">{startup.current_valuation || 'Undisclosed'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="w-3 h-3" />
            <span className="truncate">
              {startup.founded_date ? new Date(startup.founded_date).getFullYear() : 'N/A'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 border-slate-200 hover:border-red-300 hover:bg-red-50"
          >
            View Details
          </Button>
          <Button 
            size="sm"
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            Pitch Deck
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Settings Panel Component
function SettingsPanel({ user }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    startupAlerts: true,
    newsletter: false,
    privacy: 'public',
    twoFactor: false,
  });

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-800 font-poppins">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </div>
                <div className="text-sm text-slate-500">
                  Receive notifications for {key}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({...settings, [key]: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
          Account Security
        </h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <span>Change Password</span>
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>Two-Factor Authentication</span>
            <Shield className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between text-red-600 border-red-200 hover:bg-red-50">
            <span>Delete Account</span>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main Profile Component
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [startups, setStartups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Fetch user profile from public.users
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser(userData);

        // Fetch user's startups
        const { data: startupsData } = await supabase
          .from('startups')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        setStartups(startupsData || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    // Implement save logic to update user in public.users
    setIsEditing(false);
  };

  const handleEditStartup = (startup) => {
    // Navigate to startup edit page
    console.log('Edit startup:', startup);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-blue-50/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,transparent_70%)]" />

      <GridBeam className="sm:pl-16 pl-4">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 font-montserrat">
                  My <Highlight>Profile</Highlight>
                </h1>
                <p className="text-slate-600 font-poppins mt-2">
                  Manage your account and startup portfolio
                </p>
              </div>
              
              <Button
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                onClick={() => {/* Navigate to create startup */}}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Add Startup
              </Button>
            </div>

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Profile Header */}
            <ProfileHeader
              user={user}
              startupCount={startups.length}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onSave={handleSaveProfile}
            />

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Bio Section */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* About Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
                        About
                      </h3>
                      <p className="text-slate-600 font-poppins leading-relaxed">
                        {user?.bio || "No bio added yet. Tell us about yourself!"}
                      </p>
                      {isEditing && (
                        <textarea
                          className="mt-4 w-full p-3 border border-slate-200 rounded-lg focus:border-red-300 outline-none font-poppins"
                          rows="4"
                          placeholder="Tell us about yourself..."
                          defaultValue={user?.bio}
                        />
                      )}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {[
                          { action: 'Updated startup profile', time: '2 hours ago', icon: Edit2 },
                          { action: 'Added new team member', time: '1 day ago', icon: UsersIcon },
                          { action: 'Uploaded pitch deck', time: '3 days ago', icon: FileText },
                          { action: 'Received investor inquiry', time: '1 week ago', icon: DollarSign },
                        ].map((activity, index) => {
                          const Icon = activity.icon;
                          return (
                            <div key={index} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                              <div className="p-2 bg-red-50 rounded-lg">
                                <Icon className="w-4 h-4 text-red-600" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-slate-800 font-poppins">
                                  {activity.action}
                                </div>
                                <div className="text-sm text-slate-500">
                                  {activity.time}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
                        Quick Stats
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-poppins">Profile Views</span>
                          <span className="font-bold text-slate-900">1,247</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-poppins">Investor Leads</span>
                          <span className="font-bold text-slate-900">8</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-poppins">Mentor Sessions</span>
                          <span className="font-bold text-slate-900">12</span>
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
                        Documents
                      </h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-between">
                          <span>Resume/CV</span>
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between">
                          <span>Portfolio</span>
                          <ImageIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between">
                          <span>Video Intro</span>
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'startups' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 font-montserrat">
                      My Startups ({startups.length})
                    </h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        Sort
                      </Button>
                    </div>
                  </div>

                  {startups.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                      <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-2">
                        No startups yet
                      </h3>
                      <p className="text-slate-600 font-poppins mb-6">
                        List your first startup to get started!
                      </p>
                      <Button
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      >
                        Create Your First Startup
                      </Button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {startups.map((startup) => (
                        <StartupCard
                          key={startup.id}
                          startup={startup}
                          onEdit={handleEditStartup}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <SettingsPanel user={user} />
              )}
            </motion.div>
          </div>
        </div>
      </GridBeam>
    </div>
  );
}