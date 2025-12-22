// src/pages/BlogPage.jsx
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { canUserCreateBlog } from "../utils/blogUtils";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { 
  BookOpen, Eye, MessageCircle, Share2, Facebook, Twitter, Send, Sparkles, 
  Calendar, User, ChevronRight, TrendingUp, Search, Filter, Plus, Loader2,
  ThumbsUp, Bookmark
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [canCreateBlog, setCanCreateBlog] = useState(false);
  const navigate = useNavigate();

  // Fetch user and check permissions
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
        setCanCreateBlog(canUserCreateBlog(role));
      }
    };
    checkUser();
  }, []);

  // Fetch blogs and categories
  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = blogs;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.content?.toLowerCase().includes(query) ||
        blog.author_name?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter(blog => blog.category_id === activeCategory);
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        result = [...result].sort((a, b) => 
          new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at)
        );
        break;
      case "oldest":
        result = [...result].sort((a, b) => 
          new Date(a.published_at || a.created_at) - new Date(b.published_at || b.created_at)
        );
        break;
      case "popular":
        result = [...result].sort((a, b) => b.views - a.views);
        break;
      case "trending":
        result = [...result].sort((a, b) => b.likes - a.likes);
        break;
    }

    setFilteredBlogs(result);
  }, [searchQuery, activeCategory, sortBy, blogs]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (
            name,
            slug,
            color
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      setBlogs(data || []);
      setFilteredBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
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

  const handleLike = async (blogId, isLiked) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isLiked) {
        // Unlike
        await supabase
          .from('blog_post_likes')
          .delete()
          .match({ post_id: blogId, user_id: user.id });
      } else {
        // Like
        await supabase
          .from('blog_post_likes')
          .insert({ post_id: blogId, user_id: user.id });
      }
      
      // Update local state
      setBlogs(prev => prev.map(blog => {
        if (blog.id === blogId) {
          return {
            ...blog,
            likes: isLiked ? blog.likes - 1 : blog.likes + 1
          };
        }
        return blog;
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleBookmark = async (blogId, isBookmarked) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isBookmarked) {
        // Remove bookmark
        await supabase
          .from('blog_bookmarks')
          .delete()
          .match({ post_id: blogId, user_id: user.id });
      } else {
        // Add bookmark
        await supabase
          .from('blog_bookmarks')
          .insert({ post_id: blogId, user_id: user.id });
      }
    } catch (error) {
      console.error('Error bookmarking post:', error);
    }
  };

  const featuredBlogs = blogs.filter(blog => blog.is_featured).slice(0, 3);

  return (
    <div className="min-h-screen py-8 md:py-12 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 font-medium">Startup Insights & Stories</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">
            Blog & Resources
          </h1>
          <p className="text-sm md:text-lg text-slate-700 max-w-2xl mx-auto font-poppins">
            Expert insights, founder stories, and practical guides for Northeast entrepreneurs
          </p>
          
          {canCreateBlog && (
            <div className="mt-6">
              <Button
                onClick={() => navigate('/blog/create')}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 gap-2"
              >
                <Plus className="w-4 h-4" />
                Write a Blog
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-2 border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs..."
                    className="pl-10 pr-4 py-3 w-full"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Toggle */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-red-300 hover:bg-red-50"
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-red-300 hover:bg-red-50"
                }`}
                style={{
                  backgroundColor: activeCategory === category.id ? undefined : `${category.color}20`,
                  borderColor: activeCategory === category.id ? undefined : category.color
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section (if any) */}
        {featuredBlogs.length > 0 && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 font-montserrat">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {featuredBlogs.map((blog) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  user={user}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Blog Grid */}
        <div className="mb-8 md:mb-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-red-600 mb-4" />
              <p className="text-slate-600">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <Card className="text-center py-16 border-2 border-dashed border-slate-300 bg-white/50">
              <CardContent>
                <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No blogs found</h3>
                <p className="text-slate-500 mb-6">
                  {searchQuery || activeCategory !== "all" 
                    ? "Try adjusting your filters or search term"
                    : "No blog posts available yet"}
                </p>
                {canCreateBlog && (
                  <Button onClick={() => navigate('/blog/create')}>
                    Write Your First Blog
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  user={user}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                  compact
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Blog Card Component
function BlogCard({ blog, user, onLike, onBookmark, compact = false }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isProMember] = useState(user?.is_pro_member || false);

  useEffect(() => {
    // Check if user has liked/bookmarked this post
    if (user) {
      // You would fetch this from the API
      // For now, we'll use a simple check
      setIsLiked(blog.user_liked || false);
      setIsBookmarked(blog.user_bookmarked || false);
    }
  }, [user, blog]);

  const handleClick = () => {
    // Check if blog requires pro membership
    if (blog.is_pro_membership && !isProMember && user?.role !== 'admin') {
      navigate('/upgrade');
      return;
    }
    navigate(`/blog/${blog.slug}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    setIsLiked(!isLiked);
    onLike(blog.id, isLiked);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    setIsBookmarked(!isBookmarked);
    onBookmark(blog.id, isBookmarked);
  };

  if (compact) {
    return (
      <Card
        className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm group cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
          {blog.cover_image ? (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge 
              className="bg-gradient-to-r from-red-600 to-red-800 text-white border-0 text-xs"
              style={{ backgroundColor: blog.blog_categories?.color || '#dc2626' }}
            >
              {blog.blog_categories?.name || 'Uncategorized'}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors font-montserrat">
            {blog.title}
            {blog.is_pro_membership && (
              <span className="ml-2 text-xs bg-gradient-to-r from-purple-600 to-purple-800 text-white px-2 py-0.5 rounded">
                PRO
              </span>
            )}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 mb-3 font-poppins">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{blog.views}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLikeClick}
                className={`p-1 rounded-full ${isLiked ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
              >
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button 
                onClick={handleBookmarkClick}
                className={`p-1 rounded-full ${isBookmarked ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
              >
                <Bookmark className="w-3 h-3" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm group cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
        {blog.cover_image ? (
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-red-600 opacity-20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge 
            className="bg-gradient-to-r from-red-600 to-red-800 text-white border-0"
            style={{ backgroundColor: blog.blog_categories?.color || '#dc2626' }}
          >
            {blog.blog_categories?.name || 'Uncategorized'}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-red-100 transition-colors font-montserrat">
            {blog.title}
            {blog.is_pro_membership && (
              <span className="ml-2 text-xs bg-gradient-to-r from-purple-600 to-purple-800 text-white px-2 py-0.5 rounded">
                PRO
              </span>
            )}
          </h3>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString()}</span>
          </div>
          <span className="text-red-600 font-medium">{blog.read_time} min read</span>
        </div>
        <p className="text-sm text-slate-700 line-clamp-2 mb-3 font-poppins">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
              <User className="w-3 h-3 text-red-600" />
            </div>
            <span className="text-xs text-slate-600">{blog.author_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLikeClick}
              className={`flex items-center gap-1 text-xs ${isLiked ? 'text-red-600' : 'text-slate-400 hover:text-red-600'}`}
            >
              <ThumbsUp className="w-3 h-3" />
              <span>{blog.likes}</span>
            </button>
            <button 
              onClick={handleBookmarkClick}
              className={`p-1 rounded-full ${isBookmarked ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
            >
              <Bookmark className="w-3 h-3" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}