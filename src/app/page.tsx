import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Clients } from "@/components/clients";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen text-foreground">
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Clients />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
