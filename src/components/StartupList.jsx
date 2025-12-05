"use client";

import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

import {
  Search,
  MapPin,
  TrendingUp,
  ExternalLink,
  Filter
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/Select";

export function StartupList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [filterStage, setFilterStage] = useState("all");

  const startups = [
    {
      id: 1,
      name: "AgroTech NE",
      logo: "🌾",
      sector: "AgriTech",
      stage: "Series A",
      location: "Guwahati, Assam",
      funding: "₹5 Cr",
      description:
        "AI-powered agricultural solutions helping Northeast farmers optimize yields and reduce costs through smart technology."
    },
    {
      id: 2,
      name: "Bamboo Innovations",
      logo: "🎋",
      sector: "Sustainability",
      stage: "Seed",
      location: "Imphal, Manipur",
      funding: "₹1.5 Cr",
      description:
        "Creating sustainable bamboo products and eco-friendly solutions for modern living while supporting local artisans."
    },
    {
      id: 3,
      name: "HealthConnect NE",
      logo: "🏥",
      sector: "HealthTech",
      stage: "Seed",
      location: "Aizawl, Mizoram",
      funding: "₹3 Cr",
      description:
        "Telemedicine platform connecting remote areas with quality healthcare through mobile-first technology."
    },
    {
      id: 4,
      name: "NE Craft Hub",
      logo: "🛍️",
      sector: "E-commerce",
      stage: "Pre-Seed",
      location: "Shillong, Meghalaya",
      funding: "₹75 L",
      description:
        "Digital marketplace showcasing traditional handicrafts and connecting artisans directly with global customers."
    },
    {
      id: 5,
      name: "EduNorth",
      logo: "📚",
      sector: "EdTech",
      stage: "Series A",
      location: "Itanagar, Arunachal Pradesh",
      funding: "₹8 Cr",
      description:
        "EdTech platform providing quality education in local languages with interactive content and AI tutoring."
    },
    {
      id: 6,
      name: "Tourism NE",
      logo: "🏔️",
      sector: "Travel",
      stage: "Seed",
      location: "Gangtok, Sikkim",
      funding: "₹2 Cr",
      description:
        "Smart tourism platform showcasing hidden gems of Northeast India with curated travel experiences."
    },
    {
      id: 7,
      name: "FreshFarm Direct",
      logo: "🥬",
      sector: "AgriTech",
      stage: "Pre-Seed",
      location: "Agartala, Tripura",
      funding: "₹50 L",
      description:
        "Farm-to-table platform connecting organic farmers directly with urban consumers for fresh produce."
    },
    {
      id: 8,
      name: "NE Music Lab",
      logo: "🎵",
      sector: "Media",
      stage: "Seed",
      location: "Kohima, Nagaland",
      funding: "₹1.2 Cr",
      description:
        "Digital platform promoting Northeast music and connecting local artists with global audiences."
    }
  ];

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector =
      filterSector === "all" || startup.sector === filterSector;
    const matchesStage =
      filterStage === "all" || startup.stage === filterStage;

    return matchesSearch && matchesSector && matchesStage;
  });

  return (
    <div className="space-y-8 relative">

      {/* Floating red/blue blurred theme blobs */}
      <div className="absolute -z-10 inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-200 rounded-full filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      </div>

      {/* Search + Filters */}
      <Card className="bg-white/70 backdrop-blur-xl border border-red-200 shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-2 border-slate-200 focus:border-red-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">

            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="rounded-xl border-2">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="AgriTech">AgriTech</SelectItem>
                <SelectItem value="HealthTech">HealthTech</SelectItem>
                <SelectItem value="EdTech">EdTech</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Sustainability">Sustainability</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="rounded-xl border-2">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Idea">Idea</SelectItem>
                <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                <SelectItem value="Seed">Seed</SelectItem>
                <SelectItem value="Series A">Series A</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterSector("all");
                setFilterStage("all");
              }}
              className="rounded-xl border-2"
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-slate-700 font-medium">
        Showing {filteredStartups.length} of {startups.length} startups
      </div>

      {/* Startup Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.map((startup) => (
          <Card
            key={startup.id}
            className="border-2 border-slate-200 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:border-red-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-6 space-y-4">

              {/* Logo + Stage */}
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center text-2xl">
                  {startup.logo}
                </div>

                <Badge className="bg-red-100 text-red-700 border-red-300">
                  {startup.stage}
                </Badge>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {startup.name}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {startup.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs border-slate-300">
                  {startup.sector}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs border-slate-300 gap-1"
                >
                  <TrendingUp className="w-3 h-3" />
                  {startup.funding}
                </Badge>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-sm text-slate-500 border-t pt-2">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{startup.location}</span>
              </div>

              {/* View Details */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-red-700 hover:bg-red-100"
              >
                View Details
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blob Animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

