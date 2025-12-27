// src/pages/CreateBlogPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { uploadToCloudinary } from "../utils/cloudinary";
import { canUserCreateBlog, canUserEditBlog, generateSlug, calculateReadTime } from "../utils/blogUtils";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Label } from "../components/ui/label";
import { 
  ArrowLeft, Save, Eye, Upload, X, Loader2, 
  Globe, Lock, Sparkles, Image as ImageIcon,
  Bold, Italic, Link, List, ListOrdered, Quote,
  Heading1, Heading2, Heading3, Code, ImagePlus,
  ChevronDown, ChevronUp, Menu, X as XIcon,
  Smartphone, Monitor, Tablet
} from "lucide-react";
import { toast } from "sonner";

// Mobile responsive toolbar component
const RichTextToolbar = ({ onFormat, onInsertImage, isMobile }) => {
  const [showMoreTools, setShowMoreTools] = useState(false);
  
  const basicFormats = [
    { icon: <Bold className="w-4 h-4" />, action: 'bold', title: 'Bold' },
    { icon: <Italic className="w-4 h-4" />, action: 'italic', title: 'Italic' },
    { icon: <Link className="w-4 h-4" />, action: 'link', title: 'Link' },
  ];

  const allFormats = [
    ...basicFormats,
    { icon: <Heading1 className="w-4 h-4" />, action: 'h1', title: 'Heading 1' },
    { icon: <Heading2 className="w-4 h-4" />, action: 'h2', title: 'Heading 2' },
    { icon: <Heading3 className="w-4 h-4" />, action: 'h3', title: 'Heading 3' },
    { icon: <List className="w-4 h-4" />, action: 'ul', title: 'Bullet List' },
    { icon: <ListOrdered className="w-4 h-4" />, action: 'ol', title: 'Numbered List' },
    { icon: <Quote className="w-4 h-4" />, action: 'blockquote', title: 'Quote' },
    { icon: <Code className="w-4 h-4" />, action: 'code', title: 'Code' },
  ];

  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <div className="flex items-center p-2">
        {/* Basic tools always visible */}
        <div className="flex items-center gap-1 flex-1">
          {basicFormats.map((format) => (
            <button
              key={format.action}
              type="button"
              onClick={() => onFormat(format.action)}
              className="p-2 md:p-3 rounded-lg hover:bg-slate-200 text-slate-700 active:bg-slate-300 touch-manipulation"
              title={format.title}
            >
              {format.icon}
            </button>
          ))}
          
          {/* Image upload on mobile */}
          {isMobile && (
            <label className="cursor-pointer p-2 md:p-3 rounded-lg hover:bg-slate-200 text-slate-700 active:bg-slate-300 touch-manipulation">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onInsertImage}
              />
              <ImagePlus className="w-4 h-4" />
            </label>
          )}
        </div>
        
        {/* More tools toggle for mobile */}
        {isMobile && (
          <button
            type="button"
            onClick={() => setShowMoreTools(!showMoreTools)}
            className="p-2 rounded-lg hover:bg-slate-200 text-slate-700 active:bg-slate-300 touch-manipulation"
          >
            {showMoreTools ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      {/* Additional tools for mobile (collapsible) */}
      {isMobile && showMoreTools && (
        <div className="p-2 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-1">
            {allFormats.slice(3).map((format) => (
              <button
                key={format.action}
                type="button"
                onClick={() => {
                  onFormat(format.action);
                  setShowMoreTools(false);
                }}
                className="p-2 md:p-3 rounded-lg hover:bg-slate-200 text-slate-700 active:bg-slate-300 touch-manipulation text-xs flex flex-col items-center gap-1"
              >
                {format.icon}
                <span>{format.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Full toolbar for desktop */}
      {!isMobile && (
        <div className="flex flex-wrap gap-1 p-2">
          {allFormats.slice(3).map((format) => (
            <button
              key={format.action}
              type="button"
              onClick={() => onFormat(format.action)}
              className="p-2 rounded hover:bg-slate-200 text-slate-700"
              title={format.title}
            >
              {format.icon}
            </button>
          ))}
          
          <label className="cursor-pointer p-2 rounded hover:bg-slate-200 text-slate-700">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onInsertImage}
            />
            <ImagePlus className="w-4 h-4" />
          </label>
        </div>
      )}
    </div>
  );
};

// Mobile sidebar component
const MobileSettingsDrawer = ({ 
  formData, 
  categories, 
  handleInputChange, 
  triggerCoverImageInput, 
  previewUrl, 
  setPreviewUrl,
  isOpen,
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Post Settings</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Cover Image */}
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-3 block">
              Cover Image
            </Label>
            
            {previewUrl ? (
              <div className="relative mb-3">
                <img
                  src={previewUrl}
                  alt="Cover preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setPreviewUrl("");
                    handleInputChange('cover_image', "");
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center mb-3 active:border-red-300 transition-colors"
                onClick={triggerCoverImageInput}
              >
                <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Upload cover image</p>
              </div>
            )}
            
            <Button
              onClick={triggerCoverImageInput}
              variant="outline"
              className="w-full gap-2 py-3"
            >
              <Upload className="w-4 h-4" />
              {previewUrl ? "Change Image" : "Upload Image"}
            </Button>
          </div>

          {/* Category */}
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2 block">
              Category
            </Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => handleInputChange('category_id', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2 block">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <input
              type="checkbox"
              id="mobile_is_featured"
              checked={formData.is_featured}
              onChange={(e) => handleInputChange('is_featured', e.target.checked)}
              className="mt-1 rounded border-slate-300 text-red-600 focus:ring-red-500"
            />
            <Label htmlFor="mobile_is_featured" className="cursor-pointer flex-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-medium">Feature this post</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Show on featured section
              </p>
            </Label>
          </div>

          {/* Pro Membership */}
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <input
              type="checkbox"
              id="mobile_is_pro_membership"
              checked={formData.is_pro_membership}
              onChange={(e) => handleInputChange('is_pro_membership', e.target.checked)}
              className="mt-1 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
            />
            <Label htmlFor="mobile_is_pro_membership" className="cursor-pointer flex-1">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Pro Members Only</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Only visible to Pro members
              </p>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CreateBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [canEdit, setCanEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile] = useState(window.innerWidth < 768);
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [viewMode, setViewMode] = useState('edit'); // 'edit', 'preview', 'split'
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    category_id: "",
    status: "draft",
    is_featured: false,
    is_pro_membership: false,
    meta_title: "",
    meta_description: "",
    meta_keywords: []
  });

  const [categories, setCategories] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [contentUploading, setContentUploading] = useState(false);
  
  // Refs
  const coverImageInputRef = useRef(null);
  const contentImageInputRef = useRef(null);
  const titleInputRef = useRef(null);

  // Check user permissions
  useEffect(() => {
    const checkUser = async () => {
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
        
        if (!canUserCreateBlog(role)) {
          toast.error("You don't have permission to create blogs");
          navigate('/blog');
          return;
        }

        if (id) {
          setIsEditing(true);
          await fetchBlog(id);
        }
      } else {
        navigate('/login');
      }
    };
    
    checkUser();
    fetchCategories();
    
    // Focus title on mount for better UX
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 100);
  }, [id, navigate]);

  const fetchBlog = async (blogId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', blogId)
        .single();

      if (error) throw error;
      
      if (!canUserEditBlog(data, { id: user.id, role: userRole })) {
        toast.error("You don't have permission to edit this blog");
        navigate('/blog');
        return;
      }

      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        cover_image: data.cover_image || "",
        category_id: data.category_id || "",
        status: data.status || "draft",
        is_featured: data.is_featured || false,
        is_pro_membership: data.is_pro_membership || false,
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        meta_keywords: data.meta_keywords || []
      });

      setPreviewUrl(data.cover_image || "");
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && !isEditing) {
      const generatedSlug = generateSlug(value);
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleCoverImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      toast.loading("Uploading cover image...");
      const result = await uploadToCloudinary(file, 'blog-covers');
      
      setFormData(prev => ({ ...prev, cover_image: result.url }));
      setPreviewUrl(result.url);
      toast.success("Cover image uploaded!");
      
      if (coverImageInputRef.current) {
        coverImageInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const handleContentImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setContentUploading(true);
    try {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      toast.loading("Uploading image...");
      const result = await uploadToCloudinary(file, 'blog-content');
      
      const imageMarkdown = `![Image description](${result.url})\n`;
      const textarea = document.querySelector('textarea[name="content"]');
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = formData.content.substring(0, start) + imageMarkdown + formData.content.substring(end);
        setFormData(prev => ({ ...prev, content: newContent }));
        
        setTimeout(() => {
          textarea.focus();
          textarea.selectionStart = start + imageMarkdown.length;
          textarea.selectionEnd = start + imageMarkdown.length;
        }, 0);
      }
      
      toast.success("Image uploaded!");
      
      if (contentImageInputRef.current) {
        contentImageInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading content image:', error);
      toast.error("Failed to upload image");
    } finally {
      setContentUploading(false);
    }
  };

  const handleTextFormat = (format) => {
    const textarea = document.querySelector('textarea[name="content"]');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    let formattedText = '';
    let cursorOffset = 0;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorOffset = 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorOffset = 1;
        break;
      case 'link':
        const url = prompt('Enter URL:', 'https://');
        if (url) {
          const linkText = selectedText || 'Link Text';
          formattedText = `[${linkText}](${url})`;
          cursorOffset = linkText.length + 3 + url.length;
        } else {
          return;
        }
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        cursorOffset = 2;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        cursorOffset = 3;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        cursorOffset = 4;
        break;
      case 'ul':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        cursorOffset = 2;
        break;
      case 'ol':
        formattedText = selectedText.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n');
        cursorOffset = 3;
        break;
      case 'blockquote':
        formattedText = selectedText.split('\n').map(line => `> ${line}`).join('\n');
        cursorOffset = 2;
        break;
      case 'code':
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
        cursorOffset = 4;
        break;
      default:
        return;
    }

    const newContent = formData.content.substring(0, start) + formattedText + formData.content.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
    
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.selectionStart = start;
        textarea.selectionEnd = start + formattedText.length;
      } else {
        textarea.selectionStart = start + cursorOffset;
        textarea.selectionEnd = start + cursorOffset;
      }
    }, 0);
  };

  const handleSave = async (publish = false) => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }

    if (!formData.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    setSaving(true);
    try {
      const blogData = {
        ...formData,
        author_id: user.id,
        author_name: user.user_metadata?.full_name || user.email?.split('@')[0],
        read_time: calculateReadTime(formData.content),
        published_at: publish ? new Date().toISOString() : null,
        status: publish ? 'published' : formData.status,
        updated_at: new Date().toISOString()
      };

      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', id);

        if (error) throw error;
        toast.success(publish ? "Published!" : "Saved!");
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([blogData]);

        if (error) throw error;
        toast.success(publish ? "Published!" : "Saved as draft!");
      }

      navigate(publish ? `/blog/${formData.slug}` : '/blog/my-blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      
      if (error.code === '23505') {
        toast.error("Slug already exists");
      } else {
        toast.error(error.message || "Failed to save");
      }
    } finally {
      setSaving(false);
    }
  };

  const triggerCoverImageInput = () => {
    if (coverImageInputRef.current) {
      coverImageInputRef.current.click();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        handleTextFormat('bold');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        handleTextFormat('italic');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-blue-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/blog')}
              className="h-10 w-10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold text-slate-900 truncate px-2">
                {isEditing ? 'Edit Post' : 'New Post'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileSettings(true)}
                className="h-10 w-10"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <Button
                size="sm"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-blue-800"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {isEditing ? 'Edit Blog Post' : 'Write a New Blog Post'}
              </h1>
              <p className="text-sm text-slate-600">
                {userRole === 'admin' ? 'Administrator' : 'Founder'} Mode
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('edit')}
                className={`p-2 rounded-md ${viewMode === 'edit' ? 'bg-white shadow-sm' : ''}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`p-2 rounded-md ${viewMode === 'preview' ? 'bg-white shadow-sm' : ''}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => {
                localStorage.setItem('blog_preview', JSON.stringify(formData));
                window.open('/blog/preview', '_blank');
              }}
              className="gap-2"
              disabled={saving || !formData.title}
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            
            <Button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-800"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
            
            <Button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="gap-2 bg-gradient-to-r from-green-600 to-green-800"
            >
              <Globe className="w-4 h-4" />
              {isEditing ? 'Update & Publish' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Editor Column */}
          <div className={`${viewMode === 'preview' ? 'hidden' : 'lg:col-span-2'} space-y-4 md:space-y-6`}>
            {/* Title Card */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-4 md:p-6">
                <Label className="text-sm font-medium text-slate-700 mb-3 block">
                  Title *
                </Label>
                <Input
                  ref={titleInputRef}
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog title..."
                  className="text-lg md:text-2xl font-bold h-12 md:h-14 text-lg"
                />
                
                <div className="mt-4">
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    URL Slug *
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-sm">/blog/</span>
                    <Input
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="your-blog-slug"
                      className="font-mono flex-1"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Auto-generated from title
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Excerpt Card */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-4 md:p-6">
                <Label className="text-sm font-medium text-slate-700 mb-3 block">
                  Excerpt (Short Description)
                </Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief summary of your blog post..."
                  rows={2}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            {/* Content Editor Card */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-0">
                <RichTextToolbar 
                  onFormat={handleTextFormat}
                  onInsertImage={(e) => {
                    contentImageInputRef.current?.click();
                    if (e?.target?.files?.[0]) {
                      handleContentImageUpload(e);
                    }
                  }}
                  isMobile={isMobile}
                />
                <div className="relative">
                  <Textarea
                    name="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your blog content here... (Markdown supported)"
                    rows={isMobile ? 15 : 20}
                    className="font-mono text-sm border-0 rounded-t-none resize-y min-h-[400px]"
                  />
                  
                  <input
                    ref={contentImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleContentImageUpload}
                    disabled={contentUploading}
                  />
                  
                  {contentUploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-red-600" />
                    </div>
                  )}
                </div>
                <div className="p-3 md:p-4 border-t border-slate-200 bg-slate-50">
                  <p className="text-xs text-slate-500">
                    <strong>Markdown Tips:</strong> Use **bold**, *italic*, # Heading, - List, Quote, 
                    `code`, ![alt](url) for images, [text](url) for links
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Column (Desktop) */}
          {viewMode === 'preview' && (
            <div className="lg:col-span-2">
              <Card className="border-2 border-slate-200 h-full">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <div className="prose max-w-none">
                    <h1>{formData.title || "Preview Title"}</h1>
                    {previewUrl && (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-auto rounded-lg mb-4"
                      />
                    )}
                    <div dangerouslySetInnerHTML={{ 
                      __html: formData.content || "<p>Start writing to see preview...</p>" 
                    }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Column (Desktop) */}
          <div className="hidden lg:block space-y-4 md:space-y-6">
            {/* Cover Image Card */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-4 md:p-6">
                <Label className="text-sm font-medium text-slate-700 mb-3 block">
                  Cover Image
                </Label>
                
                {previewUrl ? (
                  <div className="relative mb-3">
                    <img
                      src={previewUrl}
                      alt="Cover preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setPreviewUrl("");
                        setFormData(prev => ({ ...prev, cover_image: "" }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center mb-3 hover:border-red-300 transition-colors cursor-pointer"
                    onClick={triggerCoverImageInput}
                  >
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Upload cover image</p>
                  </div>
                )}
                
                <input
                  ref={coverImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageUpload}
                  disabled={imageUploading}
                />
                <Button
                  onClick={triggerCoverImageInput}
                  variant="outline"
                  className="w-full gap-2 py-3"
                  disabled={imageUploading}
                >
                  {imageUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {imageUploading ? "Uploading..." : previewUrl ? "Change Image" : "Upload Image"}
                </Button>
              </CardContent>
            </Card>

            {/* Settings Card */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-4 md:p-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    Category
                  </Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => handleInputChange('category_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                    className="mt-1 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <Label htmlFor="is_featured" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">Feature this post</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Show on featured section
                    </p>
                  </Label>
                </div> 

                 {/* <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="is_pro_membership"
                    checked={formData.is_pro_membership}
                    onChange={(e) => handleInputChange('is_pro_membership', e.target.checked)}
                    className="mt-1 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <Label htmlFor="is_pro_membership" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">Pro Members Only</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Only visible to Pro members
                    </p>
                  </Label>
                </div> */}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-sm font-medium text-slate-700 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleSave(false)}
                    disabled={saving}
                    className="w-full justify-start gap-3 py-3"
                    variant="outline"
                  >
                    <Save className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-medium">Save Draft</div>
                      <div className="text-xs text-slate-500">Ctrl + S</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => handleSave(true)}
                    disabled={saving}
                    className="w-full justify-start gap-3 py-3"
                  >
                    <Globe className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-medium">Publish Now</div>
                      <div className="text-xs opacity-90">Make it public</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Bottom Action Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-4 shadow-lg-t">
          <div className="flex items-center justify-between gap-3">
            <Button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex-1 gap-2 py-3"
              variant="outline"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Saving' : 'Save Draft'}
            </Button>
            
            <Button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex-1 gap-2 py-3 bg-gradient-to-r from-green-600 to-green-800"
            >
              <Globe className="w-4 h-4" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Settings Drawer */}
      <MobileSettingsDrawer
        formData={formData}
        categories={categories}
        handleInputChange={handleInputChange}
        triggerCoverImageInput={triggerCoverImageInput}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        isOpen={showMobileSettings}
        onClose={() => setShowMobileSettings(false)}
      />

      {/* Hidden file inputs */}
      <input
        ref={coverImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverImageUpload}
        disabled={imageUploading}
      />
      <input
        ref={contentImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleContentImageUpload}
        disabled={contentUploading}
      />
    </div>
  );
}