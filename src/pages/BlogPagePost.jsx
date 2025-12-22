// src/pages/BlogPostPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { canUserEditBlog, canUserViewProContent } from "../utils/blogUtils";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { Textarea } from "../components/ui/textarea";
import { 
  ArrowLeft, Calendar, User, Eye, MessageCircle, Share2, 
  Facebook, Twitter, Linkedin, Send, Clock, Bookmark, 
  Printer, Sparkles, ThumbsUp, Edit2, Lock, Loader2,
  Crown, CheckCircle, Heart, SendHorizonal
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [userProStatus, setUserProStatus] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [userLikes, setUserLikes] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role, is_pro_member, pro_member_until')
          .eq('id', user.id)
          .single();
        
        setUserRole(userData?.role || 'user');
        // Check if user has valid pro membership
        const isProMember = userData?.is_pro_member && 
          (!userData.pro_member_until || new Date(userData.pro_member_until) > new Date());
        setUserProStatus(isProMember || userData?.role === 'admin');
      }
    };
    
    checkUser();
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
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
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;

      setBlog(data);
      setLikesCount(data.likes || 0);
      
      // Check edit permissions
      if (user) {
        setCanEdit(canUserEditBlog(data, { id: user.id, role: userRole }));
      }

      // Fetch comments, likes, and bookmarks in parallel
      await Promise.all([
        fetchComments(data.id),
        checkUserLike(data.id),
        checkUserBookmark(data.id)
      ]);
      
      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);

    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Blog not found');
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const checkUserLike = async (postId) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('blog_post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking like:', error);
        return;
      }
      
      setIsLiked(!!data);
    } catch (error) {
      console.error('Error checking like:', error);
    }
  };

  const checkUserBookmark = async (postId) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('blog_bookmarks')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking bookmark:', error);
        return;
      }
      
      setIsBookmarked(!!data);
    } catch (error) {
      console.error('Error checking bookmark:', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select(`
          *,
          users:user_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Format comments data
      const formattedComments = data.map(comment => ({
        ...comment,
        user_name: comment.users?.full_name || comment.user_name || 'Anonymous',
        user_avatar: comment.users?.avatar_url || comment.user_avatar || ''
      }));
      
      setComments(formattedComments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('Please sign in to like this post');
      navigate('/login');
      return;
    }

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('blog_post_likes')
          .delete()
          .eq('post_id', blog.id)
          .eq('user_id', user.id);

        if (error) throw error;
        
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
        
        // Update blog post likes count
        await supabase
          .from('blog_posts')
          .update({ likes: likesCount - 1 })
          .eq('id', blog.id);
          
        toast.success('Like removed');
      } else {
        // Like
        const { error } = await supabase
          .from('blog_post_likes')
          .insert({
            post_id: blog.id,
            user_id: user.id
          });

        if (error) throw error;
        
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
        
        // Update blog post likes count
        await supabase
          .from('blog_posts')
          .update({ likes: likesCount + 1 })
          .eq('id', blog.id);
          
        toast.success('Post liked!');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      
      if (error.code === '23505') {
        // Unique constraint violation - already liked
        setIsLiked(true);
        toast.info('You have already liked this post');
      } else {
        toast.error('Failed to update like');
      }
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error('Please sign in to bookmark this post');
      navigate('/login');
      return;
    }

    try {
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('blog_bookmarks')
          .delete()
          .eq('post_id', blog.id)
          .eq('user_id', user.id);

        if (error) throw error;
        
        setIsBookmarked(false);
        toast.success('Removed from bookmarks');
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('blog_bookmarks')
          .insert({
            post_id: blog.id,
            user_id: user.id
          });

        if (error) throw error;
        
        setIsBookmarked(true);
        toast.success('Added to bookmarks');
      }
    } catch (error) {
      console.error('Error bookmarking post:', error);
      
      if (error.code === '23505') {
        // Unique constraint violation - already bookmarked
        setIsBookmarked(true);
        toast.info('Already bookmarked');
      } else {
        toast.error('Failed to update bookmark');
      }
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to comment');
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setSubmitting(true);
    try {
      // Get user profile
      const { data: userProfile } = await supabase
        .from('users')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single();

      const commentData = {
        post_id: blog.id,
        user_id: user.id,
        user_name: userProfile?.full_name || user.email?.split('@')[0] || 'Anonymous',
        user_avatar: userProfile?.avatar_url || '',
        content: comment.trim(),
        is_approved: userRole === 'admin' // Auto-approve admin comments
      };

      const { data, error } = await supabase
        .from('blog_comments')
        .insert([commentData])
        .select()
        .single();

      if (error) throw error;

      // Add the new comment to the list
      const newComment = {
        ...data,
        users: {
          full_name: commentData.user_name,
          avatar_url: commentData.user_avatar
        }
      };
      
      setComments(prev => [newComment, ...prev]);
      setComment("");
      
      toast.success(
        userRole === 'admin' 
          ? 'Comment posted!' 
          : 'Comment submitted! ' + (userRole === 'founder' ? 'It will appear after approval.' : '')
      );
      
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog.title;
    const excerpt = blog.excerpt || 'Check out this blog post!';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(excerpt)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Markdown components for ReactMarkdown
  const markdownComponents = {
    h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-slate-900 mt-8 mb-4 font-montserrat" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-900 mt-6 mb-3 font-montserrat" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-slate-900 mt-5 mb-2 font-montserrat" {...props} />,
    p: ({node, ...props}) => <p className="text-slate-700 leading-relaxed mb-4 font-poppins" {...props} />,
    a: ({node, ...props}) => <a className="text-red-600 hover:text-red-700 underline" target="_blank" rel="noopener noreferrer" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-slate-700 space-y-2" {...props} />,
    li: ({node, ...props}) => <li className="mb-1" {...props} />,
    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-red-300 pl-4 italic text-slate-600 my-4 py-2" {...props} />,
    code: ({node, inline, ...props}) => 
      inline ? 
        <code className="bg-slate-100 text-red-600 px-2 py-1 rounded text-sm font-mono" {...props} /> :
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4"><code className="text-sm font-mono" {...props} /></pre>,
    img: ({node, ...props}) => <img className="rounded-lg my-6 max-w-full h-auto shadow-md" {...props} />,
  };

  // Check if user can view the blog content
  const canViewContent = () => {
    if (!blog) return false;
    
    if (!blog.is_pro_membership) return true;
    
    return userProStatus || userRole === 'admin';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Blog not found</h2>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const contentVisible = canViewContent();

  return (
    <div className="min-h-screen py-8 md:py-12 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="gap-2 text-slate-600 hover:text-red-600 hover:bg-red-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
          
          {canEdit && (
            <Button
              onClick={() => navigate(`/blog/edit/${blog.id}`)}
              variant="outline"
              className="gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          )}
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge 
              className="text-white border-0 px-3 py-1.5"
              style={{ backgroundColor: blog.blog_categories?.color || '#dc2626' }}
            >
              {blog.blog_categories?.name || 'Uncategorized'}
            </Badge>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                  }`}
                  title={isLiked ? 'Unlike' : 'Like this post'}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{likesCount}</span>
                </button>
                
                <button 
                  onClick={handleBookmark}
                  className={`p-2 rounded-full ${
                    isBookmarked 
                      ? 'text-red-600 bg-red-50 border border-red-200' 
                      : 'text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200'
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark this post'}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-montserrat">
            {blog.title}
            {blog.is_pro_membership && (
              <span className="ml-3 text-sm bg-gradient-to-r from-purple-600 to-purple-800 text-white px-3 py-1 rounded-full inline-flex items-center gap-1">
                <Crown className="w-3 h-3" />
                PRO
              </span>
            )}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-slate-900">{blog.author_name}</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{blog.views || 0} views</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{comments.length} comments</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.read_time} min read</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-100">
            <span className="text-sm font-medium text-slate-700">Share:</span>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleShare('facebook')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors shadow-sm"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-sky-400 hover:bg-sky-50 flex items-center justify-center transition-colors shadow-sm"
                title="Share on Twitter"
              >
                <Twitter className="w-4 h-4 text-sky-500" />
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-700 hover:bg-blue-50 flex items-center justify-center transition-colors shadow-sm"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-blue-700" />
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href).then(() => toast.success('Link copied!'))}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 flex items-center justify-center transition-colors shadow-sm"
                title="Copy link"
              >
                <Send className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {blog.cover_image && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-auto max-h-[500px] object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Article Content */}
        <Card className="mb-8 border-2 border-slate-200 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6 md:p-8">
            {!contentVisible && blog.is_pro_membership ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mb-4">
                    <Lock className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Premium Content Locked</h3>
                  <p className="text-slate-600 max-w-md mx-auto mb-6">
                    This article is part of our Pro membership. Upgrade to access premium content.
                  </p>
                </div>
                <Button
                  onClick={() => navigate('/upgrade')}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold gap-3 px-8"
                >
                  <Crown className="w-5 h-5" />
                  Upgrade to Pro
                </Button>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="border-2 border-slate-200 bg-white/80 backdrop-blur-sm shadow-md">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-xl font-bold text-slate-900 font-montserrat">
                  Comments ({comments.length})
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="font-medium">{likesCount}</span>
                </button>
              </div>
            </div>

            {/* Comment Form */}
            {user ? (
              <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Leave a Comment</h4>
                <div className="mb-4">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts, questions, or feedback..."
                    rows={4}
                    className="w-full bg-white resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-slate-500">
                      {comment.length}/1000 characters
                    </p>
                    <p className="text-xs text-slate-500">
                      {userRole === 'admin' ? 'Posted immediately' : 'Moderated'}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={submitting || !comment.trim() || comment.length > 1000}
                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <SendHorizonal className="w-4 h-4" />
                        Post Comment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Join the Conversation</h4>
                <p className="text-slate-600 mb-6">
                  Sign in to share your thoughts and engage with other readers
                </p>
                <Button 
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-red-600 to-red-800"
                >
                  Sign In to Comment
                </Button>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 p-4 border border-slate-200 rounded-xl hover:border-red-300 transition-colors bg-white">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {comment.user_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{comment.user_name}</span>
                        {comment.user_id === blog.author_id && (
                          <Badge className="text-xs bg-gradient-to-r from-red-600 to-red-800 text-white">
                            Author
                          </Badge>
                        )}
                        {userRole === 'admin' && (
                          <Badge className="text-xs bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                            Admin
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-700 whitespace-pre-line">{comment.content}</p>
                  </div>
                </div>
              ))}
              
              {comments.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-10 h-10 text-slate-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">No comments yet</h4>
                  <p className="text-slate-500">
                    Be the first to share your thoughts on this article!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}