"use client";

import { memo, useCallback } from "react";
import { Code, Palette, Zap, Check } from "lucide-react";

export const ServicesPricing = memo(function ServicesPricing() {
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
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive web applications built with Vue.js, React, Angular, and TypeScript",
      color: "purple"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Clean, intuitive interfaces that provide exceptional user experiences",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Technical Consulting",
      description: "Expert guidance on architecture, migrations, and best practices for your projects",
      color: "indigo"
    }
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 -left-20 w-96 h-96 bg-purple-500/10" />
        <div className="blob absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/10" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              What I Offer
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Services
            <br />
            <span className="accent-gradient">
              & Pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent rates with no hidden fees. Let&apos;s build something amazing together.
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colorMap = {
              purple: {
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
                icon: "text-purple-400",
                glow: "rgba(168, 85, 247, 0.12)"
              },
              blue: {
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
                icon: "text-blue-400",
                glow: "rgba(59, 130, 246, 0.12)"
              },
              indigo: {
                bg: "bg-indigo-500/10",
                border: "border-indigo-500/20",
                icon: "text-indigo-400",
                glow: "rgba(99, 102, 241, 0.12)"
              }
            };
            const colors = colorMap[service.color as keyof typeof colorMap];

            return (
              <div
                key={index}
                className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                }}
                onMouseMove={handleMouseMove}
              >
                {/* Spotlight effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div 
                    className="absolute inset-0" 
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${colors.glow}, transparent 40%)`
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl ${colors.bg} border ${colors.border} mb-6`}>
                    <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="accent-gradient">Transparent Pricing</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the engagement model that works best for your project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Hourly Rate */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="text-sm font-semibold text-purple-400 mb-2">Hourly</div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">€100</span>
                  <span className="text-xl text-gray-400">/hour</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Perfect for short-term tasks, consultations, or ongoing support.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Pay as you go</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>No minimum commitment</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Project-Based */}
            <div 
              className="group relative bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl border-2 border-purple-500/30 rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)] overflow-hidden scale-105"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute top-4 right-4">
                <span className="inline-flex px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-bold">
                  POPULAR
                </span>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="text-sm font-semibold text-purple-400 mb-2">Project-Based</div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">€5K+</span>
                  <span className="text-xl text-gray-400">/project</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Fixed-price projects with clear scope, timeline, and deliverables.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
                    <span>Fixed pricing</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
                    <span>Detailed project plan</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
                    <span>Milestone-based payments</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
                    <span>Post-launch support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Monthly Retainer */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(99,102,241,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.12), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="text-sm font-semibold text-indigo-400 mb-2">Monthly Retainer</div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">€8K+</span>
                  <span className="text-xl text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Dedicated monthly hours for ongoing development and maintenance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Guaranteed availability</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Reduced hourly rate</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Long-term partnership</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground">
              All prices are estimates. Final quotes provided after discovery call based on your specific requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

