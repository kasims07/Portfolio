import ScrollyCanvas from "@/components/ScrollyCanvas";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/AnimatedText";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] relative">
      <Header />

      {/* Scroll-Linked Animation Section */}
      <ScrollyCanvas />

      {/* Ambient Orbs Background for subsequent sections */}
      <AmbientBackground />

      {/* Experience Section */}
      <div id="experience">
        <Experience />
      </div>

      <SectionDivider />

      {/* Skills Section */}
      <div id="skills">
        <Skills />
      </div>

      <SectionDivider />

      {/* Works Grid Section */}
      <div id="projects">
        <Projects />
      </div>

      <SectionDivider />

      {/* Contact Section */}
      <Contact />

      {/* Premium Footer */}
      <Footer />
    </main>
  );
}
