"use client";

import { useState, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Github, MapPin, Send, } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Contact = memo(function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 group hover:border-purple-500/50 transition-all duration-300 hover-scale animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <Mail className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Email Me</h3>
                  <p className="text-muted-foreground">Quick response guaranteed</p>
                </div>
              </div>
              <a
                href="mailto:georgiy@example.com"
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium text-lg"
              >
                georgiy@example.com
              </a>
            </Card>

            <Card className="p-8 group hover:border-green-500/50 transition-all duration-300 hover-scale animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <MapPin className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Location</h3>
                  <p className="text-muted-foreground">Open to remote work</p>
                </div>
              </div>
              <span className="text-green-400 font-medium text-lg">San Francisco, CA</span>
            </Card>
          </div>

          {/* Right - Enhanced Form */}
          <Card className="p-8 bg-background border border-border hover:border-purple-500/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>Send Me a Message</h3>
              <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: '1.5s' }}>I&apos;ll get back to you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Project Details *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                  className="min-h-[150px] w-full resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 group magnetic glow-on-hover rounded-full px-8 py-3 bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center pt-4">
                <p className="text-xs text-muted-foreground">
                  By sending this message, you agree to our privacy policy
                </p>
              </div>
            </form>
          </Card>
        </div>

            {/* Social Links */}
            <div className="text-center pt-16">
            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
            <div className="flex justify-center items-center gap-6">
              <a
                href="https://github.com/georgiysimak"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors group"
              >
                <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/georgiysimak"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors group"
              >
                <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:georgiy@example.com"
                className="p-4 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors group"
              >
                <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Georgiy Simak. All rights reserved.</p>
            <p>Designed & Built with passion</p>
          </div>
        </div>
      </div>
    </section>
  );
});