// src/pages/BlogPage.jsx
import { useState, useEffect, useRef } from "react";
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
  ThumbsUp, Bookmark, Clock, ArrowRight, Target, Award, Zap, Flame,
  ExternalLink, Heart, BarChart3, Users as UsersIcon, Tag, X,
  ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight } from "../components/ui/hero-highlight";
import { GridBeam } from "../components/ui/GridBeam";

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const featuredScrollRef = useRef(null);
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
        await supabase
          .from('blog_post_likes')
          .delete()
          .match({ post_id: blogId, user_id: user.id });
      } else {
        await supabase
          .from('blog_post_likes')
          .insert({ post_id: blogId, user_id: user.id });
      }
      
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
        await supabase
          .from('blog_bookmarks')
          .delete()
          .match({ post_id: blogId, user_id: user.id });
      } else {
        await supabase
          .from('blog_bookmarks')
          .insert({ post_id: blogId, user_id: user.id });
      }
    } catch (error) {
      console.error('Error bookmarking post:', error);
    }
  };

  const featuredBlogs = blogs.filter(blog => blog.is_featured).slice(0, 3);
  const hasActiveFilters = searchQuery || activeCategory !== "all" || sortBy !== "newest";

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("newest");
  };

  const scrollFeatured = (direction) => {
    if (featuredScrollRef.current) {
      const scrollAmount = 300;
      featuredScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-blue-50/30">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-slate-100/30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
      </div>

      <GridBeam>
        <div className="relative container mx-auto px-4 py-8 md:py-20">
          
          {/* Hero Header - Mobile Optimized */}
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-red-200/50 shadow-sm mb-6 md:mb-8"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <img src="Startup_NE.png" alt="Startup NE Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs md:text-sm font-medium text-slate-800 font-poppins">
                Knowledge Hub & Founder Stories
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 font-montserrat tracking-tight"
            >
              <span className="block bg-gradient-to-r from-red-800 to-red-900 bg-clip-text text-transparent text-2xl md:text-5xl">
                Startup Insights
              </span>
              <span className="block text-slate-900 mt-1 md:mt-2 text-xl md:text-4xl">
                From the <Highlight className="text-red-700">Northeast Ecosystem</Highlight>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-poppins px-2 md:px-0"
            >
              Expert insights, founder success stories, and practical guides for ambitious entrepreneurs building in Northeast India.
            </motion.div>

           
          </div>

          {/* Premium Search & Filter Bar - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-2 md:top-4 z-20 mb-8 md:mb-12"
          >
            <Card className="border-2 border-white/80 bg-white/95 backdrop-blur-xl shadow-lg md:shadow-2xl shadow-red-100/50">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
                  {/* Search Bar */}
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search insights, stories..."
                        className="pl-9 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 w-full rounded-xl border-slate-300 focus:border-red-300 focus:ring-2 focus:ring-red-100 text-sm md:text-base"
                      />
                    </div>
                  </div>
                  
                  {/* Desktop Filters */}
                  <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                    <Select value={activeCategory} onValueChange={setActiveCategory}>
                      <SelectTrigger className="w-40 lg:w-48 rounded-xl border-slate-300">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span className="truncate text-sm">
                            {activeCategory === "all" ? "All Categories" : 
                              categories.find(c => c.id === activeCategory)?.name || "Category"}
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: category.color }}
                              />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40 lg:w-48 rounded-xl border-slate-300">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          <span className="text-sm">Sort by</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="trending">Trending</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Write Blog Button */}
                    {canCreateBlog && (
                      <Button
                        onClick={() => navigate('/blog/create')}
                        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg shadow-red-200 gap-2 text-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Write Article
                      </Button>
                    )}
                  </div>

                  {/* Mobile Filter Button */}
                  <div className="flex items-center gap-2 w-full md:hidden">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl border-slate-300 text-sm"
                      onClick={() => setShowMobileFilters(!showMobileFilters)}
                    >
                      <Filter className="w-3.5 h-3.5 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {[searchQuery, activeCategory, sortBy].filter(f => f && f !== "all" && f !== "newest").length}
                        </span>
                      )}
                    </Button>
                    
                    {canCreateBlog && (
                      <Button
                        onClick={() => navigate('/blog/create')}
                        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 gap-2 text-sm"
                        size="sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Write
                      </Button>
                    )}
                  </div>
                </div>

                {/* Mobile Filters Dropdown */}
                <AnimatePresence>
                  {showMobileFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="md:hidden mt-4 p-3 bg-slate-50 rounded-xl space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <Select value={activeCategory} onValueChange={setActiveCategory}>
                          <SelectTrigger className="w-full text-sm">
                            <span className="text-xs">Category</span>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-full text-sm">
                            <span className="text-xs">Sort by</span>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="trending">Trending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {hasActiveFilters && (
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-xs text-slate-600">
                            {filteredBlogs.length} results
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-red-600 hover:text-red-700 text-xs"
                          >
                            Clear all
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Filters - Mobile Optimized */}
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t border-slate-100"
                  >
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-xs text-slate-600 mr-1">Filters:</span>
                      {searchQuery && (
                        <Badge variant="secondary" className="gap-1 px-2 py-1 text-xs">
                          "{searchQuery}"
                          <button onClick={() => setSearchQuery("")} className="ml-0.5 hover:text-red-600">
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </Badge>
                      )}
                      {activeCategory !== "all" && (
                        <Badge variant="secondary" className="gap-1 px-2 py-1 text-xs">
                          {categories.find(c => c.id === activeCategory)?.name}
                          <button onClick={() => setActiveCategory("all")} className="ml-0.5 hover:text-red-600">
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </Badge>
                      )}
                      {sortBy !== "newest" && (
                        <Badge variant="secondary" className="gap-1 px-2 py-1 text-xs">
                          {sortBy}
                          <button onClick={() => setSortBy("newest")} className="ml-0.5 hover:text-red-600">
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                      >
                        Clear all
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Section - Horizontal Scroll on Mobile */}
          {featuredBlogs.length > 0 && (
            <div className="mb-12 md:mb-16">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-1 md:mb-2 font-montserrat">
                    Featured Insights
                  </h2>
                  <p className="text-xs md:text-sm text-slate-600 font-poppins">
                    Must-read articles from our top contributors
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                  <Flame className="w-4 h-4" />
                  <span>Trending this week</span>
                </div>
              </div>
              
              {/* Desktop Grid Layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBlogs.map((blog, index) => (
                  <BlogCard 
                    key={blog.id} 
                    blog={blog} 
                    user={user}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    featured
                    index={index}
                  />
                ))}
              </div>

              {/* Mobile Horizontal Scroll Layout */}
              <div className="md:hidden relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                  <button
                    onClick={() => scrollFeatured('left')}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-red-600 hover:border-red-300 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
                
                <div 
                  ref={featuredScrollRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {featuredBlogs.map((blog, index) => (
                    <div key={blog.id} className="flex-none w-[280px] snap-center">
                      <BlogCard 
                        blog={blog} 
                        user={user}
                        onLike={handleLike}
                        onBookmark={handleBookmark}
                        featured
                        index={index}
                        mobile
                      />
                    </div>
                  ))}
                </div>
                
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                  <button
                    onClick={() => scrollFeatured('right')}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-red-600 hover:border-red-300 transition-all"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Scroll indicator dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {featuredBlogs.map((_, index) => (
                    <div 
                      key={index}
                      className="w-1.5 h-1.5 rounded-full bg-slate-300"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category Toggle - Mobile Optimized */}
          <div className="mb-8 md:mb-12">
            <div className="flex overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:gap-2 md:overflow-visible">
              <button
                onClick={() => setActiveCategory("all")}
                className={`flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-red-300 hover:bg-red-50"
                } mr-2 md:mr-0`}
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-red-300 hover:bg-red-50"
                  } mr-2 md:mr-0`}
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

          {/* All Articles Grid */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-1 md:mb-2 font-montserrat">
                  Latest Articles
                </h2>
                <p className="text-xs md:text-sm text-slate-600 font-poppins">
                  Fresh insights and stories from the ecosystem
                </p>
              </div>
              <div className="text-xs md:text-sm text-slate-500">
                {loading ? "Loading..." : `${filteredBlogs.length} articles`}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12 md:py-20">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-red-100 to-red-200 animate-pulse mb-3 md:mb-4 mx-auto flex items-center justify-center">
                      <BookOpen className="w-5 h-5 md:w-8 md:h-8 text-red-400" />
                    </div>
                    {/* <div className="absolute inset-0 border-3 md:border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div> */}
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold text-slate-700 mt-3 md:mt-4">Loading Insights</h3>
                  <p className="text-xs md:text-slate-500">Fetching the latest articles...</p>
                </div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <Card className="text-center py-8 md:py-16 border-2 border-dashed border-slate-300 bg-gradient-to-br from-white to-slate-50/50">
                <CardContent className="p-4 md:p-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-semibold text-slate-700 mb-2 md:mb-3">No articles found</h3>
                  <p className="text-sm md:text-slate-500 mb-4 md:mb-6 max-w-md mx-auto px-2">
                    {hasActiveFilters 
                      ? "Try adjusting your filters or search term."
                      : "Be the first to contribute your insights!"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                    {hasActiveFilters && (
                      <Button 
                        onClick={clearFilters} 
                        variant="outline" 
                        className="border-slate-300 hover:border-red-300 text-xs md:text-sm"
                      >
                        Clear filters
                      </Button>
                    )}
                    {canCreateBlog && (
                      <Button 
                        onClick={() => navigate('/blog/create')}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-200 text-xs md:text-sm"
                      >
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Write First Article
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard 
                    key={blog.id} 
                    blog={blog} 
                    user={user}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredBlogs.length > 9 && (
              <div className="text-center mt-8 md:mt-12">
                <Button
                  variant="outline"
                  className="border-2 border-red-300 hover:border-red-600 hover:bg-red-50 text-red-700 hover:text-red-800 font-semibold px-6 md:px-8 py-4 md:py-6 rounded-xl transition-all duration-300 text-sm md:text-base"
                >
                  Load More Articles
                  <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* CTA Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-red-500/10 via-blue-500/10 to-red-500/10 rounded-2xl md:rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-r from-red-700 to-red-900 rounded-xl md:rounded-2xl border border-red-600/20 p-6 md:p-8 lg:p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
              
              <div className="relative z-10">
                <BookOpen className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-white/20" />
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 font-montserrat">
                  Share Your Startup Journey
                </h2>
                <p className="text-sm md:text-lg text-red-100 mb-6 md:mb-8 max-w-2xl mx-auto font-poppins">
                  Contribute your insights and help build a knowledge-rich ecosystem. 
                  Your story could inspire the next generation of entrepreneurs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  {canCreateBlog ? (
                    <Button
                      onClick={() => navigate('/blog/create')}
                      className="bg-white text-red-700 hover:bg-red-50 font-bold px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg rounded-xl shadow-xl md:shadow-2xl shadow-white/20 hover:shadow-white/30 transition-all duration-300 group"
                    >
                      Start Writing
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => navigate('/login')}
                      className="bg-white text-red-700 hover:bg-red-50 font-bold px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg rounded-xl shadow-xl md:shadow-2xl shadow-white/20 hover:shadow-white/30 transition-all duration-300 group"
                    >
                      Join to Contribute
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    className="border border-white/30 bg-white/10 hover:bg-white/20 text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg rounded-xl backdrop-blur-sm"
                    onClick={() => navigate('/blog/subscribe')}
                  >
                    <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </GridBeam>
    </div>
  );
}

// Enhanced Blog Card Component with Mobile Support
function BlogCard({ blog, user, onLike, onBookmark, featured = false, index = 0, mobile = false }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isProMember] = useState(user?.is_pro_member || false);

  useEffect(() => {
    if (user) {
      setIsLiked(blog.user_liked || false);
      setIsBookmarked(blog.user_bookmarked || false);
    }
  }, [user, blog]);

  const handleClick = () => {
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

  const getCategoryColor = () => {
    return blog.blog_categories?.color || '#dc2626';
  };

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: mobile ? 0 : -5 }}
        className="group h-full"
      >
        <Card
          className={`border-2 border-slate-200 hover:border-red-300 transition-all duration-300 bg-white/80 backdrop-blur-sm group cursor-pointer overflow-hidden h-full ${
            mobile ? 'hover:shadow-lg' : 'hover:shadow-xl hover:shadow-red-100/50'
          }`}
          onClick={handleClick}
        >
          <div className="relative h-40 md:h-52 overflow-hidden bg-gradient-to-br from-red-100/50 to-blue-100/50">
            {blog.cover_image ? (
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 md:w-16 md:h-16 text-red-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge 
                className="bg-gradient-to-r from-red-600 to-red-800 text-white border-0 shadow-md text-xs"
                style={{ backgroundColor: getCategoryColor() }}
              >
                {blog.blog_categories?.name || 'Featured'}
              </Badge>
            </div>
            {blog.is_featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-gradient-to-r from-amber-600 to-amber-800 text-white border-0 shadow-md text-xs">
                  <Sparkles className="w-2.5 h-2.5 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 md:mb-3">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs">{new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{blog.read_time || '5'} min</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-base md:text-xl font-bold text-slate-900 mb-2 md:mb-3 font-montserrat group-hover:text-red-700 transition-colors line-clamp-2">
              {blog.title}
              {blog.is_pro_membership && (
                <span className="ml-1 text-xs bg-gradient-to-r from-purple-600 to-purple-800 text-white px-1.5 py-0.5 rounded">
                  PRO
                </span>
              )}
            </h3>
            
            <p className="text-xs md:text-slate-600 mb-3 md:mb-4 font-poppins line-clamp-2">
              {blog.excerpt || "Read this insightful article from our ecosystem..."}
            </p>
            
            <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center shadow-sm">
                  <User className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-medium text-slate-900 truncate max-w-[80px] md:max-w-none">
                    {blog.author_name || 'Startup NE'}
                  </div>
                  <div className="text-xs text-slate-500 hidden md:block">Author</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-3">
                <button 
                  onClick={handleLikeClick}
                  className={`flex items-center gap-1 md:gap-2 text-xs ${isLiked ? 'text-red-600' : 'text-slate-400 hover:text-red-600'}`}
                >
                  <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isLiked ? 'fill-red-600' : ''}`} />
                  <span className="hidden md:inline">{blog.likes || 0}</span>
                </button>
                <button 
                  onClick={handleBookmarkClick}
                  className={`p-1 md:p-1.5 rounded-lg ${isBookmarked ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
                >
                  <Bookmark className={`w-3 h-3 md:w-4 md:h-4 ${isBookmarked ? 'fill-red-600' : ''}`} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="group h-full"
    >
      <Card
        className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm group cursor-pointer overflow-hidden h-full"
        onClick={handleClick}
      >
        <div className="relative h-32 md:h-40 overflow-hidden bg-gradient-to-br from-red-50 to-red-100">
          {blog.cover_image ? (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-red-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-2 md:top-3 left-2 md:left-3">
            <Badge 
              className="bg-gradient-to-r from-red-600 to-red-800 text-white border-0 text-xs shadow-sm"
              style={{ backgroundColor: getCategoryColor() }}
            >
              {blog.blog_categories?.name || 'Article'}
            </Badge>
          </div>
          {blog.is_pro_membership && (
            <div className="absolute top-2 md:top-3 right-2 md:right-3">
              <Badge className="bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0 text-xs shadow-sm">
                PRO
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-3 md:p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 md:mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
              <span className="text-xs">{new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
              <span className="text-xs">{blog.read_time || '5'} min</span>
            </div>
          </div>
          
          <h3 className="text-sm md:text-lg font-bold text-slate-900 mb-1 md:mb-2 font-montserrat group-hover:text-red-700 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          
          <p className="text-xs md:text-sm text-slate-600 mb-2 md:mb-3 font-poppins line-clamp-2">
            {blog.excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <User className="w-2.5 h-2.5 md:w-3 md:h-3 text-red-600" />
              </div>
              <span className="text-xs text-slate-600 truncate max-w-[70px] md:max-w-[80px]">
                {blog.author_name || 'Startup NE'}
              </span>
            </div>
            
            <div className="flex items-center gap-1 md:gap-2">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Eye className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="hidden md:inline">{blog.views || 0}</span>
              </div>
              <button 
                onClick={handleLikeClick}
                className={`p-1 rounded-full ${isLiked ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
              >
                <Heart className={`w-2.5 h-2.5 md:w-3 md:h-3 ${isLiked ? 'fill-red-600' : ''}`} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}