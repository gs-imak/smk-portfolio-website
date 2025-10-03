import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Clients } from "@/components/clients";
import { Skills } from "@/components/skills";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="relative">
        <Hero />
        <About />
        <Clients />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
