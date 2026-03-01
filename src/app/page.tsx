import ScrollyCanvas from "@/components/ScrollyCanvas";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      {/* Scroll-Linked Animation Section */}
      <ScrollyCanvas />

      {/* Works Grid Section */}
      <Projects />

      {/* Brief Footer */}
      <footer className="py-12 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center text-white/40">
          <p>© {new Date().getFullYear()} Kasim. All rights reserved.</p>
          <p className="mt-4 md:mt-0 uppercase tracking-widest text-sm font-medium">Built with Next.js & Framer Motion</p>
        </div>
      </footer>
    </main>
  );
}
