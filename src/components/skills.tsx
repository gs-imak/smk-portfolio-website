"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { FileText, Code, Database, Wrench, Zap, Code2, Figma, GitBranch, Container, Globe, Server, HardDrive, Network, Box, Terminal, Shapes, X } from "lucide-react";
import Link from "next/link";
import { memo, useCallback, useState } from "react";

export const Skills = memo(function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);
  
  const skills = [
    { 
      category: "Frontend", 
      items: [
        { name: "Vue.js", icon: Zap, level: 95 },
        { name: "React", icon: Code, level: 90 },
        { name: "Angular", icon: Code2, level: 85 },
        { name: "TypeScript", icon: Terminal, level: 92 },
        { name: "JavaScript", icon: Code, level: 95 }
      ], 
      icon: Code,
      description: "Expert in building modern, responsive web applications with Vue.js, React, and Angular. Proficient in TypeScript and JavaScript ES6+.",
      expertise: [
        "Advanced component architecture and state management",
        "Performance optimization and bundle size reduction",
        "Responsive design and mobile-first development",
        "Progressive Web Apps (PWA) implementation",
        "Modern build tools (Vite, Webpack, Turbopack)"
      ],
      projects: [
        "Led Vue.js 2 → Vue 3 → React migration for Edumalin",
        "Built real-time collaborative features with WebSocket",
        "Developed reusable component library with Storybook"
      ]
    },
    { 
      category: "Backend", 
      items: [
        { name: "Node.js", icon: Server, level: 88 },
        { name: "Python", icon: Terminal, level: 80 },
        { name: "PHP", icon: Code, level: 75 },
        { name: "REST APIs", icon: Network, level: 92 },
        { name: "Django", icon: Server, level: 78 }
      ], 
      icon: Database,
      description: "Strong backend development skills with Node.js, Python, and RESTful API design. Experience with microservices and serverless architectures.",
      expertise: [
        "RESTful API design and GraphQL implementation",
        "Database optimization and query performance",
        "Authentication & authorization (JWT, OAuth)",
        "Microservices architecture and event-driven systems",
        "Server deployment and cloud infrastructure (AWS, Linux)"
      ],
      projects: [
        "Developed complete instant messaging backend system",
        "Integrated OpenAI API for content generation",
        "Built scalable REST APIs serving 10K+ users"
      ]
    },
    { 
      category: "Databases", 
      items: [
        { name: "MongoDB", icon: HardDrive, level: 85 },
        { name: "Neo4j", icon: Network, level: 82 },
        { name: "GraphDB", icon: Database, level: 80 },
        { name: "SQL", icon: HardDrive, level: 88 },
        { name: "Drupal", icon: Box, level: 70 }
      ], 
      icon: Database,
      description: "Experienced in both SQL and NoSQL databases, with specialized knowledge in graph databases (Neo4j, GraphDB) for complex data relationships.",
      expertise: [
        "Database schema design and normalization",
        "Query optimization and indexing strategies",
        "Graph database modeling for complex relationships",
        "Data migration and synchronization",
        "MongoDB aggregation pipelines and performance tuning"
      ],
      projects: [
        "Implemented Neo4j for educational content relationships",
        "Optimized MongoDB queries reducing load time by 60%",
        "Designed scalable database architecture for multi-tenant app"
      ]
    },
    { 
      category: "Tools", 
      items: [
        { name: "Git/GitHub", icon: GitBranch, level: 92 },
        { name: "Figma", icon: Figma, level: 85 },
        { name: "Docker", icon: Container, level: 80 },
        { name: "Storybook", icon: Shapes, level: 88 },
        { name: "CI/CD", icon: Globe, level: 85 }
      ], 
      icon: Wrench,
      description: "Proficient with modern development tools and workflows. Strong focus on collaboration, design systems, and automated deployment pipelines.",
      expertise: [
        "Git workflow management and branching strategies",
        "Component-driven development with Storybook",
        "Docker containerization and orchestration",
        "CI/CD pipeline setup (GitHub Actions, GitLab CI)",
        "Design collaboration and prototyping with Figma"
      ],
      projects: [
        "Set up CI/CD pipelines for automated testing and deployment",
        "Created comprehensive Storybook component library",
        "Managed AWS infrastructure (EC2, S3, CloudFront, IAM)"
      ]
    },
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 left-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Centered */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              My Expertise
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Tools I Work
            </span>
            <br />
            <span className="accent-gradient inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              With Daily
            </span>
          </h2>
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
          <div className="animate-fade-in-up mt-8" style={{ animationDelay: '1s' }}>
            <Link href="/cv">
              <Button variant="outline" className="group rounded-full px-6 py-2 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 text-foreground hover:text-foreground transition-all duration-300">
                <FileText className="mr-2 h-4 w-4" />
                View My CV
              </Button>
            </Link>
          </div>
        </div>

        {/* Skills Grid - Full Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {skills.map((skillGroup, index) => {
              const IconComponent = skillGroup.icon;
              const colorMap = {
                0: {
                  bg: "bg-purple-500/10",
                  border: "border-purple-500/20",
                  icon: "text-purple-400",
                  glow: "rgba(168, 85, 247, 0.12)"
                },
                1: {
                  bg: "bg-blue-500/10",
                  border: "border-blue-500/20",
                  icon: "text-blue-400",
                  glow: "rgba(59, 130, 246, 0.12)"
                },
                2: {
                  bg: "bg-green-500/10",
                  border: "border-green-500/20",
                  icon: "text-green-400",
                  glow: "rgba(34, 197, 94, 0.12)"
                },
                3: {
                  bg: "bg-orange-500/10",
                  border: "border-orange-500/20",
                  icon: "text-orange-400",
                  glow: "rgba(249, 115, 22, 0.12)"
                }
              };
              const colors = colorMap[index as keyof typeof colorMap];
              
              return (
                <div 
                  key={index} 
                  className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] overflow-hidden animate-fade-in-up h-full flex flex-col cursor-pointer"
                  style={{ animationDelay: `${1.2 + index * 0.2}s` }}
                  onMouseMove={handleMouseMove}
                  onClick={() => setSelectedSkill(index)}
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

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${colors.bg} border ${colors.border}`}>
                        <IconComponent className={`h-4 w-4 ${colors.icon}`} />
                      </div>
                      <h3 className="text-base font-bold text-white">{skillGroup.category}</h3>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      {skillGroup.items.map((item, idx) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={idx}
                            className="group/item flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 cursor-pointer"
                          >
                            <div className={`w-6 h-6 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center group-hover/item:scale-110 transition-transform flex-shrink-0`}>
                              <ItemIcon className={`h-3.5 w-3.5 ${colors.icon}`} />
                            </div>
                            <span className="font-medium text-xs text-gray-300 group-hover/item:text-white transition-colors">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Skill Detail Modal */}
      <Dialog open={selectedSkill !== null} onOpenChange={() => setSelectedSkill(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#13111C]/95 backdrop-blur-xl border border-white/[0.15] text-white">
          {selectedSkill !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4 text-3xl font-bold">
                  <div className={`p-3 rounded-xl ${
                    selectedSkill === 0 ? 'bg-purple-500/10 border border-purple-500/20' :
                    selectedSkill === 1 ? 'bg-blue-500/10 border border-blue-500/20' :
                    selectedSkill === 2 ? 'bg-green-500/10 border border-green-500/20' :
                    'bg-orange-500/10 border border-orange-500/20'
                  }`}>
                    {(() => {
                      const IconComponent = skills[selectedSkill].icon;
                      return <IconComponent className={`h-6 w-6 ${
                        selectedSkill === 0 ? 'text-purple-400' :
                        selectedSkill === 1 ? 'text-blue-400' :
                        selectedSkill === 2 ? 'text-green-400' :
                        'text-orange-400'
                      }`} />;
                    })()}
                  </div>
                  {skills[selectedSkill].category} Expertise
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  {skills[selectedSkill].description}
                </p>

                {/* Skills with Progress Bars */}
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${
                    selectedSkill === 0 ? 'text-purple-400' :
                    selectedSkill === 1 ? 'text-blue-400' :
                    selectedSkill === 2 ? 'text-green-400' :
                    'text-orange-400'
                  }`}>Technical Skills</h3>
                  <div className="space-y-4">
                    {skills[selectedSkill].items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ItemIcon className={`h-4 w-4 ${
                                selectedSkill === 0 ? 'text-purple-400' :
                                selectedSkill === 1 ? 'text-blue-400' :
                                selectedSkill === 2 ? 'text-green-400' :
                                'text-orange-400'
                              }`} />
                              <span className="font-medium text-white">{item.name}</span>
                            </div>
                            <span className="text-sm text-gray-400">{item.level}%</span>
                          </div>
                          <Progress 
                            value={item.level} 
                            className="h-2"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expertise Areas */}
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${
                    selectedSkill === 0 ? 'text-purple-400' :
                    selectedSkill === 1 ? 'text-blue-400' :
                    selectedSkill === 2 ? 'text-green-400' :
                    'text-orange-400'
                  }`}>Key Expertise</h3>
                  <div className="space-y-2">
                    {skills[selectedSkill].expertise.map((exp, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          selectedSkill === 0 ? 'bg-purple-500' :
                          selectedSkill === 1 ? 'bg-blue-500' :
                          selectedSkill === 2 ? 'bg-green-500' :
                          'bg-orange-500'
                        }`}></div>
                        <span className="text-sm text-gray-300">{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notable Projects */}
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${
                    selectedSkill === 0 ? 'text-purple-400' :
                    selectedSkill === 1 ? 'text-blue-400' :
                    selectedSkill === 2 ? 'text-green-400' :
                    'text-orange-400'
                  }`}>Notable Projects</h3>
                  <div className="space-y-3">
                    {skills[selectedSkill].projects.map((project, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                            selectedSkill === 0 ? 'bg-purple-500' :
                            selectedSkill === 1 ? 'bg-blue-500' :
                            selectedSkill === 2 ? 'bg-green-500' :
                            'bg-orange-500'
                          }`}></div>
                          <span className="text-sm text-gray-300 leading-relaxed">{project}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
});