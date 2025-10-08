"use client";

import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Code, Gamepad2, Star, Clock, Users, Shield, TrendingUp } from "lucide-react";

export function Services() {
  // Mouse spotlight effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);
  const services = [
    {
      name: "Web Development",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      description: "Modern web applications with Vue.js, React, Angular, and TypeScript",
      features: [
        { name: "Responsive Design", value: true },
        { name: "SEO Optimized", value: true },
        { name: "Fast Loading", value: true },
        { name: "Mobile First", value: true },
        { name: "Cross Browser", value: true }
      ]
    },
    {
      name: "Mobile Apps",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      description: "Native and cross-platform mobile applications",
      features: [
        { name: "iOS & Android", value: true },
        { name: "Offline Support", value: true },
        { name: "Push Notifications", value: true },
        { name: "App Store Ready", value: true },
        { name: "Performance Optimized", value: true }
      ]
    },
    {
      name: "Game Development",
      icon: Gamepad2,
      color: "from-green-500 to-emerald-500",
      description: "Interactive games and immersive experiences",
      features: [
        { name: "3D Graphics", value: true },
        { name: "Multiplayer", value: true },
        { name: "Cross Platform", value: true },
        { name: "VR/AR Ready", value: true },
        { name: "Game Analytics", value: true }
      ]
    }
  ];

  const comparisonCriteria = [
    {
      name: "Development Time",
      icon: Clock,
      webDev: "2-4 weeks",
      mobileApp: "6-12 weeks", 
      gameDev: "3-6 months"
    },
    {
      name: "Maintenance",
      icon: Shield,
      webDev: "Low",
      mobileApp: "Medium",
      gameDev: "High"
    },
    {
      name: "Market Reach",
      icon: TrendingUp,
      webDev: "Global",
      mobileApp: "App Stores",
      gameDev: "Gaming Platforms"
    },
    {
      name: "ROI Timeline",
      icon: Star,
      webDev: "Immediate",
      mobileApp: "3-6 months",
      gameDev: "6-12 months"
    }
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 left-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Why Choose
            </span>
            <br />
            <span className="accent-gradient inline-block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              My Services?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Work directly with me - a dedicated solo developer who brings personalized attention and expertise to every project.
          </p>
        </div>

        {/* Services Comparison Table */}
        <div 
          className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)]"
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div 
              className="absolute inset-0" 
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 40%)`
              }}
            />
          </div>

          <div className="relative z-10">
            {/* Table Header */}
            <div className="bg-white/[0.03] p-8 border-b border-white/[0.12]">
              <div className="grid grid-cols-4 gap-6">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Service Features
                </div>
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  const colors = {
                    "from-blue-500 to-cyan-500": { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", icon: "text-blue-400" },
                    "from-purple-500 to-pink-500": { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", icon: "text-purple-400" },
                    "from-green-500 to-emerald-500": { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400", icon: "text-green-400" }
                  };
                  const colorScheme = colors[service.color as keyof typeof colors];
                  
                  return (
                    <div key={index} className="space-y-3">
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl ${colorScheme.bg} border ${colorScheme.border}`}>
                        <IconComponent className={`h-5 w-5 ${colorScheme.icon}`} />
                        <span className={`text-sm font-semibold ${colorScheme.text}`}>{service.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/[0.08]">
              {comparisonCriteria.map((criteria, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 p-6 hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <criteria.icon className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="font-medium text-white">{criteria.name}</span>
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    {criteria.webDev}
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    {criteria.mobileApp}
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    {criteria.gameDev}
                  </div>
                </div>
              ))}
            </div>

            {/* Features Comparison */}
            <div className="p-8 bg-white/[0.03] border-t border-white/[0.12]">
              <h3 className="text-lg font-bold text-white mb-6 text-center">Key Features Included</h3>
              <div className="grid grid-cols-3 gap-8">
                {services.map((service, serviceIndex) => (
                  <div key={serviceIndex} className="space-y-3">
                    <h4 className="font-bold text-sm text-white text-center">{service.name}</h4>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          {feature.value ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <X className="h-4 w-4 text-red-400" />
                          )}
                          <span className="text-gray-400">{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <Button className="group h-14 rounded-xl text-base font-semibold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-700 hover:via-purple-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 px-8">
            <span className="flex items-center justify-center gap-2">
              Let&apos;s Work Together
              <Zap className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            * Timelines vary based on project scope. Let&apos;s discuss your specific needs.
          </p>
        </div>
      </div>
    </section>
  );
}
