// app/profile/page.jsx
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
  Image as ImageIcon,
  Save,
  LogOut,
  Eye,
  EyeOff,
  Lock,
  Bell,
  Trash2,
  Link,
  Camera
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { GridBeam } from "../components/ui/GridBeam";
import { Highlight } from "../components/ui/hero-highlight";
import { supabase } from "../utils/supabaseClient";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

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
function ProfileHeader({ 
  user, 
  startupCount, 
  isEditing, 
  setIsEditing, 
  onSave, 
  onAvatarUpload,
  tempAvatar 
}) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarClick = () => {
    document.getElementById('avatar-upload').click();
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-red-50/30 to-blue-50/30 rounded-2xl border border-slate-200 p-8">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="relative w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 cursor-pointer group">
            {user?.avatar_url || tempAvatar ? (
              <img 
                src={tempAvatar || user.avatar_url} 
                alt={user?.username}
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                onClick={isEditing ? handleAvatarClick : undefined}
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center group-hover:bg-slate-200 transition-colors"
                onClick={isEditing ? handleAvatarClick : undefined}
              >
                <Camera className="w-16 h-16 text-slate-400 group-hover:text-slate-600" />
              </div>
            )}
            
            {isEditing && (
              <>
                <input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={onAvatarUpload}
                />
                <div className="absolute bottom-2 right-2">
                  <div className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <Upload className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              </>
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
            <div className="space-y-2">
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="text-3xl font-bold bg-transparent border-b-2 border-red-200 focus:border-red-500 outline-none font-montserrat w-full"
                  placeholder="Username"
                />
              ) : (
                <h1 className="text-3xl font-bold text-slate-900 font-montserrat">
                  {user?.username || 'Anonymous User'}
                </h1>
              )}
              
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 text-slate-600 bg-transparent border-b border-slate-200 focus:border-red-300 outline-none font-poppins w-full"
                  placeholder="Email"
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
                    onClick={() => onSave(formData)}
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

          {/* Bio Section */}
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-lg focus:border-red-300 focus:ring-2 focus:ring-red-200 outline-none font-poppins"
                rows="3"
                placeholder="Tell us about yourself..."
              />
            </div>
          )}

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
                {user?.achievements_count || 0}
              </div>
              <div className="text-sm text-slate-600 font-poppins flex items-center gap-2">
                <Award className="w-3 h-3" />
                Achievements
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4">
              <div className="text-2xl font-bold text-blue-700 font-montserrat">
                {user?.connections_count || 0}
              </div>
              <div className="text-sm text-slate-600 font-poppins flex items-center gap-2">
                <UsersIcon className="w-3 h-3" />
                Connections
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4">
              <div className="text-2xl font-bold text-emerald-700 font-montserrat">
                {user?.profile_score || '0%'}
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
function StartupCard({ startup, onEdit, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this startup?')) {
      setIsDeleting(true);
      await onDelete(startup.id);
      setIsDeleting(false);
    }
  };

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
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(startup)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit2 className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
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
            onClick={() => window.open(`/startup/${startup.id}`, '_blank')}
          >
            View Details
          </Button>
          {startup.pitch_deck_url && (
            <Button 
              size="sm"
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              onClick={() => window.open(startup.pitch_deck_url, '_blank')}
            >
              Pitch Deck
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Settings Panel Component
function SettingsPanel({ user, onSettingsUpdate, onLogout, onChangePassword, onDeleteAccount }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    startupAlerts: true,
    newsletter: false,
    privacy: 'public',
    twoFactor: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSettingsChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsUpdate(newSettings);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                  {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className="text-sm text-slate-500">
                  Receive notifications for {key}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingsChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="w-full p-3 border border-slate-200 rounded-lg focus:border-red-300 focus:ring-2 focus:ring-red-200 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              className="w-full p-3 border border-slate-200 rounded-lg focus:border-red-300 focus:ring-2 focus:ring-red-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              className="w-full p-3 border border-slate-200 rounded-lg focus:border-red-300 focus:ring-2 focus:ring-red-200 outline-none"
            />
          </div>

          <Button
            onClick={handlePasswordChange}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            <Lock className="w-4 h-4 mr-2" />
            Update Password
          </Button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
          Account Actions
        </h3>
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={onLogout}
          >
            <span>Sign Out</span>
            <LogOut className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between text-red-600 border-red-200 hover:bg-red-50"
            onClick={onDeleteAccount}
          >
            <span>Delete Account</span>
            <Trash2 className="w-4 h-4" />
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
  const [tempAvatar, setTempAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activities, setActivities] = useState([]);
  const router = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchActivities();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router("/");
        return;
      }

      // Fetch user profile
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!userData) {
        // Create user profile if it doesn't exist
        const { data: newUser } = await supabase
          .from('users')
          .insert([
            {
              id: session.user.id,
              email: session.user.email,
              username: session.user.email?.split('@')[0] || 'user'
            }
          ])
          .select()
          .single();

        setUser(newUser);
      } else {
        setUser(userData);
      }

      // Fetch user's startups
      const { data: startupsData } = await supabase
        .from('startups')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      setStartups(startupsData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      // Fetch recent activities
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // You can create an activities table or use existing data
        // For now, we'll use static data
        setActivities([
          { id: 1, action: 'Updated startup profile', time: '2 hours ago', icon: Edit2 },
          { id: 2, action: 'Added new team member', time: '1 day ago', icon: UsersIcon },
          { id: 3, action: 'Uploaded pitch deck', time: '3 days ago', icon: FileText },
          { id: 4, action: 'Received investor inquiry', time: '1 week ago', icon: DollarSign },
        ]);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleSaveProfile = async (formData) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please login to save changes');
        return;
      }

      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (error) throw error;

      // Update email in auth if changed
      if (formData.email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: formData.email
        });

        if (authError) throw authError;
      }

      setUser(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleAvatarUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please login to upload avatar');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      // Update user profile with avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      setUser(prev => ({ ...prev, avatar_url: publicUrl }));
      setTempAvatar(null);
      toast.success('Avatar updated successfully');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleEditStartup = (startup) => {
    router(`/startup/edit/${startup.id}`);   
  };

  const handleDeleteStartup = async (startupId) => {
    try {
      const { error } = await supabase
        .from('startups')
        .delete()
        .eq('id', startupId);

      if (error) throw error;

      setStartups(prev => prev.filter(s => s.id !== startupId));
      toast.success('Startup deleted successfully');
    } catch (error) {
      console.error('Error deleting startup:', error);
      toast.error('Failed to delete startup');
    }
  };

  const handleSettingsUpdate = async (settings) => {
    try {
      // Save settings to user profile or a separate settings table
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase
          .from('users')
          .update({ settings: JSON.stringify(settings) })
          .eq('id', session.user.id);

        if (error) throw error;
        toast.success('Settings updated');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Delete user's startups first
      await supabase
        .from('startups')
        .delete()
        .eq('user_id', session.user.id);

      // Delete user profile
      await supabase
        .from('users')
        .delete()
        .eq('id', session.user.id);

      // Delete auth user
      await supabase.auth.admin.deleteUser(session.user.id);

      await supabase.auth.signOut();
      router('/');
      toast.success('Account deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    }
  };

  const handleCreateStartup = () => {
    router('/');
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
      <Toaster position="top-right" />
      
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
                onClick={handleCreateStartup}
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
              onAvatarUpload={handleAvatarUpload}
              tempAvatar={tempAvatar}
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
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {activities.map((activity) => {
                          const Icon = activity.icon;
                          return (
                            <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
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
                          <span className="font-bold text-slate-900">{user?.profile_views || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-poppins">Investor Leads</span>
                          <span className="font-bold text-slate-900">{user?.investor_leads || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-poppins">Mentor Sessions</span>
                          <span className="font-bold text-slate-900">{user?.mentor_sessions || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="text-lg font-bold text-slate-900 font-montserrat mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        {user?.location && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                          </div>
                        )}
                        {user?.website && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Link className="w-4 h-4" />
                            <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                              {user.website}
                            </a>
                          </div>
                        )}
                        {user?.phone && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone className="w-4 h-4" />
                            <span>{user.phone}</span>
                          </div>
                        )}
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleCreateStartup}
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Create New
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
                        onClick={handleCreateStartup}
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
                          onDelete={handleDeleteStartup}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <SettingsPanel 
                  user={user}
                  onSettingsUpdate={handleSettingsUpdate}
                  onLogout={handleLogout}
                  onDeleteAccount={handleDeleteAccount}
                />
              )}
            </motion.div>
          </div>
        </div>
      </GridBeam>
    </div>
  );
}