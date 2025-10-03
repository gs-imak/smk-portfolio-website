import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, ArrowLeft, Mail, Phone, MapPin, Github, Star, Award, Calendar, Zap, Target, Users } from "lucide-react";
import Link from "next/link";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated gradient blobs - same as hero section */}
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
        <Card className="p-8 mb-12 gradient-border-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                <Mail className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">georgesimak@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                <MapPin className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">Paris, France</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">LinkedIn</p>
                <p className="font-medium">linkedin.com/in/george-simak</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                <Github className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">GitHub</p>
                <p className="font-medium">github.com/georgiysimak</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Professional Summary */}
            <Card className="p-8 group hover:border-purple-500/50 transition-all duration-300 hover-scale">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold">Professional Summary</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Full-Stack Developer with 5+ years of experience. Expertise in HTML, CSS, JavaScript, 
                and modern frameworks like React, Vue.js, and Angular. Experienced in client consulting 
                and pair-programming, ready to contribute to your company&apos;s success with robust, 
                scalable solutions and clean code practices.
              </p>
            </Card>

            {/* Experience Timeline */}
            <Card className="p-8 group hover:border-blue-500/50 transition-all duration-300 hover-scale">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-green-500/20 group-hover:from-blue-500/30 group-hover:to-green-500/30 transition-all">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold">Professional Experience</h2>
              </div>
              
              <div className="space-y-8">
                {/* Timeline Item 1 */}
                <div className="relative pl-8 border-l-2 border-blue-500/30 hover:border-blue-500/60 transition-colors">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-background"></div>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-bold">Full-Stack Developer</h3>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Sept 2023 - Dec 2024</Badge>
                    </div>
                    <p className="text-muted-foreground font-medium">Edumalin • Paris</p>
                    <p className="text-sm text-muted-foreground italic">Contributor in a team of 3 developers for a new generation educational platform integrating personalized learning modules, advanced pedagogical tools and adaptive quiz systems.</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-2">Planning & Architecture</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Active contribution to technical migrations: Vue.js 2 → Vue 3 → React</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Implementation of robust architecture using NgRx for state management</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Integration of Neo4j and MongoDB databases for advanced data management</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Daily use of CI/CD pipelines to automate deployments and tests</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-2">Development & UX</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Conception of reusable UI components with Figma and Storybook</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Implementation of innovative vocal solution for accessibility</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Complete instant messaging backend development</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-2">Maintenance & Evolution</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Seamless integration with existing ENT/LMS systems</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Continuous performance optimization and user experience improvement</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Proactive bug resolution and functionality improvements</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-background"></div>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-bold">Full-Stack Developer</h3>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Sept 2021 - Dec 2023</Badge>
                    </div>
                    <p className="text-muted-foreground font-medium">Velvet Consulting • Paris, France</p>
                    <p className="text-sm text-muted-foreground italic">Team member responsible for conception and development of complex web applications and websites for top-tier clients, particularly in the CAC40.</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-purple-400 mb-2">High-Performance Web Development</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Complete development cycle (front-end and back-end) for UGC, Atlantic, TotalEnergie sites</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Robust and scalable architectures using Angular, Vue.js, MongoDB, Drupal</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Push optimizations achieving 98+/100 web performance scores</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-2">Advanced Technical Integration</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Secured RESTful APIs for transparent integration</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Automation of deployments and tests via CI/CD pipelines</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-2">Continuous Improvement</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">20% conversion rate optimization for client newsletters via Drupal</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                            <span className="text-sm">Clean code practices, unit tests, modular architecture</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills with Progress */}
            <Card className="p-6 group hover:border-purple-500/50 transition-all duration-300 hover-scale">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                  <Zap className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold">Technical Skills</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Frontend Development</span>
                    <span className="text-sm text-muted-foreground">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Vue.js</Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">React</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">TypeScript</Badge>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">JavaScript</Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Angular</Badge>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Backend Development</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Node.js</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Python</Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">PHP</Badge>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">REST API</Badge>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Databases</span>
                    <span className="text-sm text-muted-foreground">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">MongoDB</Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Neo4j</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">GraphDB</Badge>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">SQL</Badge>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">DevOps & Tools</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">GitHub/GitLab</Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Figma</Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Docker</Badge>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">Storybook</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Education */}
            <Card className="p-6 group hover:border-blue-500/50 transition-all duration-300 hover-scale">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-green-500/20 group-hover:from-blue-500/30 group-hover:to-green-500/30 transition-all">
                  <Award className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold">Education</h2>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h3 className="text-lg font-semibold mb-1">Master 2 Data Engineer</h3>
                  <p className="text-sm text-muted-foreground mb-1">L&apos;école Multimédia • Paris</p>
                  <p className="text-xs text-muted-foreground mt-2">Deep Learning with Keras, Python fundamentals, Django & Panda fundamentals</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <h3 className="text-lg font-semibold mb-1">Master 1 Développeur Multimédia</h3>
                  <p className="text-sm text-muted-foreground mb-1">L&apos;école Multimédia • Paris</p>
                  <p className="text-xs text-muted-foreground mt-2">Web Development, Software Design, Software Architecture</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h3 className="text-lg font-semibold mb-1">Chef de Projet Digital</h3>
                  <p className="text-sm text-muted-foreground mb-1">F2i • Paris, France</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <h3 className="text-lg font-semibold mb-1">Digital Marketing & Communication</h3>
                  <p className="text-sm text-muted-foreground mb-1">HELP UNIVERSITY • Kuala Lumpur, Malaysia</p>
                </div>
              </div>
            </Card>

            {/* Languages */}
            <Card className="p-6 group hover:border-orange-500/50 transition-all duration-300 hover-scale">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 group-hover:from-orange-500/30 group-hover:to-pink-500/30 transition-all">
                  <Users className="h-5 w-5 text-orange-400" />
                </div>
                <h2 className="text-xl font-bold">Languages</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="text-sm font-medium">French</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Conversational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <span className="text-sm font-medium">English</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Conversational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <span className="text-sm font-medium">Russian</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Conversational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <span className="text-sm font-medium">Ukrainian</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Conversational</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
