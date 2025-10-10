"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Calendar, Tag, Users, Zap } from "lucide-react";

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
      <DialogContent className="!max-w-[75vw] !w-[75vw] !max-h-[85vh] overflow-y-auto modal-scroll bg-[#13111C]/95 backdrop-blur-xl border border-white/[0.15] shadow-2xl [&>button]:!top-6 [&>button]:!right-6">
        <DialogHeader className="relative">
          {/* Accent gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full" />
          
          <div className="flex items-center gap-4 mt-6">
            <Badge variant="outline" className="text-sm px-3 py-1 border-purple-500/30 text-purple-400 bg-purple-500/10">
              {project.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-1 h-1 bg-purple-500 rounded-full" />
              <span>{project.year}</span>
            </div>
          </div>
          <DialogTitle className="text-3xl sm:text-4xl font-bold mt-4 text-white">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-300 mt-2">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Project Image - Smaller */}
          <div className="aspect-[21/9] bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-white/[0.08] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                {project.category === "Game" ? "🎮" : "💻"}
              </div>
            </div>
            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Project Description */}
          <div className="space-y-4 p-6 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08]">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              About This Project
            </h3>
            <p className="text-base text-gray-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Technologies */}
            <div className="space-y-4 p-6 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08]">
              <h4 className="text-lg font-bold flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Zap className="h-4 w-4 text-purple-400" />
                </div>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs px-3 py-1 bg-white/[0.05] border-white/[0.1] text-gray-300 hover:bg-white/[0.08] transition-colors">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4 p-6 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08]">
              <h4 className="text-lg font-bold flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Calendar className="h-4 w-4 text-blue-400" />
                </div>
                Project Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03]">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Category:</span>
                  <span className="font-medium text-white">{project.category}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03]">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Year:</span>
                  <span className="font-medium text-white">{project.year}</span>
                </div>
                {project.teamSize && (
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03]">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Team:</span>
                    <span className="font-medium text-white">{project.teamSize}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03]">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-medium text-white">{project.duration}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Challenges & Results */}
          {(project.challenges || project.results) && (
            <div className="grid md:grid-cols-2 gap-6">
              {project.challenges && (
                <div className="space-y-4 p-6 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08]">
                  <h4 className="text-lg font-bold text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    </div>
                    Key Challenges
                  </h4>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                        <span className="text-orange-400 mt-0.5">•</span>
                        <span className="leading-relaxed">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.results && (
                <div className="space-y-4 p-6 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08]">
                  <h4 className="text-lg font-bold text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    Results & Impact
                  </h4>
                  <ul className="space-y-2">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span className="leading-relaxed">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-white/[0.08]">
            {project.githubUrl && (
              <Button
                variant="outline"
                className="group rounded-full px-6 py-3 border-2 border-white/[0.15] hover:border-purple-500/50 hover:bg-purple-500/10 text-white hover:text-purple-300 transition-all duration-300"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                View Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                className="group rounded-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Live Demo
              </Button>
            )}
            {!project.githubUrl && !project.liveUrl && (
              <div className="text-sm text-gray-400 italic p-4 bg-white/[0.03] rounded-lg border border-white/[0.08]">
                Project details and links coming soon...
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
