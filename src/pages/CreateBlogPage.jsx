// src/pages/CreateBlogPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { uploadToCloudinary } from "../utils/cloudinary"; // Import your Cloudinary function
import { canUserCreateBlog, canUserEditBlog, generateSlug, calculateReadTime } from "../utils/blogUtils";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { 
  ArrowLeft, Save, Eye, Upload, X, Loader2, 
  Globe, Lock, Sparkles, Image as ImageIcon,
  Bold, Italic, Link, List, ListOrdered, Quote,
  Heading1, Heading2, Heading3, Code, ImagePlus
} from "lucide-react";
import { toast } from "sonner";

// Simple rich text editor toolbar component
const RichTextToolbar = ({ onFormat, onInsertImage }) => {
  const formats = [
    { icon: <Bold className="w-4 h-4" />, action: 'bold', title: 'Bold (Ctrl+B)' },
    { icon: <Italic className="w-4 h-4" />, action: 'italic', title: 'Italic (Ctrl+I)' },
    { icon: <Link className="w-4 h-4" />, action: 'link', title: 'Insert Link (Ctrl+K)' },
    { icon: <Heading1 className="w-4 h-4" />, action: 'h1', title: 'Heading 1' },
    { icon: <Heading2 className="w-4 h-4" />, action: 'h2', title: 'Heading 2' },
    { icon: <Heading3 className="w-4 h-4" />, action: 'h3', title: 'Heading 3' },
    { icon: <List className="w-4 h-4" />, action: 'ul', title: 'Bulleted List' },
    { icon: <ListOrdered className="w-4 h-4" />, action: 'ol', title: 'Numbered List' },
    { icon: <Quote className="w-4 h-4" />, action: 'blockquote', title: 'Quote' },
    { icon: <Code className="w-4 h-4" />, action: 'code', title: 'Code Block' },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-slate-200 bg-slate-50 rounded-t-lg">
      {formats.map((format) => (
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
  
  // Refs for file inputs
  const coverImageInputRef = useRef(null);
  const contentImageInputRef = useRef(null);

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
      toast.success("Cover image uploaded successfully!");
      
      // Reset the file input
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
      
      // Insert image markdown at cursor position
      const imageMarkdown = `![Image description](${result.url})\n`;
      const textarea = document.querySelector('textarea[name="content"]');
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = formData.content.substring(0, start) + imageMarkdown + formData.content.substring(end);
        setFormData(prev => ({ ...prev, content: newContent }));
        
        // Focus back on textarea after insertion
        setTimeout(() => {
          textarea.focus();
          textarea.selectionStart = start + imageMarkdown.length;
          textarea.selectionEnd = start + imageMarkdown.length;
        }, 0);
      }
      
      toast.success("Image uploaded and inserted!");
      
      // Reset the file input
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
          return; // User cancelled
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
    
    // Focus back on textarea and set cursor position
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
        toast.success(publish ? "Blog published successfully!" : "Blog updated successfully!");
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([blogData]);

        if (error) throw error;
        toast.success(publish ? "Blog published successfully!" : "Blog saved as draft!");
      }

      navigate(publish ? `/blog/${formData.slug}` : '/blog/my-blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      
      if (error.code === '23505') {
        toast.error("Slug already exists. Please choose a different one.");
      } else {
        toast.error(error.message || "Failed to save blog");
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Save current content to localStorage for preview
    localStorage.setItem('blog_preview', JSON.stringify(formData));
    window.open('/blog/preview', '_blank');
  };

  const triggerCoverImageInput = () => {
    if (coverImageInputRef.current) {
      coverImageInputRef.current.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
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
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePreview}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-6">
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Title *
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog title..."
                  className="text-2xl font-bold h-14"
                />
                
                <div className="mt-4">
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    URL Slug *
                  </Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="blog-post-url-slug"
                    className="font-mono"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    This will be used in the URL: /blog/{formData.slug || 'your-slug'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Excerpt */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-6">
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Excerpt (Short Description)
                </Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief summary of your blog post..."
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Content Editor */}
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
                />
                <div className="relative">
                  <Textarea
                    name="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your blog content here... (Markdown supported)"
                    rows={20}
                    className="font-mono text-sm border-0 rounded-t-none"
                  />
                  
                  {/* Hidden file input for content images */}
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
                <div className="p-4 border-t border-slate-200 bg-slate-50">
                  <p className="text-xs text-slate-500">
                    <strong>Markdown Tips:</strong> Use **bold**, *italic*, # Heading, - List,  Quote, 
                    `code`, ![alt](url) for images, [text](url) for links
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6">
            {/* Cover Image */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-6">
                <Label className="text-sm font-medium text-slate-700 mb-4 block">
                  Cover Image
                </Label>
                
                {previewUrl ? (
                  <div className="relative mb-4">
                    <img
                      src={previewUrl}
                      alt="Cover preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setPreviewUrl("");
                        setFormData(prev => ({ ...prev, cover_image: "" }));
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-4 hover:border-red-300 transition-colors cursor-pointer"
                    onClick={triggerCoverImageInput}
                  >
                    <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-600 mb-3">Upload a cover image</p>
                    <p className="text-xs text-slate-500">Click or drag & drop</p>
                  </div>
                )}
                
                <div>
                  <input
                    ref={coverImageInputRef}
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageUpload}
                    disabled={imageUploading}
                  />
                  <Button
                    onClick={triggerCoverImageInput}
                    variant="outline"
                    className="w-full gap-2"
                    disabled={imageUploading}
                  >
                    {imageUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {imageUploading ? "Uploading..." : previewUrl ? "Change Image" : "Upload Image"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-6 space-y-4">
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

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <Label htmlFor="is_featured" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Feature this post</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_pro_membership"
                    checked={formData.is_pro_membership}
                    onChange={(e) => handleInputChange('is_pro_membership', e.target.checked)}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <Label htmlFor="is_pro_membership" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-600" />
                      <span>Pro Members Only</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Only visible to Pro members
                    </p>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-slate-700 mb-4">SEO Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-slate-600 mb-1 block">
                      Meta Title
                    </Label>
                    <Input
                      value={formData.meta_title}
                      onChange={(e) => handleInputChange('meta_title', e.target.value)}
                      placeholder="SEO title (optional)"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium text-slate-600 mb-1 block">
                      Meta Description
                    </Label>
                    <Textarea
                      value={formData.meta_description}
                      onChange={(e) => handleInputChange('meta_description', e.target.value)}
                      placeholder="SEO description (optional)"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium text-slate-600 mb-1 block">
                      Keywords (comma separated)
                    </Label>
                    <Input
                      value={formData.meta_keywords.join(', ')}
                      onChange={(e) => handleInputChange('meta_keywords', e.target.value.split(',').map(k => k.trim()))}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keyboard Shortcuts Help */}
            <Card className="border-2 border-slate-200">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-slate-700 mb-4">Keyboard Shortcuts</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Bold</span>
                    <code className="bg-slate-100 px-2 py-1 rounded">Ctrl + B</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Italic</span>
                    <code className="bg-slate-100 px-2 py-1 rounded">Ctrl + I</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Link</span>
                    <code className="bg-slate-100 px-2 py-1 rounded">Ctrl + K</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Save Draft</span>
                    <code className="bg-slate-100 px-2 py-1 rounded">Ctrl + S</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}