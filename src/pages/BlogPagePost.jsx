import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { ArrowLeft, Calendar, User, Eye, MessageCircle, Share2, Facebook, Twitter, Linkedin, Send, Clock, Bookmark, Printer, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  // Mock blog data - in real app, fetch based on id
  const blog = {
    id: id || 1,
    title: "How to Raise Your First Seed Round in Northeast India",
    category: "Funding",
    image: "https://images.unsplash.com/photo-1733925457822-64c3e048fa1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGlubm92YXRpb258ZW58MXx8fHwxNzYzNTM4Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "January 15, 2025",
    author: "Rajesh Kumar",
    views: 2341,
    comments: 45,
    readTime: "8 min read",
    content: `
      <p class="mb-6 text-lg text-slate-700 leading-relaxed">Raising your first seed round can be daunting, especially in the emerging ecosystem of Northeast India. However, with the right approach and understanding of the local landscape, it's entirely achievable.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4 font-montserrat">Understanding the Northeast Funding Landscape</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">The Northeast region has seen significant growth in startup funding over the past few years. With increased government support and growing investor interest, founders now have more opportunities than ever before.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4 font-montserrat">Key Steps to Secure Seed Funding</h2>
      
      <h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3 font-montserrat">1. Build a Strong Foundation</h3>
      <p class="mb-3 text-slate-700 leading-relaxed">Before approaching investors, ensure you have:</p>
      <ul class="list-disc pl-6 mb-6 text-slate-700 space-y-2">
        <li>A validated business model</li>
        <li>Clear market understanding</li>
        <li>Initial traction or MVP</li>
        <li>A capable founding team</li>
      </ul>

      <h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3 font-montserrat">2. Create a Compelling Pitch Deck</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Your pitch deck should clearly communicate your vision, market opportunity, solution, business model, traction, and financial projections. Keep it concise yet comprehensive.</p>

      <h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3 font-montserrat">3. Identify the Right Investors</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Look for investors who understand the Northeast market and have experience in your sector. Angel investors and early-stage VCs who have previously invested in the region are often more receptive.</p>

      <h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3 font-montserrat">4. Leverage Government Schemes</h3>
      <p class="mb-3 text-slate-700 leading-relaxed">The Northeast has several government initiatives supporting startups, including:</p>
      <ul class="list-disc pl-6 mb-6 text-slate-700 space-y-2">
        <li>North East Venture Fund (NEVF)</li>
        <li>Startup India Seed Fund Scheme</li>
        <li>State-specific startup policies</li>
      </ul>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4 font-montserrat">Common Mistakes to Avoid</h2>
      <p class="mb-3 text-slate-700 leading-relaxed">Many first-time founders make these mistakes:</p>
      <ul class="list-disc pl-6 mb-6 text-slate-700 space-y-2">
        <li>Approaching investors too early without proper preparation</li>
        <li>Unrealistic valuations</li>
        <li>Lack of focus on unit economics</li>
        <li>Ignoring local market dynamics</li>
      </ul>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4 font-montserrat">Success Stories from the Region</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Several startups from Northeast India have successfully raised seed rounds, including AgroTech NE, which secured ₹5 crores, and HealthConnect NE, which raised ₹3 crores. Their success demonstrates the growing confidence of investors in the region.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4 font-montserrat">Conclusion</h2>
      <p class="mb-6 text-slate-700 leading-relaxed">Raising your first seed round in Northeast India requires preparation, persistence, and understanding of the local ecosystem. With the right approach and leveraging available resources, you can successfully secure funding for your startup.</p>
    `,
  };

  const comments = [
    {
      id: 1,
      author: "Priya Sharma",
      date: "2 days ago",
      text: "Great insights! This is exactly what I needed. Planning to apply to NEVF next month.",
      avatar: "PS",
    },
    {
      id: 2,
      author: "Amit Deka",
      date: "3 days ago",
      text: "Very helpful article. Would love to see more content on connecting with angel investors in the region.",
      avatar: "AD",
    },
    {
      id: 3,
      author: "Neha Bora",
      date: "4 days ago",
      text: "Thanks for sharing this. The section on common mistakes is particularly valuable.",
      avatar: "NB",
    },
  ];

  const handleSubmitComment = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    setComment("");
  };

  return (
    <div className="min-h-screen py-8 md:py-12 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/blog")}
          className="mb-6 gap-2 text-slate-600 hover:text-red-600 hover:bg-red-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-gradient-to-r from-red-600 to-red-800 text-white border-0">
              {blog.category}
            </Badge>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600">
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-montserrat">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <User className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-slate-900">{blog.author}</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{blog.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{blog.comments} comments</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap items-center gap-3 bg-red-50 p-4 rounded-xl">
            <span className="text-sm font-medium text-slate-700">Share this article:</span>
            <div className="flex flex-wrap gap-2">
              <button className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-red-300 hover:bg-red-100 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-blue-600" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-red-300 hover:bg-red-100 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-sky-500" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-red-300 hover:bg-red-100 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-blue-700" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-red-300 hover:bg-red-100 flex items-center justify-center transition-colors">
                <Send className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-white opacity-20" />
          </div>
        </div>

        {/* Article Content */}
        <Card className="mb-8 border-2 border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </CardContent>
        </Card>

        {/* Author Bio */}
        <Card className="mb-8 border-2 border-red-200 bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-xl font-bold">
                {blog.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">About the Author</h3>
                <p className="text-slate-700">
                  {blog.author} is an experienced startup mentor and investor with over 10 years of experience 
                  in the Northeast startup ecosystem. He has helped 50+ startups raise funding and scale their operations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="border-2 border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-bold text-slate-900 font-montserrat">
                Comments ({comments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-red-50 rounded-xl border border-red-200">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Leave a Comment</h4>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full p-4 rounded-lg border border-slate-300 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all font-poppins mb-4"
              />
              <Button 
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold"
              >
                Post Comment
              </Button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 p-4 border border-slate-200 rounded-xl hover:border-red-300 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900">{comment.author}</span>
                      <span className="text-xs text-slate-500">{comment.date}</span>
                    </div>
                    <p className="text-slate-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}