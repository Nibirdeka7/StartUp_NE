// src/pages/MyBlogsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { canUserCreateBlog } from "../utils/blogUtils";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { 
  BookOpen, Eye, Edit2, Trash2, Plus, Loader2, 
  Calendar, TrendingUp, FileText, BarChart
} from "lucide-react";
import { toast } from "sonner";

export function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [canCreate, setCanCreate] = useState(false);
  const navigate = useNavigate();

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
        setCanCreate(canUserCreateBlog(role));
        
        if (!canUserCreateBlog(role)) {
          toast.error("You don't have permission to manage blogs");
          navigate('/blog');
          return;
        }
        
        fetchBlogs();
      } else {
        navigate('/login');
      }
    };
    
    checkUser();
  }, [navigate]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (
            name,
            color
          )
        `)
        .order('created_at', { ascending: false });

      // If not admin, only show own blogs
      if (userRole !== 'admin') {
        query = query.eq('author_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', blogId);

      if (error) throw error;
      
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Published</Badge>;
      case 'draft':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Draft</Badge>;
      case 'archived':
        return <Badge className="bg-slate-100 text-slate-800 border-slate-300">Archived</Badge>;
      default:
        return null;
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
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Blogs</h1>
            <p className="text-slate-600">
              Manage your blog posts and track their performance
            </p>
          </div>
          
          <Button
            onClick={() => navigate('/blog/create')}
            className="gap-2 bg-gradient-to-r from-red-600 to-red-800"
          >
            <Plus className="w-4 h-4" />
            New Blog
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Posts</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {blogs.length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Published</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {blogs.filter(b => b.status === 'published').length}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Views</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)}
                  </p>
                </div>
                <BarChart className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Likes</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blogs Table */}
        <Card className="border-2 border-slate-200">
          <CardContent className="p-0">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No blogs yet</h3>
                <p className="text-slate-500 mb-6">Start writing your first blog post</p>
                <Button onClick={() => navigate('/blog/create')}>
                  Create Your First Blog
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-slate-700">Title</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Category</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Views</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Likes</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Date</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-4">
                          <div>
                            <h4 className="font-medium text-slate-900 line-clamp-1">
                              {blog.title}
                            </h4>
                            {blog.is_pro_membership && (
                              <span className="text-xs text-purple-600">PRO</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge 
                            className="text-xs"
                            style={{ 
                              backgroundColor: `${blog.blog_categories?.color}20`,
                              borderColor: blog.blog_categories?.color,
                              color: blog.blog_categories?.color 
                            }}
                          >
                            {blog.blog_categories?.name || 'Uncategorized'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(blog.status)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">{blog.views || 0}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">{blog.likes || 0}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">
                              {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/blog/${blog.slug}`)}
                              className="text-slate-600"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/blog/edit/${blog.id}`)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(blog.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}