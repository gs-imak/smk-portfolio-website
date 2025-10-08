"use client";

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

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 left-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Trusted By
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Leading Companies
            <br />
            <span className="text-muted-foreground">
              & CAC40 Clients
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering excellence for innovative startups and established enterprises
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group relative aspect-square bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white hover:border-white/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {client.logo.startsWith('/') ? (
                <>
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain transition-all duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="hidden text-3xl items-center justify-center w-full h-full">
                    {client.fallback || ''}
                  </div>
                </>
              ) : (
                <div className="text-4xl">
                  {client.logo}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
