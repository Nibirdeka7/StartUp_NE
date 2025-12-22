import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Target, Users, TrendingUp, Award, Heart, Lightbulb, Sparkles, ChartLine } from "lucide-react";

export function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We believe in the power of innovation to transform communities and create lasting impact.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Building a supportive ecosystem where entrepreneurs help each other succeed.",
    },
    {
      icon: Heart,
      title: "Northeast Pride",
      description: "Celebrating and empowering the unique entrepreneurial spirit of Northeast India.",
    },
    {
      icon: TrendingUp,
      title: "Sustainable Growth",
      description: "Focusing on long-term, sustainable growth rather than short-term gains.",
    },
  ];

  const team = [
    {
      name: "Gourangon Gogoi",
      role: "Founder & CEO",
      avatar: "",
    },
    {
      name: "John Doe",
      role: "Head of Operations",
      avatar: "",
    },
    {
      name: "Nibir Deka",
      role: "Tech Team",
      avatar: "",
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-white via-red-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16 md:mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <ChartLine className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 font-medium">Our Journey</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-montserrat">
            Empowering Northeast's Entrepreneurial Spirit
          </h1>
          <p className="text-sm md:text-lg text-slate-700 max-w-3xl mx-auto font-poppins">
            Startup Northeast is on a mission to build the most vibrant and supportive 
            startup ecosystem in India's Northeast region, connecting founders with resources, 
            mentorship, and funding to turn their dreams into reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center max-w-6xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-montserrat">Our Story</h2>
            <p className="text-slate-700 leading-relaxed font-poppins">
              Founded in 2023, Startup Northeast emerged from a simple observation: the 
              Northeast region of India is brimming with talented entrepreneurs and innovative 
              ideas, but lacks the structured support system needed to help them thrive.
            </p>
            <p className="text-slate-700 leading-relaxed font-poppins">
              We started with a vision to bridge this gap by creating a comprehensive platform 
              that provides everything a startup needs - from legal and compliance support to 
              funding connections and community networking.
            </p>
            <p className="text-slate-700 leading-relaxed font-poppins">
              Today, we're proud to support over 150+ startups across all eight Northeast 
              states, having facilitated ₹50+ crores in funding and created a thriving 
              community of entrepreneurs, mentors, and investors.
            </p>
          </div>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <Users className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">150+ Startups</h3>
                  <p className="text-red-100">Supported Across Northeast</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-12 md:py-20 mb-12 md:mb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-red-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <Target className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-montserrat">Our Mission</h3>
                <p className="text-slate-700 leading-relaxed font-poppins">
                  To empower every entrepreneur in Northeast India with the resources, 
                  knowledge, and network they need to build successful, sustainable businesses 
                  that create jobs and drive economic growth in the region.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <Award className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-montserrat">Our Vision</h3>
                <p className="text-slate-700 leading-relaxed font-poppins">
                  To establish Northeast India as one of the most dynamic and innovative 
                  startup hubs in Asia, known for breakthrough innovations and successful 
                  enterprises that solve real-world problems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-4 mb-16 md:mb-20">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">Our Core Values</h2>
          <p className="text-slate-700 max-w-2xl mx-auto font-poppins">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="border-2 border-slate-200 hover:border-red-300 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-5 md:p-6 text-center space-y-3 md:space-y-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-red-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 font-montserrat">{value.title}</h3>
                  <p className="text-xs md:text-sm text-slate-600 font-poppins">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team */}
      <div className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">Meet Our Team</h2>
            <p className="text-slate-700 max-w-2xl mx-auto font-poppins">
              Passionate individuals working to make Northeast India's startup dreams come true
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="border-2 border-slate-200 hover:border-red-300 transition-all hover:shadow-lg text-center">
                <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-3xl md:text-4xl mx-auto">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 font-montserrat">{member.name}</h3>
                    <p className="text-sm text-slate-600 font-poppins">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 mt-12 md:mt-20">
        <Card className="bg-gradient-to-r from-red-600 to-red-800 border-0 text-white overflow-hidden">
          <CardContent className="p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 font-montserrat">
              Join Us in Building the Future
            </h2>
            <p className="text-red-100 mb-4 md:mb-6 max-w-2xl mx-auto font-poppins">
              Whether you're a founder, investor, mentor, or supporter, there's a place for you in our community
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button 
                size="lg" 
                className=" text-red-700 hover:bg-red-50 hover:text-red-800 font-semibold px-6 md:px-8 py-3 md:py-4"
              >
                Get Involved
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-6 md:px-8 py-3 md:py-4"
              >
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}