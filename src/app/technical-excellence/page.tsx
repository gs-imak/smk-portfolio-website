"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, Zap, CheckCircle, Terminal, Database, Cloud, Rocket, Play, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function TechnicalExcellencePage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // Mouse spotlight effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const technicalChallenges = [
    {
      icon: Code,
      title: "Frontend Architecture",
      description: "Vue 2 → Vue 3 → React migration for 100K+ users",
      achievements: [
        "Zero downtime migration",
        "40% performance improvement",
        "Maintained backward compatibility"
      ],
      tech: ["Vue.js", "React", "TypeScript", "NgRx"],
      color: "purple"
    },
    {
      icon: Database,
      title: "Database Optimization",
      description: "Neo4j & MongoDB integration for educational platform",
      achievements: [
        "Reduced query time by 60%",
        "Handled 10M+ records",
        "Implemented graph algorithms"
      ],
      tech: ["Neo4j", "MongoDB", "GraphDB", "Indexing"],
      color: "blue"
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "AWS deployment with auto-scaling and CI/CD",
      achievements: [
        "99.9% uptime achieved",
        "50% cost reduction",
        "Automated deployments"
      ],
      tech: ["AWS", "Docker", "CI/CD", "Linux"],
      color: "indigo"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Achieved 98+/100 web performance for CAC40 sites",
      achievements: [
        "98+/100 Lighthouse score",
        "2s → 0.8s load time",
        "20% conversion increase"
      ],
      tech: ["Webpack", "Lazy Loading", "CDN", "Caching"],
      color: "purple"
    }
  ];

  const commonChallenges = [
    {
      category: "Algorithms & Data Structures",
      challenges: [
        { name: "React State Management", complexity: "Medium", solved: "✓" },
        { name: "Vue Component Optimization", complexity: "Medium", solved: "✓" },
        { name: "API Rate Limiting", complexity: "Hard", solved: "✓" },
        { name: "Real-time Data Sync", complexity: "Hard", solved: "✓" }
      ]
    },
    {
      category: "System Design",
      challenges: [
        { name: "Scalable Chat System", complexity: "Hard", solved: "✓" },
        { name: "Microservices Architecture", complexity: "Hard", solved: "✓" },
        { name: "CDN & Caching Strategy", complexity: "Medium", solved: "✓" },
        { name: "Database Sharding", complexity: "Hard", solved: "✓" }
      ]
    },
    {
      category: "Frontend Patterns",
      challenges: [
        { name: "Component Library (Storybook)", complexity: "Medium", solved: "✓" },
        { name: "State Management (NgRx)", complexity: "Medium", solved: "✓" },
        { name: "SSR/SSG with Next.js", complexity: "Medium", solved: "✓" },
        { name: "Accessibility (WCAG)", complexity: "Medium", solved: "✓" }
      ]
    }
  ];

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 left-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>

      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <Link href="/">
            <Button variant="outline" className="mb-8 group rounded-full px-6 py-2 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 text-foreground hover:text-foreground transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Button>
          </Link>
          
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Terminal className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">Technical Showcase</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-6">
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Technical
              </span>
              <br />
              <span className="accent-gradient inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Excellence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Real solutions to complex problems. 5+ years of proven expertise.
            </p>

            {/* Skip Interview CTA */}
            <div 
              className="group relative bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-indigo-500/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)] overflow-hidden animate-fade-in-up"
              style={{ animationDelay: '0.8s' }}
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.2), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-lg font-bold text-white">Skip the 6-Round Interview Process</span>
                </div>
                <p className="text-gray-300 mb-6">
                  I&apos;ve already solved these challenges in production. Let&apos;s have a focused 30-minute technical discussion instead.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/#contact">
                    <Button className="h-12 px-8 rounded-xl text-base font-semibold bg-white text-purple-900 hover:bg-gray-100 border-0 shadow-xl transition-all duration-300">
                      Schedule 30-Min Call
                    </Button>
                  </Link>
                  <span className="text-sm text-gray-400">or explore my solutions below</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Challenges Solved */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="accent-gradient">Real-World Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Complex problems I&apos;ve solved in production for CAC40 companies and high-traffic platforms
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {technicalChallenges.map((challenge, index) => {
              const IconComponent = challenge.icon;
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
              const colors = colorMap[challenge.color as keyof typeof colorMap];

              return (
                <div
                  key={index}
                  className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden"
                  onMouseMove={handleMouseMove}
                >
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
                    
                    <h3 className="text-2xl font-bold mb-3 text-white">{challenge.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{challenge.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {challenge.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {challenge.tech.map((tech, idx) => (
                        <Badge key={idx} className={`${colors.bg} ${colors.icon} border ${colors.border} text-xs`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Common Interview Challenges */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="accent-gradient">Common Challenges Solved</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Standard interview questions I&apos;ve mastered through real production experience
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {commonChallenges.map((category, index) => (
              <div
                key={index}
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
                  <h3 className="text-xl font-bold mb-6 text-white">{category.category}</h3>
                  <div className="space-y-3">
                    {category.challenges.map((challenge, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-green-400 text-lg">{challenge.solved}</span>
                          <span className="text-sm text-gray-300">{challenge.name}</span>
                        </div>
                        <Badge className={`text-xs ${
                          challenge.complexity === 'Hard' 
                            ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {challenge.complexity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="accent-gradient">Live Code Examples</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Interactive demos of production-ready code from real projects
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vue to React Migration */}
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">State Management Pattern</h3>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">NgRx</Badge>
                </div>
                
                <div className="bg-black/40 rounded-xl p-4 mb-4 border border-purple-500/20">
                  <pre className="text-xs text-gray-300 overflow-x-auto">
                    <code>{`// Production NgRx Store Pattern
export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(loadUsers, (state) => ({ 
      ...state, 
      loading: true 
    })),
    on(loadUsersSuccess, (state, { users }) => 
      adapter.setAll(users, { 
        ...state, 
        loading: false 
      })
    )
  )
});`}</code>
                  </pre>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  Used in production for Edumalin&apos;s 100K+ user platform
                </p>

                <div className="flex gap-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="rounded-full border-purple-500/30 hover:border-purple-500">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Performance Optimization */}
            <div
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.12), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Performance Hook</h3>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">React</Badge>
                </div>
                
                <div className="bg-black/40 rounded-xl p-4 mb-4 border border-blue-500/20">
                  <pre className="text-xs text-gray-300 overflow-x-auto">
                    <code>{`// Lazy Load + Code Splitting
const useLazyComponent = (importFn) => {
  const [Component, setComponent] = 
    useState(null);
    
  useEffect(() => {
    importFn().then((mod) => 
      setComponent(() => mod.default)
    );
  }, []);
  
  return Component;
};`}</code>
                  </pre>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  Reduced bundle size by 40% for CAC40 client sites
                </p>

                <div className="flex gap-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="rounded-full border-blue-500/30 hover:border-blue-500">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div 
            className="group relative bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-xl border-2 border-purple-500/30 rounded-3xl p-12 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)] overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div 
                className="absolute inset-0" 
                style={{
                  background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 40%)`
                }}
              />
            </div>

            <div className="relative z-10">
              <Rocket className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Ready to Work Together?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Skip the endless technical interviews. I&apos;ve proven my expertise in production. 
                Let&apos;s have a focused 30-minute discussion about your project needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/#contact">
                  <Button className="h-14 px-8 rounded-xl text-base font-semibold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-700 hover:via-purple-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300">
                    Schedule Discovery Call
                  </Button>
                </Link>
                <Link href="/#services">
                  <Button variant="outline" className="h-14 px-8 rounded-xl text-base font-semibold border-2 border-white/20 hover:border-purple-500/50 bg-transparent hover:bg-purple-500/10 transition-all duration-300">
                    View Pricing
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                €100/hour • Custom project pricing • Free 30-minute consultation
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

