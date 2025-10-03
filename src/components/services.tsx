"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Code, Gamepad2, Star, Clock, Users, Shield, TrendingUp } from "lucide-react";

export function Services() {
  const services = [
    {
      name: "Web Development",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      description: "Modern web applications with React, Next.js, and TypeScript",
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
      name: "Team Size",
      icon: Users,
      webDev: "1-2 developers",
      mobileApp: "2-3 developers",
      gameDev: "3-5 developers"
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
            Looking for superior digital solutions? It may be time to think beyond basic development.
          </p>
        </div>

        {/* Services Comparison Table */}
        <div className="bg-white/5 border border-border/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-white/10 p-6 border-b border-border/30">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Service Features
              </div>
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.color} text-white text-sm font-bold mb-2`}>
                      <IconComponent className="h-4 w-4" />
                      {service.name}
                    </div>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border/30">
            {comparisonCriteria.map((criteria, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-6 hover:bg-foreground/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-foreground/10">
                    <criteria.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{criteria.name}</span>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  {criteria.webDev}
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  {criteria.mobileApp}
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  {criteria.gameDev}
                </div>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="p-6 bg-white/10 border-t border-border/30">
            <h3 className="text-lg font-bold text-foreground mb-4 text-center">Key Features Included</h3>
            <div className="grid grid-cols-3 gap-6">
              {services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="space-y-3">
                  <h4 className="font-bold text-sm text-foreground text-center">{service.name}</h4>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        {feature.value ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <X className="h-4 w-4 text-red-400" />
                        )}
                        <span className="text-muted-foreground">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <Button className="group magnetic glow-on-hover rounded-full px-8 py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 hover:from-purple-600 hover:via-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 text-lg">
            <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Get Started Today
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            * Based on industry standards and project complexity. See contact section for details.
          </p>
        </div>
      </div>
    </section>
  );
}
