"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { memo } from "react";
import Image from "next/image";

export const Hero = memo(function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 left-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Typography */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <Sparkles className="h-3 w-3" />
                <p className="text-xs uppercase tracking-wider">
                  Frontend & Game Developer
                </p>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Creating
                </span>
                <br />
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Digital
                </span>
                <br />
                <span className="accent-gradient inline-block animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  Experiences
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                I design and develop modern web applications and interactive experiences
                that users love. Based in San Francisco, working with clients worldwide.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("#projects")}
                className="group magnetic glow-on-hover rounded-full px-12 py-6 text-lg bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#contact")}
                className="magnetic spotlight rounded-full px-12 py-6 text-lg border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 text-foreground hover:text-foreground transition-all duration-300"
              >
                Get In Touch
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:georgiy@example.com"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl" />
              
              {/* Subtle pulsing orbs */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-lg opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
              
              {/* Profile Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/avatar/arms crossed.png"
                    alt="George Simak"
                    width={500}
                    height={500}
                    className="object-contain relative z-10 hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
