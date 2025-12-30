import { ServicesGrid } from "../components/Services.jsx";
import { 
  Sparkles, Target, CheckCircle, BookOpenCheck, Clock, 
  Users, Award, TrendingUp, MessageCircle, Phone, Mail, 
  Zap, Shield, Star, Globe, Briefcase, FileText, PenTool, 
  Code, Megaphone, UserPlus, DollarSign, MapPin, Building2,
  CheckSquare, Rocket, BadgeCheck, BarChart
} from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { motion } from "motion/react";

export function ServicesPage() {
  // WhatsApp business number
  const WHATSAPP_NUMBER = "+918822837774";

  // Service benefits with the original beautiful design
  const serviceBenefits = [
    {
      icon: Target,
      title: "Transparent Pricing",
      description: "No hidden costs, no surprises. Know exactly what you're paying for.",
      color: "border-red-200 bg-gradient-to-br from-red-50 to-red-100"
    },
    {
      icon: CheckCircle,
      title: "Expert Support",
      description: "Get guidance from professionals who understand the Northeast ecosystem.",
      color: "border-green-200 bg-gradient-to-br from-green-50 to-green-100"
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick turnaround times to help you focus on growing your business.",
      color: "border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100"
    },
    {
      icon: Shield,
      title: "100% Compliance",
      description: "Complete legal compliance with government regulations and standards.",
      color: "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100"
    }
  ];

  // Function to handle WhatsApp redirect with custom message
  const handleServiceInquiry = (serviceName) => {
    const message = encodeURIComponent(
      `Hello Startup Northeast,\n\nI'm interested in the ${serviceName} service.\n\nCould you please provide more details about:\n- What's included in this service\n- Estimated timeline\n- Next steps to get started\n\nThank you!`
    );
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to handle general inquiry
  const handleGeneralInquiry = () => {
    const message = encodeURIComponent(
      `Hello Startup Northeast,\n\nI'm interested in learning more about your services.\n\nCould you please help me with:\n- Understanding which services would be best for my startup\n- Getting a custom quote\n- Timeline for getting started\n\nThank you!`
    );
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen py-8 md:py-12 bg-gradient-to-br from-white via-red-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-8 md:mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <BookOpenCheck className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 font-medium">Our Professional Services</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">
            Startup Services & Support
          </h1>
          <p className="text-sm md:text-lg text-slate-700 max-w-2xl mx-auto font-poppins">
            End-to-end support for your startup journey with transparent pricing and expert guidance
          </p>
        </div>

        {/* Service Benefits - Original Beautiful Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-12">
          {serviceBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className={`border-2 ${benefit.color} hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/90 backdrop-blur-sm`}>
                  <CardContent className="p-4 md:p-6 text-center space-y-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 flex items-center justify-center mx-auto group-hover:border-red-300 transition-colors">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-red-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 font-montserrat">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 font-poppins leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats - Original Beautiful Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
          {[
            { value: "50+", label: "Startups Served", icon: <Rocket className="w-4 h-4" /> },
            { value: "98%", label: "Satisfaction Rate", icon: <Star className="w-4 h-4" /> },
            { value: "24h", label: "Avg. Response Time", icon: <Clock className="w-4 h-4" /> },
            { value: "4.9★", label: "Service Rating", icon: <BadgeCheck className="w-4 h-4" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-montserrat">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm md:text-base text-slate-600 font-poppins">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Grid Component */}
      <div className="container mx-auto px-4 mb-12 md:mb-16">
        <ServicesGrid onServiceClick={handleServiceInquiry} />
      </div>

      {/* How It Works - Original Beautiful Design */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 mb-4">
            <BarChart className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-800 font-medium">Simple Process</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">How It Works</h2>
          <p className="text-slate-700 max-w-2xl mx-auto font-poppins">
            Simple, transparent process to get you the support you need
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            {
              number: 1,
              title: "Select Service",
              description: "Choose from our range of professional services tailored for startups",
              icon: <Target className="w-6 h-6" />
            },
            {
              number: 2,
              title: "Get Quote & Payment",
              description: "Receive transparent pricing and make secure payment online",
              icon: <DollarSign className="w-6 h-6" />
            },
            {
              number: 3,
              title: "Get Expert Support",
              description: "Our experts handle everything while you focus on your business",
              icon: <Users className="w-6 h-6" />
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm h-full">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative mx-auto">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg shadow-red-200">
                      {step.number}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-red-200 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 font-montserrat">{step.title}</h3>
                  <p className="text-slate-600 font-poppins leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA - Original Beautiful Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-12 md:mt-16"
        >
          <Card className="bg-gradient-to-r from-red-600 to-red-800 border-0 text-white max-w-2xl mx-auto shadow-2xl shadow-red-200/50">
            <CardContent className="p-6 md:p-8">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-montserrat">
                Need Custom Solutions?
              </h3>
              <p className="text-red-100 mb-4 md:mb-6 font-poppins">
                Contact our team for tailored packages that fit your specific requirements
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleGeneralInquiry}
                  className="px-6 md:px-8 py-3 bg-white text-red-700 font-semibold rounded-xl hover:bg-red-50 transition-colors font-poppins shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
                <Button
                  onClick={() => window.location.href = `tel:${WHATSAPP_NUMBER}`}
                  className="px-6 md:px-8 py-3 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors font-poppins"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
              <p className="text-sm text-red-200 mt-4 font-poppins">
                Guaranteed response within 24 hours
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}