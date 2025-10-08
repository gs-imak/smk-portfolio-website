"use client";

import { Button } from "@/components/ui/button";
import { FileText, Code, Database, Wrench, Zap, Code2, Figma, GitBranch, Container, Globe, Server, HardDrive, Network, Box, Terminal, Shapes } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

export const Skills = memo(function Skills() {
  const skills = [
    { 
      category: "Frontend", 
      items: [
        { name: "Vue.js", icon: Zap },
        { name: "React", icon: Code },
        { name: "Angular", icon: Code2 },
        { name: "TypeScript", icon: Terminal },
        { name: "JavaScript", icon: Code }
      ], 
      icon: Code 
    },
    { 
      category: "Backend", 
      items: [
        { name: "Node.js", icon: Server },
        { name: "Python", icon: Terminal },
        { name: "PHP", icon: Code },
        { name: "REST APIs", icon: Network },
        { name: "Django", icon: Server }
      ], 
      icon: Database 
    },
    { 
      category: "Databases", 
      items: [
        { name: "MongoDB", icon: HardDrive },
        { name: "Neo4j", icon: Network },
        { name: "GraphDB", icon: Database },
        { name: "SQL", icon: HardDrive },
        { name: "Drupal", icon: Box }
      ], 
      icon: Database 
    },
    { 
      category: "Tools", 
      items: [
        { name: "Git/GitHub", icon: GitBranch },
        { name: "Figma", icon: Figma },
        { name: "Docker", icon: Container },
        { name: "Storybook", icon: Shapes },
        { name: "CI/CD", icon: Globe }
      ], 
      icon: Wrench 
    },
  ];

  return (
    <section id="skills" className="py-32 bg-secondary/30 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 left-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wider text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                My Expertise
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Tools I Work
                </span>
                <br />
                <span className="accent-gradient inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  With Daily
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                I stay updated with the latest technologies to deliver modern, 
                efficient solutions for every project. From frontend frameworks to 
                game engines, I master the tools that bring ideas to life.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                Each technology is carefully chosen for its performance, community 
                support, and ability to create exceptional user experiences.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <Link href="/cv">
                <Button variant="outline" className="group rounded-full px-6 py-2 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 text-foreground hover:text-foreground transition-all duration-300">
                  <FileText className="mr-2 h-4 w-4" />
                  View My CV
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Skills Grid */}
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skillGroup, index) => {
              const IconComponent = skillGroup.icon;
              const colors = [
                "from-purple-500/20 to-pink-500/20",
                "from-blue-500/20 to-cyan-500/20", 
                "from-green-500/20 to-emerald-500/20",
                "from-orange-500/20 to-red-500/20"
              ];
              const iconColors = [
                "text-purple-400",
                "text-blue-400",
                "text-green-400", 
                "text-orange-400"
              ];
              
              return (
                <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${1.2 + index * 0.2}s` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${colors[index]} transition-all duration-300 group-hover:scale-105`}>
                      <IconComponent className={`h-4 w-4 ${iconColors[index]}`} />
                    </div>
                    <h3 className="text-sm font-bold">{skillGroup.category}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {skillGroup.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="group/item flex items-center gap-2 p-2 rounded-md bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in-up"
                          style={{ animationDelay: `${1.4 + index * 0.2 + idx * 0.1}s` }}
                        >
                          <div className="w-4 h-4 rounded-md bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <ItemIcon className="h-3 w-3 text-foreground/70 group-hover/item:text-foreground transition-colors" />
                          </div>
                          <span className="font-medium text-xs group-hover/item:text-foreground transition-colors">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});