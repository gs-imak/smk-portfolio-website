"use client";

import { useState, memo, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

// Lazy load the modal for better performance
const ProjectModal = lazy(() => import("@/components/project-modal").then(module => ({ default: module.ProjectModal })));

export const Projects = memo(function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory and payment processing",
      year: "2024",
      category: "Web App",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      featured: true,
      longDescription: "A comprehensive e-commerce platform built with modern web technologies. Features include real-time inventory management, secure payment processing with Stripe integration, user authentication, and an admin dashboard for managing products and orders.",
      challenges: [
        "Implementing real-time inventory updates across multiple users",
        "Optimizing payment processing for high transaction volumes",
        "Creating a responsive design that works across all devices"
      ],
      results: [
        "Reduced checkout time by 40% with streamlined payment flow",
        "Achieved 99.9% uptime with robust error handling",
        "Increased conversion rate by 25% with improved UX"
      ],
      githubUrl: "https://github.com/georgiysimak/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      teamSize: "Solo Project",
      duration: "3 months"
    },
    {
      id: 2,
      title: "Cyber Quest RPG",
      description: "Immersive 3D role-playing game with dynamic combat and branching narratives",
      year: "2023",
      category: "Game",
      technologies: ["Unity", "C#", "Blender", "FMOD"],
      featured: true,
      longDescription: "An immersive 3D RPG featuring dynamic combat systems, branching narrative paths, and stunning visual effects. Built with Unity and featuring custom shaders, procedural generation, and advanced AI systems for NPCs.",
      challenges: [
        "Creating engaging combat mechanics that feel responsive",
        "Implementing complex dialogue trees with multiple outcomes",
        "Optimizing performance for smooth gameplay on various devices"
      ],
      results: [
        "Achieved 4.8/5 rating on Steam with 1000+ downloads",
        "Featured in indie game showcase at GDC 2023",
        "Generated $15K in revenue within first 6 months"
      ],
      githubUrl: "https://github.com/georgiysimak/cyber-quest-rpg",
      teamSize: "3-person team",
      duration: "8 months"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "AI-powered productivity app with smart prioritization and team collaboration",
      year: "2024",
      category: "Web App",
      technologies: ["React", "Node.js", "OpenAI", "MongoDB"],
      featured: true,
      longDescription: "An intelligent task management application that uses AI to help users prioritize their work, suggest optimal scheduling, and facilitate team collaboration. Features include smart notifications, automated task categorization, and advanced analytics.",
      challenges: [
        "Integrating OpenAI API for intelligent task prioritization",
        "Building real-time collaboration features for team members",
        "Creating an intuitive interface for complex AI suggestions"
      ],
      results: [
        "Increased team productivity by 35% according to user feedback",
        "Reduced time spent on task organization by 60%",
        "Achieved 4.9/5 user satisfaction rating"
      ],
      githubUrl: "https://github.com/georgiysimak/task-management-ai",
      liveUrl: "https://smart-tasks.vercel.app",
      teamSize: "Solo Project",
      duration: "4 months"
    },
    {
      id: 4,
      title: "Portfolio Builder",
      description: "No-code platform for creating professional portfolios with templates",
      year: "2023",
      category: "Web App",
      technologies: ["Next.js", "Tailwind", "Prisma", "Vercel"],
      featured: false,
      longDescription: "A no-code platform that allows users to create stunning professional portfolios without any coding knowledge. Features drag-and-drop interface, customizable templates, and one-click deployment.",
      githubUrl: "https://github.com/georgiysimak/portfolio-builder",
      liveUrl: "https://portfolio-builder.vercel.app",
      teamSize: "Solo Project",
      duration: "2 months"
    },
    {
      id: 5,
      title: "Puzzle Dimension",
      description: "Physics-based puzzle game with 100+ levels and minimalist design",
      year: "2023",
      category: "Game",
      technologies: ["Unity", "C#", "Shader Graph"],
      featured: false,
      longDescription: "A minimalist physics-based puzzle game featuring 100+ challenging levels. Players manipulate gravity and physics to solve increasingly complex puzzles in a beautiful, minimalist world.",
      githubUrl: "https://github.com/georgiysimak/puzzle-dimension",
      teamSize: "Solo Project",
      duration: "3 months"
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      description: "Real-time data visualization platform for business intelligence",
      year: "2024",
      category: "Web App",
      technologies: ["React", "D3.js", "Express", "Redis"],
      featured: false,
      longDescription: "A comprehensive analytics dashboard that provides real-time insights into business metrics. Features interactive charts, custom report generation, and automated alerts for key performance indicators.",
      githubUrl: "https://github.com/georgiysimak/analytics-dashboard",
      liveUrl: "https://analytics-demo.vercel.app",
      teamSize: "2-person team",
      duration: "5 months"
    }
  ];

  const featured = projects.filter(p => p.featured);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 right-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 left-1/4 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Selected Work
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Featured
            </span>
            <br />
            <span className="text-muted-foreground inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Projects
            </span>
          </h2>
        </div>

        <div className="space-y-24">
          {featured.map((project, index) => (
            <div
              key={project.id}
              className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in-up ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
              style={{ animationDelay: `${0.6 + index * 0.3}s` }}
            >
              {/* Project Visual */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-indigo-500/20 rounded-lg border border-border hover:border-foreground/20 transition-all duration-500 hover-scale gradient-border-card spotlight group cursor-pointer relative overflow-hidden">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-purple-300/20" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Center Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                      {project.category === "Game" ? "🎮" : 
                       project.category === "Web App" ? "💻" :
                       project.category === "Mobile App" ? "📱" : "🚀"}
                    </div>
                    <div className="text-lg font-semibold text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors duration-300 px-4 text-center">
                      {project.title}
                    </div>
                  </div>
                  
                  {/* Floating Accents */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-indigo-500 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                  
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: `${0.8 + index * 0.3}s` }}>
                    <span>{project.category}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold animate-fade-in-up" style={{ animationDelay: `${1 + index * 0.3}s` }}>
                    {project.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: `${1.2 + index * 0.3}s` }}>
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: `${1.4 + index * 0.3}s` }}>
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-sm px-3 py-1 border border-border rounded-full animate-fade-in-up"
                      style={{ animationDelay: `${1.6 + index * 0.3 + idx * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: `${1.8 + index * 0.3}s` }}>
                  <Button 
                    variant="outline" 
                    className="group rounded-full px-6 py-2 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 text-foreground hover:text-foreground transition-all duration-300"
                    onClick={() => openModal(project)}
                  >
                    View Project
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="mt-32">
          <h3 className="text-2xl font-bold mb-8 animate-fade-in-up" style={{ animationDelay: '2.4s' }}>All Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group space-y-4 cursor-pointer reveal animate-fade-in-up"
                style={{ animationDelay: `${2.6 + index * 0.1}s` }}
                onClick={() => openModal(project)}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/15 via-purple-600/8 to-indigo-500/15 rounded-lg border border-border group-hover:border-foreground/20 transition-all duration-300 hover-scale spotlight relative overflow-hidden">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="border border-purple-300/20" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl opacity-15 group-hover:opacity-25 transition-opacity duration-300">
                      {project.category === "Game" ? "🎮" : 
                       project.category === "Web App" ? "💻" :
                       project.category === "Mobile App" ? "📱" : "🚀"}
                    </div>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-purple-500 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold group-hover:text-muted-foreground transition-colors">
                      {project.title}
                    </h4>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.category} • {project.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

          {/* Project Modal */}
          <Suspense fallback={null}>
            <ProjectModal 
              project={selectedProject} 
              isOpen={isModalOpen} 
              onClose={closeModal} 
            />
          </Suspense>
        </section>
      );
    });