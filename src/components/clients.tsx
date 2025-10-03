"use client";

import { Building2 } from "lucide-react";
import Image from "next/image";

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
    { name: "Edumalin", 
      logo: "/logos/edumalin.png",
      fallback: "🎓"
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-muted/5">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
          <Building2 className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium">Trusted By</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="accent-gradient">Companies</span> I&apos;ve Worked With
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From innovative startups to established enterprises
        </p>
      </div>

      {/* Auto-scrolling logos - Full width */}
      <div className="relative w-full overflow-hidden py-8">
        <div className="flex animate-scroll">
          {[...Array(10)].map((_, setIndex) => (
            clients.map((client, index) => (
              <div
                key={`set-${setIndex}-${index}`}
                className="flex-shrink-0 mx-10 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3 group">
                <div className="w-26 h-26 flex items-center justify-center group-hover:scale-105 transition-all duration-300 rounded-lg bg-white/95 p-2">
                  {client.logo.startsWith('/') ? (
                    <>
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        width={96}
                        height={96}
                        className="object-contain transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.nextElementSibling) {
                            (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                          }
                        }}
                      />
                      <div className="text-4xl hidden">
                        {client.fallback || ''}
                      </div>
                    </>
                  ) : (
                    <div className="text-6xl">
                      {client.logo}
                    </div>
                  )}
                </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {client.name}
                  </span>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </section>
  );
}
