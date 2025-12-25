import { useState, useEffect } from "react";
import { Star, Quote, ChevronDown, User, Building2, Sparkles } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../utils/supabaseClient"; // Adjust this import based on your setup
import { Marquee } from "../components/ui/marquee";
import { cn } from "../utils/cn";

// Review Card Component
const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
          <User className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      {/* FIX: Replace blockquote with div or use proper blockquote structure */}
      <div className="mt-2 text-sm">{body}</div>
      <div className="flex mt-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3 text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>
    </figure>
  );
};

export function Testimonials() {
  const [expanded, setExpanded] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      
      // Fix: Use the correct table name - should be 'startups' not 'startups' (you had a typo)
      const { data: startups, error } = await supabase
        .from('startups')
        .select(`
          *,
          users!inner (
            full_name,
            email
          )
        `)
        .eq('is_approved', true)
        .not('feedback', 'is', null)
        .order('approved_at', { ascending: false });

      if (error) throw error;

      // Transform data
      const transformedTestimonials = (startups || []).map((startup, index) => {
        const user = startup.users;
        const startupName = startup.name || "Startup";
        const userName = user?.full_name || startup.startup_email?.split('@')[0] || "Founder";
        
        // Extract role from startup stage or description
        let role = "Founder";
        if (startup.stage) {
          if (startup.stage.toLowerCase().includes('seed')) role = "Seed Stage Founder";
          else if (startup.stage.toLowerCase().includes('series')) {
            const seriesMatch = startup.stage.match(/\d+/);
            role = `Series ${seriesMatch ? seriesMatch[0] : ''} Founder`;
          } else role = `${startup.stage} Founder`;
        }

        return {
          id: startup.id,
          name: userName,
          role: `${role}, ${startupName}`,
          company: startup.sector || "Startup",
          content: startup.feedback || "Great support from Startup Northeast!",
          rating: 5, // Default rating
          location: startup.location || "Northeast India",
          featured: index < 2, // First 2 are featured
        };
      });

      // If no testimonials from DB, use fallback
      if (transformedTestimonials.length === 0) {
        setTestimonials([
          {
            id: "1",
            name: "Arjun Sharma",
            role: "Founder, AgroTech NE",
            company: "AgriTech Startup",
            content: "Startup Northeast helped us secure ₹5 Cr funding within 6 months. Their mentorship program transformed our business approach.",
            rating: 5,
            location: "Guwahati, Assam",
            featured: true,
          },
          {
            id: "2",
            name: "Priya Das",
            role: "CEO, Bamboo Innovations",
            company: "Sustainable Products",
            content: "The platform connected us with the right investors and provided legal support that saved us months of paperwork.",
            rating: 5,
            location: "Imphal, Manipur",
            featured: true,
          },
          {
            id: "3",
            name: "Rajesh Meitei",
            role: "Co-Founder, HealthConnect NE",
            company: "HealthTech",
            content: "From pitch deck creation to investor meetings, every service exceeded our expectations.",
            rating: 4,
            location: "Aizawl, Mizoram",
            featured: false,
          },
          {
            id: "4",
            name: "Sunita Khongwir",
            role: "Director, NE Craft Hub",
            company: "E-commerce Platform",
            content: "The startup community here is amazing. We've found mentors, partners, and investors all in one place.",
            rating: 5,
            location: "Shillong, Meghalaya",
            featured: false,
          },
        ]);
      } else {
        setTestimonials(transformedTestimonials);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Fallback testimonials
      setTestimonials([
        {
          id: "1",
          name: "Arjun Sharma",
          role: "Founder, AgroTech NE",
          company: "AgriTech Startup",
          content: "Startup Northeast helped us secure ₹5 Cr funding within 6 months.",
          rating: 5,
          location: "Guwahati, Assam",
          featured: true,
        },
        {
          id: "2",
          name: "Priya Das",
          role: "CEO, Bamboo Innovations",
          company: "Sustainable Products",
          content: "Connected us with the right investors and saved us months of paperwork.",
          rating: 5,
          location: "Imphal, Manipur",
          featured: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const otherTestimonials = testimonials.filter(t => !t.featured);

  // Prepare reviews for marquee
  const marqueeReviews = testimonials.map(testimonial => ({
    name: testimonial.name,
    username: `@${testimonial.role.split(',')[0]?.toLowerCase().replace(/\s+/g, '') || 'founder'}`,
    body: testimonial.content,
    img: `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=dc2626&color=fff`
  }));

  const firstRow = marqueeReviews.slice(0, Math.ceil(marqueeReviews.length / 2));
  const secondRow = marqueeReviews.slice(Math.ceil(marqueeReviews.length / 2));
  const thirdRow = [...firstRow];
  const fourthRow = [...secondRow];

  if (loading) {
    return (
      <div className="py-12 md:py-20 bg-gradient-to-br from-white via-red-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-white via-red-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 border border-red-300 mb-4">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 font-medium">Success Stories</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 font-montserrat">
            What Founders Say About Us
          </h2>
          <div className="text-sm md:text-lg text-slate-700 max-w-2xl mx-auto font-poppins"> {/* Changed p to div */}
            Hear from entrepreneurs who've accelerated their journey with Startup Northeast
          </div>
        </motion.div>

        {/* Featured Testimonials (Always visible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="w-8 h-8 text-red-200" />
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-slate-700 mb-6 font-poppins leading-relaxed"> {/* Changed p to div */}
                    "{testimonial.content}"
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 font-montserrat">{testimonial.name}</h4>
                      <div className="text-sm text-slate-600 font-poppins">{testimonial.role}</div> {/* Changed p to div */}
                      <div className="flex items-center gap-1 mt-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Marquee 3D Section (Shows when expanded) */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
                <div
                  className="flex flex-row items-center gap-4"
                  style={{
                    transform:
                      "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
                  }}
                >
                  <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {firstRow.map((review) => (
                      <ReviewCard key={review.username} {...review} />
                    ))}
                  </Marquee>
                  <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
                    {secondRow.map((review) => (
                      <ReviewCard key={review.username} {...review} />
                    ))}
                  </Marquee>
                  <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
                    {thirdRow.map((review) => (
                      <ReviewCard key={review.username} {...review} />
                    ))}
                  </Marquee>
                  <Marquee pauseOnHover className="[--duration:20s]" vertical>
                    {fourthRow.map((review) => (
                      <ReviewCard key={review.username} {...review} />
                    ))}
                  </Marquee>
                </div>
                <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
                <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
                <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular Testimonials Dropdown (Hidden when marquee is shown) */}
        <AnimatePresence>
          {expanded && testimonials.length <= 4 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-6">
                {otherTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="h-full border-2 border-slate-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-5">
                        {/* Stars */}
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Content */}
                        <div className="text-sm text-slate-700 mb-4 font-poppins line-clamp-4"> {/* Changed p to div */}
                          "{testimonial.content}"
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                            <User className="w-4 h-4 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-slate-900 truncate font-montserrat">
                              {testimonial.name}
                            </h4>
                            <div className="text-xs text-slate-600 truncate font-poppins"> {/* Changed p to div */}
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <div className="text-center">
          <Button
            onClick={() => setExpanded(!expanded)}
            variant="outline"
            className="border-2 border-red-300 hover:border-red-600 hover:bg-red-50 text-red-700 font-poppins font-semibold px-6 py-3 rounded-xl transition-all duration-300 group"
          >
            {expanded ? "Show Less" : "View More Testimonials"}
            <ChevronDown 
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-slate-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1 font-montserrat">98%</div>
              <div className="text-sm text-slate-600 font-poppins">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1 font-montserrat">{testimonials.length}+</div>
              <div className="text-sm text-slate-600 font-poppins">Success Stories</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1 font-montserrat">4.9★</div>
              <div className="text-sm text-slate-600 font-poppins">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1 font-montserrat">2x</div>
              <div className="text-sm text-slate-600 font-poppins">Growth Acceleration</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}