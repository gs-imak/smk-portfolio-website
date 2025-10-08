"use client";

import { memo, useCallback } from "react";

export const About = memo(function About() {
  // Mouse spotlight effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const expertise = [
    {
      title: "Frontend Development",
      description: "I build modern, responsive web applications using Vue.js, React, Angular, and TypeScript. Specialized in technical migrations, state management with NgRx, and creating seamless user experiences with clean, maintainable code for CAC40 clients.",
      metrics: ["5+ Years Experience", "Vue.js & React Expert", "CAC40 Clients"]
    },
    {
      title: "Game Development",
      description: "Creating interactive experiences with Unity and modern game engines. From concept to deployment, I bring game ideas to life with engaging mechanics and stunning visuals.",
      metrics: ["Unity Certified", "8 Games Published", "100K+ Downloads"]
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 right-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wider text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                About Me
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Full-Stack Developer
                </span>
                <br />
                <span className="text-muted-foreground inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Building Excellence
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                I&apos;m a Full-Stack Developer with over 5 years of experience building modern web 
                applications. My expertise spans HTML, CSS, JavaScript, and modern frameworks like React, 
                Vue.js, and Angular. I&apos;m passionate about writing clean, maintainable code and 
                creating exceptional user experiences.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                Based in Paris, I&apos;ve had the privilege of working with top-tier clients including 
                CAC40 companies like TotalEnergie, UGC, and Atlantic. I specialize in client consulting, 
                pair-programming, and delivering robust, scalable solutions that drive business success.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <div className="text-3xl font-bold mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
                <div className="text-3xl font-bold mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Years Exp</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                <div className="text-3xl font-bold mb-1">CAC40</div>
                <div className="text-sm text-muted-foreground">Clients</div>
              </div>
            </div>
          </div>

          {/* Right - Expertise Cards */}
          <div className="space-y-6">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] cursor-pointer animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${1.4 + index * 0.2}s` }}
                onMouseMove={handleMouseMove}
              >
                {/* Spotlight effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div 
                    className="absolute inset-0" 
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 40%)`
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-white transition-all duration-300">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-base">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {item.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="text-sm px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 font-medium transition-colors duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${1.6 + index * 0.2 + idx * 0.1}s` }}
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
