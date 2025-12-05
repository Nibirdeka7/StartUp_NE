import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Scale, IndianRupee, Shield, MessageCircle, Check, Sparkles, FileText, PresentationIcon } from "lucide-react";
import { motion } from "motion/react";

export function ServicesGrid() {
  const services = [
    {
      category: "Legal & Compliance",
      icon: Scale,
      gradient: "from-red-100 to-red-200",
      items: [
        {
          title: "Pvt. Ltd. Company Registration",
          price: "₹6,999",
          features: [
            "Complete documentation",
            "PAN & TAN",
            "Digital Signature",
            "MOA & AOA drafting",
          ],
        },
        {
          title: "GST Registration (Voluntary)",
          price: "₹1,499",
          features: [
            "Quick processing",
            "GSTIN generation",
            "Compliance support",
            "Expert guidance",
          ],
        },
      ],
    },
    {
      category: "Finance & Accounting",
      icon: IndianRupee,
      gradient: "from-red-100 to-red-200",
      items: [
        {
          title: "Pitch Deck Creation (Basic)",
          price: "₹4,999",
          features: [
            "10-15 slides",
            "Professional design",
            "Market analysis",
            "Financial projections",
          ],
        },
        {
          title: "Annual Compliance Filing",
          price: "₹9,999",
          features: [
            "ROC filing",
            "Annual returns",
            "Financial statements",
            "Tax compliance",
          ],
        },
      ],
    },
    {
      category: "IP & Protection",
      icon: Shield,
      gradient: "from-red-100 to-red-200",
      items: [
        {
          title: "Trademark Application (Basic)",
          price: "₹3,999",
          features: [
            "Name & logo filing",
            "Search report",
            "Application drafting",
            "Filing & tracking",
          ],
        },
      ],
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 font-medium">Professional Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-montserrat">
            Services to Accelerate Your Startup
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto font-poppins">
            Expert services at transparent prices to help you focus on building your product
          </p>
        </motion.div>

        {/* Service Categories Grid - All in one grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, categoryIndex) => {
            const Icon = service.icon;
            return service.items.map((item, itemIndex) => (
              <motion.div
                key={`${categoryIndex}-${itemIndex}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
              >
                <Card className="h-full border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm group">
                  <CardContent className="p-6 space-y-4">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-5 h-5 text-red-700" />
                      </div>
                      <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                        {service.category}
                      </Badge>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-slate-900 mb-1 group-hover:text-red-600 transition-colors font-semibold text-lg font-montserrat">
                      {item.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                        {item.price}
                      </span>
                      <span className="text-slate-500 text-sm">+ taxes</span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2">
                      {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="font-poppins">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 group font-poppins font-semibold mt-4 py-3 rounded-xl"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Inquire on WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ));
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="inline-block bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-slate-700 font-poppins">
                Need a custom package?{" "}
                <button className="text-red-600 hover:text-red-700 underline font-semibold">
                  Contact our team
                </button>{" "}
                for tailored solutions.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}