"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github, ExternalLink, Calendar, Tag, Users, Zap } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  category: string;
  technologies: string[];
  featured: boolean;
  longDescription?: string;
  challenges?: string[];
  results?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  teamSize?: string;
  duration?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[75vw] !w-[75vw] !max-h-[80vh] !h-[80vh] !top-[10%] !left-[12.5%] !translate-x-0 !translate-y-0 overflow-y-auto modal-scroll bg-background/95 backdrop-blur-xl border border-border/30 shadow-2xl [&>button]:!top-8 [&>button]:!right-6">
        <DialogHeader className="relative">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500 rounded-full" />
          
          <div className="flex items-center gap-4 mt-6">
            <Badge variant="outline" className="text-sm px-3 py-1 border-purple-500/30 text-purple-400 bg-purple-500/10">
              {project.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>{project.year}</span>
            </div>
          </div>
          <DialogTitle className="text-4xl sm:text-5xl font-bold mt-6 text-foreground">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground mt-2">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Project Image */}
          <div className="aspect-[16/9] bg-purple-500/10 rounded-2xl border border-border/50 relative overflow-hidden group shadow-lg">
            <div className="absolute inset-0 bg-purple-500/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-7xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                {project.category === "Game" ? "🎮" : "💻"}
              </div>
            </div>
            {/* Animated corner accent */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-purple-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-purple-500/5" />
          </div>

          {/* Project Description */}
          <div className="space-y-4 p-6 bg-foreground/5 rounded-xl border border-border/30">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              About This Project
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Technologies */}
            <div className="space-y-4 p-5 bg-foreground/5 rounded-xl border border-border/30">
              <h4 className="text-xl font-bold flex items-center gap-3 text-foreground">
                <div className="p-2 rounded-lg bg-foreground/10">
                  <Zap className="h-5 w-5 text-foreground" />
                </div>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm px-3 py-1 bg-foreground/10 border-border/30 text-foreground hover:bg-foreground/20 transition-colors">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4 p-5 bg-foreground/5 rounded-xl border border-border/30">
              <h4 className="text-xl font-bold flex items-center gap-3 text-foreground">
                <div className="p-2 rounded-lg bg-foreground/10">
                  <Calendar className="h-5 w-5 text-foreground" />
                </div>
                Project Details
              </h4>
              <div className="space-y-3 text-base">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-foreground/5">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium text-foreground">{project.category}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-foreground/5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Year:</span>
                  <span className="font-medium text-foreground">{project.year}</span>
                </div>
                {project.teamSize && (
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-foreground/5">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Team:</span>
                    <span className="font-medium text-foreground">{project.teamSize}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-foreground/5">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{project.duration}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Challenges & Results */}
          {(project.challenges || project.results) && (
            <div className="grid md:grid-cols-2 gap-6">
              {project.challenges && (
                <div className="space-y-4 p-5 bg-foreground/5 rounded-xl border border-border/30">
                  <h4 className="text-xl font-bold text-foreground flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-foreground/10">
                      <div className="w-2 h-2 bg-foreground rounded-full" />
                    </div>
                    Key Challenges
                  </h4>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-base text-muted-foreground flex items-start gap-3 p-3 rounded-lg bg-foreground/5 border border-border/20">
                        <span className="text-foreground mt-1 text-sm font-bold">•</span>
                        <span className="leading-relaxed">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.results && (
                <div className="space-y-4 p-5 bg-foreground/5 rounded-xl border border-border/30">
                  <h4 className="text-xl font-bold text-foreground flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-foreground/10">
                      <div className="w-2 h-2 bg-foreground rounded-full" />
                    </div>
                    Results & Impact
                  </h4>
                  <ul className="space-y-3">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="text-base text-muted-foreground flex items-start gap-3 p-3 rounded-lg bg-foreground/5 border border-border/20">
                        <span className="text-foreground mt-1 text-sm font-bold">•</span>
                        <span className="leading-relaxed">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-border/30">
            {project.githubUrl && (
              <Button
                variant="outline"
                className="group rounded-full px-6 py-3 border-2 border-foreground/20 hover:border-purple-500/50 hover:bg-purple-500/10 text-foreground hover:text-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                View Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                className="group magnetic glow-on-hover rounded-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Live Demo
              </Button>
            )}
            {!project.githubUrl && !project.liveUrl && (
              <div className="text-base text-muted-foreground italic p-4 bg-foreground/5 rounded-lg border border-border/30">
                Project details and links coming soon...
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
