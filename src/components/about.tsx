"use client";

import { memo } from "react";

export const About = memo(function About() {
  const expertise = [
    {
      title: "Frontend Development",
      description: "I build modern, responsive web applications using React, Next.js, and TypeScript. Focused on creating seamless user experiences with clean, maintainable code.",
      metrics: ["5+ Years Experience", "50+ Projects", "React & Next.js Expert"]
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
                  Building Digital
                </span>
                <br />
                <span className="text-muted-foreground inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Experiences
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                I&apos;m a developer with a passion for creating exceptional digital experiences. 
                With expertise in both web development and game design, I bring a unique perspective 
                to every project.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                Based in San Francisco, I work with clients worldwide to build products that users 
                love. From startups to established companies, I help bring ideas to life with 
                modern technology and thoughtful design.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
                <div className="text-3xl font-bold mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Satisfied</div>
              </div>
            </div>
          </div>

          {/* Right - Expertise Cards */}
          <div className="space-y-8">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="border border-border p-8 rounded-lg hover:border-foreground/20 transition-all duration-300 group gradient-border-card hover-scale animate-fade-in-up"
                style={{ animationDelay: `${1.4 + index * 0.2}s` }}
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:accent-gradient transition-all duration-300">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {item.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="text-sm px-3 py-1 bg-secondary rounded-full hover:bg-foreground/10 transition-colors duration-300 animate-fade-in-up"
                      style={{ animationDelay: `${1.6 + index * 0.2 + idx * 0.1}s` }}
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
