"use client";

import { useState, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Github, MapPin, Send, Phone } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export const Contact = memo(function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mouse spotlight effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  return (
    <section id="contact" className="py-26 bg-secondary/30 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-20 left-20 w-72 h-72 bg-purple-500/20" />
        <div className="blob absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20" style={{ animationDelay: '2s' }} />
        <div className="blob absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/10" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Ready to Start
            </span>
            <br />
            <span className="accent-gradient inline-block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Your Project?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            I&apos;m always excited to work on new projects and bring creative ideas to life. 
            Let&apos;s discuss how we can work together!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Email Card */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] cursor-pointer animate-fade-in-up overflow-hidden"
              style={{ animationDelay: '0.7s' }}
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 40%)`
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Email Me</h3>
                  <p className="text-base text-gray-400 mb-6 leading-relaxed">
                    Quick response within 24h. Let&apos;s discuss your project and how we can work together.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/[0.12]">
                  <a
                    href="mailto:georgesimak@gmail.com"
                    className="text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2 group/link"
                  >
                    georgesimak@gmail.com
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] cursor-pointer animate-fade-in-up overflow-hidden"
              style={{ animationDelay: '0.8s' }}
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.15), transparent 40%)`
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Phone className="h-6 w-6 text-indigo-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Call Me</h3>
                  <p className="text-base text-gray-400 mb-6 leading-relaxed">
                    Let&apos;s have a conversation about your ideas and explore collaboration opportunities.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/[0.12]">
                  <a
                    href="tel:+33769592221"
                    className="text-lg font-medium text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-2 group/link"
                  >
                    +33 7 69 59 22 21
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] cursor-pointer animate-fade-in-up overflow-hidden"
              style={{ animationDelay: '0.9s' }}
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.15), transparent 40%)`
                  }}
                />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <MapPin className="h-6 w-6 text-violet-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Location</h3>
                  <p className="text-base text-gray-400 mb-6 leading-relaxed">
                    Based in Paris, France. Available for remote work worldwide and local meetings.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/[0.12]">
                  <span className="text-lg font-medium text-violet-400">Paris, France 🇫🇷</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form with Phone Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Phone Image */}
            <div className="hidden lg:flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-full blur-[100px]" />
                <Image
                  src="/avatar/phone.png"
                  alt="Get in touch"
                  width={450}
                  height={450}
                  className="relative object-contain"
                />
              </div>
            </div>

            {/* Enhanced Form */}
            <div 
              className="group relative bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] rounded-3xl p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] animate-fade-in-up overflow-hidden" 
              style={{ animationDelay: '1.1s' }}
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.12), transparent 40%)`
                  }}
                />
              </div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-3 text-white animate-fade-in-up" style={{ animationDelay: '1.3s' }}>Send Me a Message</h3>
                  <p className="text-gray-400 text-lg animate-fade-in-up" style={{ animationDelay: '1.5s' }}>I&apos;ll get back to you within 24 hours</p>
                </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-semibold text-white">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="h-12 rounded-xl border-white/[0.12] bg-black/[0.25] text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-white">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="h-12 rounded-xl border-white/[0.12] bg-black/[0.25] text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-sm font-semibold text-white">Project Details *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and any specific requirements..."
                    className="min-h-[160px] resize-none rounded-xl border-white/[0.12] bg-black/[0.25] text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-14 group rounded-xl text-base font-semibold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-700 hover:via-purple-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-muted-foreground/70">
                    By sending this message, you agree to our privacy policy
                  </p>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center pt-24">
          <h3 className="text-3xl font-bold mb-3">Connect With Me</h3>
          <p className="text-muted-foreground mb-8 text-lg">Let&apos;s build something amazing together</p>
          <div className="flex justify-center items-center gap-4">
            <a
              href="https://github.com/georgiysimak"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-2xl bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,255,255,0.08)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 40%)`
                  }}
                />
              </div>
              <Github className="h-7 w-7 text-gray-300 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/georgiysimak"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-2xl bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)`
                  }}
                />
              </div>
              <Linkedin className="h-7 w-7 text-blue-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:georgesimak@gmail.com"
              className="group relative p-6 rounded-2xl bg-[#13111C]/60 backdrop-blur-xl border border-white/[0.15] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(168,85,247,0.15)] overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              {/* Spotlight effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 40%)`
                  }}
                />
              </div>
              <Mail className="h-7 w-7 text-purple-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-10 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground/80">
            <p className="font-medium">© 2024 George Simak. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Designed & Built with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});