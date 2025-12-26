import { Button } from "../components/ui/Button";
import { 
  Target, 
  Users, 
  TrendingUp, 
  Award, 
  Heart, 
  Lightbulb, 
  Sparkles, 
  ChartLine, 
  MapPin, 
  Globe, 
  Zap, 
  Leaf,
  Building,
  Rocket,
  Shield,
  ArrowRight,
  Star,
  Target as TargetIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { GridBeam } from "../components/ui/GridBeam";
import { Highlight } from "../components/ui/hero-highlight";

export function AboutPage() {
  const values = [
    {
      icon: TargetIcon,
      title: "Precision Execution",
      description: "Strategic focus combined with flawless execution to turn vision into reality.",
      gradient: "from-red-600 to-red-800",
      bg: "bg-gradient-to-br from-red-50 to-red-100"
    },
    {
      icon: Users,
      title: "Collective Excellence",
      description: "Where individual brilliance meets collaborative genius for exponential impact.",
      gradient: "from-blue-600 to-blue-800",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100"
    },
    {
      icon: TrendingUp,
      title: "Measured Growth",
      description: "Sustainable scaling with data-driven decisions and market intelligence.",
      gradient: "from-red-700 to-amber-700",
      bg: "bg-gradient-to-br from-amber-50 to-red-50"
    },
    {
      icon: Shield,
      title: "Integrity First",
      description: "Uncompromising ethics and transparency in every partnership and transaction.",
      gradient: "from-blue-700 to-cyan-700",
      bg: "bg-gradient-to-br from-cyan-50 to-blue-50"
    },
  ];

  const team = [
    {
      name: "Gourangon Gogoi",
      role: "Founder & CEO",
      expertise: "Ecosystem Architecture & Strategy",
      initials: "GG",
      gradient: "from-red-700 to-red-900"
    },
    {
      name: "John Doe",
      role: "Head of Operations",
      expertise: "Growth Strategy & Execution",
      initials: "JD",
      gradient: "from-blue-700 to-blue-900"
    },
    {
      name: "Nibir Deka",
      role: "Technology Director",
      expertise: "Digital Infrastructure & Innovation",
      initials: "ND",
      gradient: "from-red-600 to-blue-600"
    }
  ];

  const milestones = [
    { 
      year: "2025", 
      title: "Foundation", 
      description: "Platform conceptualized & MVP developed",
      stat: "25 Startups",
      icon: Building
    },
    { 
      year: "2026", 
      title: "Launch & Traction", 
      description: "Official launch",
      stat: "70+ Startups",
      icon: Rocket
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-blue-50/20">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-slate-100/30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
      </div>

      <GridBeam>
        <div className="relative container mx-auto px-4 py-24 md:py-12">
          
          {/* Hero Section - Premium Introduction */}
          <div className="text-center max-w-4xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-red-200/50 shadow-sm mb-8"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <img src="Startup_NE.png" alt="Startup NE Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-sm font-medium text-slate-800 font-poppins">
                Pioneering Northeast's Startup Renaissance
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-montserrat tracking-tight"
            >
              <span className="block bg-gradient-to-r from-red-800 to-red-900 bg-clip-text text-transparent">
                Building Northeast India's
              </span>
              <span className="block text-slate-900 mt-2">
                Premier Innovation <Highlight className="text-red-700">Ecosystem</Highlight>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-poppins"
            >
              We're catalyzing a transformative movement that connects visionary entrepreneurs with 
              strategic resources, smart capital, and a collaborative network to build sustainable, 
              high-impact ventures.
            </motion.p>

            {/* Elegant Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
            >
              {[
                { value: "150+", label: "Active Startups", color: "text-red-700" },
                { value: "N/A", label: "Funding Mobilized", color: "text-amber-700" },
                { value: "8", label: "States Covered", color: "text-blue-700" },
                { value: "95%", label: "Satisfaction Rate", color: "text-emerald-700" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} font-montserrat mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 font-medium font-poppins">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Our Story - Clean & Professional */}
          <div className="mb-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-red-700 uppercase tracking-wider">Our Origin</div>
                    <h2 className="text-3xl font-bold text-slate-900 font-montserrat">The Genesis Story</h2>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-slate-600 leading-relaxed text-lg font-poppins">
                    Founded in 2023, Startup Northeast was born from a fundamental observation: 
                    Northeast India possesses immense entrepreneurial talent and innovative potential, 
                    yet lacks the structured ecosystem support needed to thrive.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-lg font-poppins">
                    We envisioned a platform that goes beyond traditional incubators a comprehensive 
                    ecosystem that provides end-to-end support from ideation to scale, with a deep 
                    understanding of regional dynamics and global market demands.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-lg font-poppins">
                    Today, we stand as the region's most trusted partner for ambitious founders, 
                    having facilitated over ₹50 crores in funding and built a network spanning all 
                    eight Northeastern states.
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-red-200 via-red-300 to-blue-200" />
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <div key={index} className="relative flex items-start mb-12 last:mb-0">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm flex items-center justify-center">
                          <Icon className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-2xl font-bold text-red-700">{milestone.year}</div>
                            <div className="px-3 py-1 bg-red-50 rounded-full">
                              <span className="text-sm font-semibold text-red-700">{milestone.stat}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                          <p className="text-slate-600">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mission & Vision - Professional Cards */}
          <div className="mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-50 to-blue-50 border border-red-200/50 mb-6">
                <Target className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700">Our Strategic Pillars</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-montserrat">
                Purpose-Driven <Highlight className="text-red-700">Leadership</Highlight>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl border border-red-200/50 p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-montserrat">Our Mission</h3>
                    <p className="text-slate-600 leading-relaxed text-lg font-poppins">
                      To systematically dismantle barriers to entrepreneurship in Northeast India by 
                      providing founders with strategic resources, smart capital, and market access 
                      needed to build scalable, globally competitive ventures.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-200/50 p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-montserrat">Our Vision</h3>
                    <p className="text-slate-600 leading-relaxed text-lg font-poppins">
                      To establish Northeast India as Asia's foremost hub for sustainable innovation 
                      and entrepreneurship, recognized for producing world-class startups that solve 
                      meaningful problems and drive inclusive economic growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values - Elegant Grid */}
          <div className="mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-50 to-blue-50 border border-red-200/50 mb-6">
                <Star className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700">Our Guiding Principles</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-montserrat">
                The Foundation of <Highlight className="text-red-700">Excellence</Highlight>
              </h2>
              <p className="text-lg text-slate-600 font-poppins">
                These principles define our culture and guide every decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className={`${value.bg} rounded-2xl border border-slate-200 p-8 h-full transition-all duration-300 group-hover:border-red-300 group-hover:shadow-lg`}>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 font-montserrat group-hover:text-red-700 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 font-poppins">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Leadership Team - Professional */}
          <div className="mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-50 to-blue-50 border border-red-200/50 mb-6">
                <Users className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700">Leadership Team</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-montserrat">
                Meet Our <Highlight className="text-red-700">Strategic Leaders</Highlight>
              </h2>
              <p className="text-lg text-slate-600 font-poppins">
                Seasoned professionals driving Northeast India's entrepreneurial transformation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm hover:shadow-lg transition-all">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 group-hover:scale-105 transition-transform duration-300`}>
                      {member.initials}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-montserrat group-hover:text-red-700 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-red-700 font-semibold mb-3">{member.role}</div>
                    <div className="text-sm text-slate-600 font-poppins">{member.expertise}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA - Professional & Compelling */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-blue-500/10 to-red-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-r from-red-700 to-red-900 rounded-2xl border border-red-600/20 p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6 font-montserrat">
                  Ready to Build Something Extraordinary?
                </h2>
                <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto font-poppins">
                  Join Northeast India's most dynamic community of innovators, investors, and 
                  changemakers. Let's create lasting impact together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-red-700 hover:bg-red-50 font-bold px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                 
                </div>
                
                <div className="mt-10 pt-8 border-t border-white/20">
                  <p className="text-red-100/80 text-sm font-poppins">
                    Already a member? <a href="/login" className="text-white font-semibold hover:underline">Sign in</a> to your dashboard
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </GridBeam>
    </div>
  );
}