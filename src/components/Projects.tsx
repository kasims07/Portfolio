"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MouseEvent, useRef } from "react";
import { projects } from "@/data/portfolio";

type Project = typeof projects[0];

function ProjectCard({ project, index }: { project: Project, index: number }) {
    const cardRef = useRef<HTMLAnchorElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 mb-20 md:mb-32`}
        >
            {/* Number + Info Side */}
            <div className="w-full md:w-2/5 flex flex-col">
                {/* Big number */}
                <span className="text-[7rem] md:text-[10rem] font-black leading-none text-white/[0.03] select-none -mb-12 md:-mb-16">
                    {project.number}
                </span>
                <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400 text-xs font-medium tracking-wider uppercase mb-4">
                        {project.category}
                    </span>
                    <p className="text-white/50 text-lg leading-relaxed mb-6 font-light">
                        {project.description}
                    </p>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <span key={t} className="px-3 py-1 text-xs rounded-full border border-white/10 text-white/40 bg-white/[0.02]">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Card Side */}
            <motion.a
                ref={cardRef}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative w-full md:w-3/5 h-72 md:h-96 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.04] via-white/[0.01] to-transparent backdrop-blur-2xl cursor-pointer overflow-hidden perspective-1000 transition-all duration-500 hover:border-white/15 hover:shadow-[0_30px_80px_-20px_rgba(16,185,129,0.1)]"
            >
                {/* Animated gradient backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Top row */}
                <div className="relative z-10 flex justify-between items-start p-8 md:p-10" style={{ transform: "translateZ(30px)" }}>
                    <span className="text-sm font-medium tracking-widest uppercase text-white/30 group-hover:text-emerald-400 transition-colors duration-300">
                        {project.category}
                    </span>
                    <div className="p-3 bg-white/5 rounded-full group-hover:bg-emerald-500/20 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-emerald-400 transition-colors" />
                    </div>
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10" style={{ transform: "translateZ(40px)" }}>
                    <h3 className="text-4xl md:text-5xl font-bold text-white group-hover:translate-x-3 transition-transform duration-500 tracking-tight">
                        {project.title}
                    </h3>
                    {/* Animated underline */}
                    <motion.div
                        className="h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mt-4"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ transformOrigin: "left" }}
                    />
                </div>

                {/* Noise grain texture */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </motion.a>
        </motion.div>
    );
}

export function Projects() {
    return (
        <section className="relative z-20 py-32 md:py-48 bg-[#121212] overflow-hidden">

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-24 md:mb-32 px-6 md:px-12 lg:px-24 text-center"
            >
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
                    Selected Works
                </h2>
                <div className="w-24 h-1 bg-emerald-400/40 rounded-full mx-auto" />
                <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">Crafting digital experiences for millions of users across the globe</p>
            </motion.div>

            {/* Project List */}
            <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} index={idx} />
                ))}
            </div>
        </section>
    );
}
