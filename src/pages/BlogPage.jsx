import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { BookOpen, Eye, MessageCircle, Share2, Facebook, Twitter, Send, Sparkles, Calendar, User, ChevronRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const categories = ["all", "Tech", "Startup Tips", "Founder Stories", "Funding", "Legal", "Marketing"];

  const blogs = [
    {
      id: 1,
      title: "How to Raise Your First Seed Round in Northeast India",
      excerpt: "A comprehensive guide for first-time founders navigating the funding landscape in Northeast India's growing startup ecosystem.",
      category: "Funding",
      image: "https://images.unsplash.com/photo-1733925457822-64c3e048fa1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGlubm92YXRpb258ZW58MXx8fHwxNzYzNTM4Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      views: 2341,
      comments: 45,
      date: "Jan 15, 2025",
      author: "Rajesh Kumar",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Building a Sustainable Startup in Rural Northeast",
      excerpt: "Success stories and lessons learned from entrepreneurs creating impact in rural communities across Northeast India.",
      category: "Founder Stories",
      image: "https://images.unsplash.com/photo-1565489030990-e211075fe11c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwYXJ0aWNsZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzYzNTEwMjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      views: 1879,
      comments: 32,
      date: "Jan 12, 2025",
      author: "Priya Sharma",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "Top 10 Tech Tools Every Startup Should Use in 2025",
      excerpt: "Essential technology stack recommendations for early-stage startups to build efficiently and scale faster.",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1733925457822-64c3e048fa1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGlubm92YXRpb258ZW58MXx8fHwxNzYzNTM4Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      views: 3421,
      comments: 67,
      date: "Jan 10, 2025",
      author: "Amit Deka",
      readTime: "6 min",
    },
    {
      id: 4,
      title: "Validating Your Startup Idea: A Northeast Perspective",
      excerpt: "Learn how to test and validate your startup idea in the unique market conditions of Northeast India.",
      category: "Startup Tips",
      image: "https://images.unsplash.com/photo-1565489030990-e211075fe11c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwYXJ0aWNsZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzYzNTEwMjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      views: 2156,
      comments: 41,
      date: "Jan 8, 2025",
      author: "Neha Bora",
      readTime: "8 min",
    },
    {
      id: 5,
      title: "Government Schemes for Northeast Startups You Should Know",
      excerpt: "Complete overview of central and state government schemes specifically designed to support Northeast entrepreneurs.",
      category: "Funding",
      image: "https://images.unsplash.com/photo-1733925457822-64c3e048fa1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGlubm92YXRpb258ZW58MXx8fHwxNzYzNTM4Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      views: 2987,
      comments: 53,
      date: "Jan 5, 2025",
      author: "Vikram Singh",
      readTime: "10 min",
    },
    {
      id: 6,
      title: "From Tea Gardens to Tech: An Assam Founder's Journey",
      excerpt: "Inspiring story of how a traditional tea business owner pivoted to create a successful AgriTech startup.",
      category: "Founder Stories",
      image: "https://images.unsplash.com/photo-1565489030990-e211075fe11c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwYXJ0aWNsZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzYzNTEwMjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      views: 1654,
      comments: 28,
      date: "Jan 3, 2025",
      author: "Ananya Das",
      readTime: "9 min",
    },
  ];

  const filteredBlogs = activeCategory === "all" 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  const featuredBlogs = blogs.slice(0, 3);

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
        </div>

        {/* Featured Section */}
        {/* <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 font-montserrat">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {featuredBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm group cursor-pointer overflow-hidden"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-to-r from-red-600 to-red-800 text-white border-0">
                      {blog.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-red-100 transition-colors font-montserrat">
                      {blog.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{blog.date}</span>
                    </div>
                    <span className="text-red-600 font-medium">{blog.readTime}</span>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2 mb-3 font-poppins">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                        <User className="w-3 h-3 text-red-600" />
                      </div>
                      <span className="text-xs text-slate-600">{blog.author}</span>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Read →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Category Toggle */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 font-montserrat">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-red-300 hover:bg-red-50"
                }`}
              >
                {category === "all" ? "All Posts" : category}
              </button>
            ))}
          </div>
        </div>

        {/* All Blog Grid */}
        <div className="mb-8 md:mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm group cursor-pointer overflow-hidden"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-to-r from-red-600 to-red-800 text-white border-0 text-xs">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors font-montserrat">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3 font-poppins">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{blog.views}</span>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1">
                      Read <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        
      </div>
    </div>
  );
}