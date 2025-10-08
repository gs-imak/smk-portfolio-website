"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, ArrowLeft, Mail, Phone, MapPin, Github, Star, Award, Calendar, Zap, Target, Users } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

export default function CVPage() {
  // Mouse spotlight effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 left-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>

      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="outline" className="mb-8 group rounded-full px-6 py-2 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 text-foreground hover:text-foreground transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Button>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <Star className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium">Available for Work</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  George Simak
                </span>
                <br />
                <span className="accent-gradient inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Developer
                </span>
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.6s' }}>Full-Stack Developer</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Button className="group magnetic glow-on-hover rounded-full px-8 py-3 bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" className="group rounded-full px-8 py-3 border-2 border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 text-purple-400 hover:text-purple-300 transition-all duration-300">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Email Card */}
          <div 
            className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] cursor-pointer overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div 
                className="absolute inset-0" 
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 40%)`
                }}
              />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Mail className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2 text-white">Email</h3>
                <p className="text-sm text-gray-400 font-medium">georgesimak@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div 
            className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] cursor-pointer overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div 
                className="absolute inset-0" 
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.15), transparent 40%)`
                }}
              />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <Phone className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2 text-white">Phone</h3>
                <p className="text-sm text-gray-400 font-medium">+33 7 69 59 22 21</p>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div 
            className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] cursor-pointer overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div 
                className="absolute inset-0" 
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.15), transparent 40%)`
                }}
              />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <MapPin className="h-6 w-6 text-violet-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2 text-white">Location</h3>
                <p className="text-sm text-gray-400 font-medium">Paris, France</p>
              </div>
            </div>
          </div>

          {/* GitHub Card */}
          <div 
            className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] cursor-pointer overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div 
                className="absolute inset-0" 
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 40%)`
                }}
              />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Github className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2 text-white">GitHub</h3>
                <p className="text-sm text-gray-400 font-medium">georgiysimak</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Professional Summary */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Target className="h-6 w-6 text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Professional Summary</h2>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Full-Stack Developer with 5+ years of experience. Expertise in HTML, CSS, JavaScript, 
                  and modern frameworks like React, Vue.js, and Angular. Experienced in client consulting 
                  and pair-programming, ready to contribute to your company&apos;s success with robust, 
                  scalable solutions and clean code practices.
                </p>
              </div>
            </div>

            {/* Experience Timeline */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Calendar className="h-6 w-6 text-purple-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
                </div>
                
                <div className="space-y-8">
                  {/* Timeline Item 1 - Widerml */}
                  <div className="relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-background"></div>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-xl font-bold text-white">Lead Front-end Developer</h3>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 w-fit">Fév 2025 - Juil 2025</Badge>
                      </div>
                      <p className="text-gray-300 font-medium">Widerml • Paris, France</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                          <span className="text-sm text-gray-400">Mise en place et gestion de l&apos;infrastructure AWS (EC2, S3, IAM, CloudFront) et des déploiements sur serveurs Linux</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                          <span className="text-sm text-gray-400">Intégration de l&apos;API OpenAI pour la génération automatique et la personnalisation de contenu marketing</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                          <span className="text-sm text-gray-400">Refonte du front-end et optimisation du back-end pour une meilleure performance et stabilité</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                          <span className="text-sm text-gray-400">Supervision du pipeline CI/CD et amélioration des processus DevOps</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                          <span className="text-sm text-gray-400">Collaboration avec les équipes produit et design sur les choix techniques clés</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 2 - Edumalin */}
                  <div className="relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-background"></div>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-xl font-bold text-white">Full-Stack Developer</h3>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 w-fit">Sept 2023 - Dec 2024</Badge>
                      </div>
                      <p className="text-gray-300 font-medium">Edumalin • Paris</p>
                      <p className="text-sm text-gray-400 italic">Contributor in a team of 3 developers for a new generation educational platform integrating personalized learning modules, advanced pedagogical tools and adaptive quiz systems.</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-2">Planning & Architecture</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Active contribution to technical migrations: Vue.js 2 → Vue 3 → React</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Implementation of robust architecture using NgRx for state management</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Integration of Neo4j and MongoDB databases for advanced data management</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Daily use of CI/CD pipelines to automate deployments and tests</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-2">Development & UX</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Conception of reusable UI components with Figma and Storybook</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Implementation of innovative vocal solution for accessibility</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Complete instant messaging backend development</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-2">Maintenance & Evolution</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Seamless integration with existing ENT/LMS systems</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Continuous performance optimization and user experience improvement</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Proactive bug resolution and functionality improvements</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 3 - Velvet Consulting */}
                  <div className="relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-background"></div>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-xl font-bold text-white">Full-Stack Developer</h3>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 w-fit">Sept 2021 - Dec 2023</Badge>
                      </div>
                      <p className="text-gray-300 font-medium">Velvet Consulting • Paris, France</p>
                      <p className="text-sm text-gray-400 italic">Team member responsible for conception and development of complex web applications and websites for top-tier clients, particularly in the CAC40.</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-2">High-Performance Web Development</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Complete development cycle (front-end and back-end) for UGC, Atlantic, TotalEnergie sites</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Robust and scalable architectures using Angular, Vue.js, MongoDB, Drupal</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Push optimizations achieving 98+/100 web performance scores</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-2">Advanced Technical Integration</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Secured RESTful APIs for transparent integration</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Automation of deployments and tests via CI/CD pipelines</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-purple-400 mb-2">Continuous Improvement</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">20% conversion rate optimization for client newsletters via Drupal</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                              <span className="text-sm text-gray-400">Clean code practices, unit tests, modular architecture</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills with Progress */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Zap className="h-5 w-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Technical Expertise</h2>
                </div>
                
                <div className="space-y-4">
                  {/* Front-end - Primary Focus */}
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-bold">Primary Focus</Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-white">Front-end Development</span>
                        <span className="text-sm font-bold text-purple-400">Expert</span>
                      </div>
                      <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: '95%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Vue.js</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">React</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Angular</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">TypeScript</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Next.js</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Tailwind</Badge>
                    </div>
                  </div>

                  {/* Back-end */}
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-white">Back-end Development</span>
                        <span className="text-sm font-bold text-purple-400">Advanced</span>
                      </div>
                      <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: '85%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Node.js</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Python</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">PHP</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Django</Badge>
                    </div>
                  </div>

                  {/* Databases */}
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-white">Databases & APIs</span>
                        <span className="text-sm font-bold text-purple-400">Advanced</span>
                      </div>
                      <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: '90%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">MongoDB</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Neo4j</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">GraphDB</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">REST API</Badge>
                    </div>
                  </div>

                  {/* DevOps & Tools */}
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-white">DevOps & Cloud</span>
                        <span className="text-sm font-bold text-purple-400">Proficient</span>
                      </div>
                      <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: '85%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">AWS</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Docker</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">CI/CD</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Git</Badge>
                      <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs font-semibold">Linux</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Award className="h-5 w-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Education</h2>
                </div>
                <div className="space-y-4">
                  {/* Master 2 */}
                  <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/30 hover:border-purple-500/50 transition-all">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-300">M2</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold mb-1 text-white leading-tight">Master 2 Data Engineer</h3>
                        <p className="text-xs text-purple-400 font-medium mb-1">L&apos;école Multimédia</p>
                        <p className="text-xs text-gray-500">Paris, France</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Deep Learning</Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Python</Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Django</Badge>
                    </div>
                  </div>

                  {/* Master 1 */}
                  <div className="relative p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-400">M1</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold mb-1 text-white leading-tight">Master 1 Développeur Multimédia</h3>
                        <p className="text-xs text-purple-400 font-medium mb-1">L&apos;école Multimédia</p>
                        <p className="text-xs text-gray-500">Paris, France</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Web Dev</Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Architecture</Badge>
                    </div>
                  </div>

                  {/* Chef de Projet */}
                  <div className="relative p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-purple-400">B+3</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold mb-0.5 text-white leading-tight">Chef de Projet Digital</h3>
                        <p className="text-xs text-gray-400">F2i • Paris, France</p>
                      </div>
                    </div>
                  </div>

                  {/* Digital Marketing */}
                  <div className="relative p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-purple-400">BA</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold mb-0.5 text-white leading-tight">Digital Marketing</h3>
                        <p className="text-xs text-gray-400">HELP UNIVERSITY • Malaysia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 40%)`
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Languages</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">French</span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Conversational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">English</span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Conversational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Russian</span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Conversational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Ukrainian</span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Conversational</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
