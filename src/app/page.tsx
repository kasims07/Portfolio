import ScrollyCanvas from "@/components/ScrollyCanvas";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { personalInfo } from "@/data/portfolio";

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

      {/* Skills Marquee Section */}
      <div id="skills">
        <Skills />
      </div>

      {/* Works Grid Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Contact Section */}
      <Contact />

      {/* Brief Footer */}
      <footer className="py-16 border-t border-white/10 mt-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center text-white/50">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 space-y-2">
            <h3 className="text-xl font-medium text-white/80">{personalInfo.displayName}</h3>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-emerald-400 transition-colors">{personalInfo.email}</a>
            <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="hover:text-emerald-400 transition-colors">{personalInfo.phone}</a>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="mb-2">© {new Date().getFullYear()} {personalInfo.shortName}. All rights reserved.</p>
            <p className="uppercase tracking-widest text-xs font-medium text-white/30">Built with Next.js & Framer Motion</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

