"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Clients() {
  const clients = [
    { 
      name: "Velvet Consulting", 
      logo: "/logos/velvet.png",
      fallback: "💼"
    },
    { 
      name: "UGC", 
      logo: "/logos/ugc.png",
      fallback: "🎬"
    },
    { 
      name: "Atlantic", 
      logo: "/logos/atlantic.png",
      fallback: "📚"
    },
    { 
      name: "TotalEnergie", 
      logo: "/logos/totalEnergies.png",
      fallback: "⚡"
    },
    { 
      name: "Edumalin", 
      logo: "/logos/edumalin.png",
      fallback: "🎓"
    },
    { 
      name: "Sauter", 
      logo: "/logos/sauter.png",
      fallback: "🔧"
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 -left-20 w-96 h-96 bg-purple-500/10" />
        <div className="blob absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/10" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Trusted By
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Leading Companies
            <br />
            <span className="accent-gradient">
              & CAC40 Clients
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering excellence for innovative startups and established enterprises
          </p>
        </div>

        {/* Modern Logo Showcase */}
        <div className="relative max-w-6xl mx-auto mb-16">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 blur-3xl rounded-full" />
          
          {/* Main container with glassmorphism */}
          <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-[2.5rem] p-16 shadow-2xl overflow-hidden">
            {/* Top decorative line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            
            {/* Inner subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 1px, transparent 1px)',
                   backgroundSize: '30px 30px' 
                 }} 
            />

            {/* Logo Grid - direct, no nested containers */}
            <div className="relative grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-20">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="group relative flex items-center justify-center min-h-[120px] p-6"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Spotlight effect - always visible */}
                  <div className="absolute inset-0 rounded-xl opacity-100 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 blur-2xl" />
                  </div>

                  {/* Logo - direct placement */}
                  <div className="relative z-10 transition-all duration-500 group-hover:scale-110">
                    {client.logo.startsWith('/') ? (
                      <>
                        <Image
                          src={client.logo}
                          alt={`${client.name} logo`}
                          width={200}
                          height={120}
                          className="object-contain w-full h-auto max-h-[90px] transition-all duration-500 group-hover:brightness-110"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.nextElementSibling) {
                              (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden text-4xl items-center justify-center w-full h-full">
                          {client.fallback || ''}
                        </div>
                      </>
                    ) : (
                      <div className="text-5xl">
                        {client.logo}
                      </div>
                    )}
                  </div>

                  {/* Divider lines between logos */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              ))}
            </div>

            {/* Bottom decorative elements */}
            <div className="absolute bottom-0 left-1/3 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          </div>
        </div>

        {/* CTA Section - more minimal */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Interested in seeing my work?
          </p>
          <Button
            onClick={() => scrollToSection("#projects")}
            className="group h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-700 hover:via-purple-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 px-8"
          >
            <span className="flex items-center justify-center gap-2">
              View All Projects
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
