// src/components/Services.jsx
import { 
  Building2, FileText, Target, PenTool, Users, Code, 
  Megaphone, MessageCircle, DollarSign, Zap, Shield,
  CheckCircle, Clock, TrendingUp, Sparkles, Briefcase,
  Award, MapPin, Rocket
} from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { motion } from "motion/react";

export function ServicesGrid({ onServiceClick }) {
  const services = [
    {
      title: "Private Limited Registration",
      price: "₹20,000",
      icon: Building2,
      color: "from-red-600 to-red-800",
      description: "Complete company registration with legal compliance",
      category: "Registration"
    },
    {
      title: "LLP Registration",
      price: "₹15,000",
      icon: Building2,
      color: "from-red-600 to-red-800",
      description: "Limited Liability Partnership setup",
      category: "Registration"
    },
    {
      title: "OPC Registration",
      price: "₹15,000",
      icon: Building2,
      color: "from-red-600 to-red-800",
      description: "One Person Company formation",
      category: "Registration"
    },
    {
      title: "Section 8 Company",
      price: "₹25,000",
      icon: Building2,
      color: "from-red-600 to-red-800",
      description: "Non-profit company registration",
      category: "Registration"
    },
    {
      title: "Trademark Registration",
      price: "₹10,000",
      icon: FileText,
      color: "from-blue-600 to-blue-800",
      description: "Protect your brand identity",
      category: "Legal"
    },
    {
      title: "Patent Filing",
      price: "₹25,000",
      icon: FileText,
      color: "from-blue-600 to-blue-800",
      description: "Patent application and filing",
      category: "Legal"
    },
    {
      title: "Patent Landscaping",
      price: "₹40,000",
      icon: FileText,
      color: "from-blue-600 to-blue-800",
      description: "Comprehensive patent analysis",
      category: "Legal"
    },
    {
      title: "DPIIT Registration",
      price: "₹4,000",
      icon: Shield,
      color: "from-green-600 to-green-800",
      description: "Startup India recognition",
      category: "Government"
    },
    {
      title: "MASI ID Registration",
      price: "₹2,000",
      icon: Shield,
      color: "from-green-600 to-green-800",
      description: "MASEAN startup identifier",
      category: "Government"
    },
    {
      title: "Annual Compliance",
      price: "₹15,000",
      icon: Shield,
      color: "from-green-600 to-green-800",
      description: "Yearly legal compliance",
      category: "Government"
    },
    {
      title: "Pitch Deck Design",
      price: "₹10,000",
      icon: PenTool,
      color: "from-purple-600 to-purple-800",
      description: "Professional investor presentations",
      category: "Design"
    },
    {
      title: "Logo Design",
      price: "₹3,000",
      icon: PenTool,
      color: "from-purple-600 to-purple-800",
      description: "Custom logo creation",
      category: "Design"
    },
    {
      title: "3D Modelling & Design",
      price: "₹10,000",
      icon: PenTool,
      color: "from-purple-600 to-purple-800",
      description: "3D visualization services",
      category: "Design"
    },
    {
      title: "Branding Consultation",
      price: "₹20,000",
      icon: PenTool,
      color: "from-purple-600 to-purple-800",
      description: "Complete brand strategy",
      category: "Design"
    },
    {
      title: "Grant Consultation",
      price: "₹10,000",
      icon: Users,
      color: "from-amber-600 to-amber-800",
      description: "Government grant assistance",
      category: "Consulting"
    },
    {
      title: "Loan Consultation",
      price: "₹30,000",
      icon: DollarSign,
      color: "from-amber-600 to-amber-800",
      description: "Business loan guidance",
      category: "Consulting"
    },
    {
      title: "Website Development",
      price: "₹30,000",
      icon: Code,
      color: "from-indigo-600 to-indigo-800",
      description: "Custom website creation",
      category: "Development"
    },
    {
      title: "WebApp Development",
      price: "₹80,000",
      icon: Code,
      color: "from-indigo-600 to-indigo-800",
      description: "Web application development",
      category: "Development"
    },
    {
      title: "App Development",
      price: "₹2,00,000",
      icon: Code,
      color: "from-indigo-600 to-indigo-800",
      description: "Mobile application development",
      category: "Development"
    },
    {
      title: "GTM Consulting",
      price: "₹20,000",
      icon: Target,
      color: "from-pink-600 to-pink-800",
      description: "Go-to-market strategy",
      category: "Marketing"
    },
    {
      title: "Performance Marketing",
      price: "₹50,000",
      icon: Megaphone,
      color: "from-pink-600 to-pink-800",
      description: "Digital marketing campaigns",
      category: "Marketing"
    },
    {
      title: "Hiring Services",
      price: "₹1,000",
      icon: Users,
      color: "from-pink-600 to-pink-800",
      description: "Recruitment and talent acquisition",
      category: "HR"
    }
  ];

  // Group services by category for better organization
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
          <Briefcase className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-800 font-medium">All Services</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 font-montserrat">
          Comprehensive Startup Solutions
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto font-poppins">
          Transparent pricing for every startup need with expert guidance
        </p>
      </div>

      {/* Service Categories Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {Object.keys(servicesByCategory).map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-colors text-sm font-medium"
            onClick={() => {
              const element = document.getElementById(category.toLowerCase());
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid by Category */}
      {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
        <div key={category} id={category.toLowerCase()} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-montserrat">{category} Services</h3>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
              {categoryServices.length} services
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/90 backdrop-blur-sm group">
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-montserrat">
                            {service.price}
                          </div>
                          <div className="text-xs text-slate-500 font-poppins">Starting from</div>
                        </div>
                      </div>
                      
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2 font-montserrat line-clamp-2">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 mb-4 font-poppins line-clamp-2">
                        {service.description}
                      </p>
                      
                      <Button
                        onClick={() => onServiceClick?.(service.title)}
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-300/50"
                        size="sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Get Quote
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quick Contact Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-0 text-white">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-2 font-montserrat">
                  Need a Custom Package?
                </h3>
                <p className="text-slate-300 font-poppins">
                  Get a tailored solution that fits your specific requirements
                </p>
              </div>
              <Button
                onClick={() => onServiceClick?.("Custom Package")}
                className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 py-3"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Request Custom Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}