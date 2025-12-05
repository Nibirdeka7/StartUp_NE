import { ServicesGrid } from "../components/Services.jsx";
import { Sparkles, Target, CheckCircle, BookOpenCheck  } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";

export function ServicesPage() {
  const serviceBenefits = [
    {
      icon: Target,
      title: "Transparent Pricing",
      description: "No hidden costs, no surprises. Know exactly what you're paying for.",
    },
    {
      icon: CheckCircle,
      title: "Expert Support",
      description: "Get guidance from professionals who understand the Northeast ecosystem.",
    },
    {
      icon: Sparkles,
      title: "Fast Processing",
      description: "Quick turnaround times to help you focus on growing your business.",
    },
  ];

  return (
    <div className="min-h-screen py-8 md:py-12 bg-gradient-to-br from-white via-red-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-8 md:mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <BookOpenCheck  className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 font-medium">Our Professional Services</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">
            Startup Services & Support
          </h1>
          <p className="text-sm md:text-lg text-slate-700 max-w-2xl mx-auto font-poppins">
            End-to-end support for your startup journey with transparent pricing and expert guidance
          </p>
        </div>

        {/* Service Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
          {serviceBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-2 border-slate-200 hover:border-red-300 transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6 text-center space-y-3">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-red-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 font-montserrat">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 font-poppins">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-montserrat">
              500+
            </div>
            <div className="text-sm md:text-base text-slate-600 font-poppins">Startups Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-montserrat">
              98%
            </div>
            <div className="text-sm md:text-base text-slate-600 font-poppins">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-montserrat">
              24h
            </div>
            <div className="text-sm md:text-base text-slate-600 font-poppins">Avg. Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-montserrat">
              4.9★
            </div>
            <div className="text-sm md:text-base text-slate-600 font-poppins">Service Rating</div>
          </div>
        </div>
      </div>

      {/* Services Grid Component */}
      <ServicesGrid />

      {/* How It Works */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">How It Works</h2>
          <p className="text-slate-700 max-w-2xl mx-auto font-poppins">
            Simple, transparent process to get you the support you need
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center text-2xl font-bold mx-auto">
              1
            </div>
            <h3 className="text-xl font-semibold text-slate-900 font-montserrat">Select Service</h3>
            <p className="text-slate-600 font-poppins">
              Choose from our range of professional services tailored for startups
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center text-2xl font-bold mx-auto">
              2
            </div>
            <h3 className="text-xl font-semibold text-slate-900 font-montserrat">Get Quote & Payment</h3>
            <p className="text-slate-600 font-poppins">
              Receive transparent pricing and make secure payment online
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center text-2xl font-bold mx-auto">
              3
            </div>
            <h3 className="text-xl font-semibold text-slate-900 font-montserrat">Get Expert Support</h3>
            <p className="text-slate-600 font-poppins">
              Our experts handle everything while you focus on your business
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Card className="bg-gradient-to-r from-red-600 to-red-800 border-0 text-white max-w-2xl mx-auto">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-montserrat">
                Need Custom Solutions?
              </h3>
              <p className="text-red-100 mb-4 md:mb-6 font-poppins">
                Contact our team for tailored packages that fit your specific requirements
              </p>
              <button className="px-6 md:px-8 py-3 bg-white text-red-700 font-semibold rounded-xl hover:bg-red-50 transition-colors font-poppins">
                Contact Us
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}