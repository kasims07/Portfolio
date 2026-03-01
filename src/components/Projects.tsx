"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Project = {
    title: string;
    category: string;
    description: string;
    link: string;
};

const projects: Project[] = [
    {
        title: "Project Alpha",
        category: "WebGL Experience",
        description: "A highly interactive browser-based 3D environment.",
        link: "#",
    },
    {
        title: "E-Commerce Reimagined",
        category: "Fullstack App",
        description: "Headless Shopify store with dynamic Framer Motion transitions.",
        link: "#",
    },
    {
        title: "Fintech Dashboard",
        category: "Product Design",
        description: "Creating clarity out of complex financial data sets.",
        link: "#",
    },
    {
        title: "Cyber Security Platform",
        category: "SaaS",
        description: "A dark-mode oriented minimal interface for threat monitoring.",
        link: "#",
    },
];

export function Projects() {
    return (
        <section className="relative z-20 bg-[#121212] py-32 px-6 w-full max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-16 md:mb-24 px-4 md:px-8"
            >
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-white mb-6">
                    Selected Works
                </h2>
                <div className="w-24 h-1 bg-white/20 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-4 md:px-8">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                        className="group relative flex flex-col justify-between p-8 md:p-10 h-80 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all hover:bg-white/[0.04] hover:border-white/20 cursor-pointer"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] pointer-events-none" />

                        <div className="relative z-10 flex justify-between items-start">
                            <span className="text-sm font-medium tracking-widest uppercase text-white/40 group-hover:text-white/70 transition-colors">
                                {project.category}
                            </span>
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300">
                                <ArrowUpRight className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                            </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <h3 className="text-3xl md:text-4xl font-medium text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                {project.title}
                            </h3>
                            <p className="text-lg text-white/50 line-clamp-2 pr-8 group-hover:text-white/70 transition-colors">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
