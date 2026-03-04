"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, MouseEvent, useCallback } from "react";
import { skills, stats } from "@/data/portfolio";

function SkillCard({ skill, index }: { skill: typeof skills[0], index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative"
        >
            <div className="relative p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-emerald-400/20 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <motion.div
                        className="absolute top-0 right-0 w-[1px] bg-gradient-to-b from-emerald-400/60 to-transparent"
                        animate={{ height: isHovered ? 40 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="absolute top-0 right-0 h-[1px] bg-gradient-to-l from-emerald-400/60 to-transparent"
                        animate={{ width: isHovered ? 40 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Bottom-left accent */}
                <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                    <motion.div
                        className="absolute bottom-0 left-0 w-[1px] bg-gradient-to-t from-emerald-400/60 to-transparent"
                        animate={{ height: isHovered ? 40 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-emerald-400/60 to-transparent"
                        animate={{ width: isHovered ? 40 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Skill icon */}
                <div className="text-2xl mb-4 text-white/20 group-hover:text-emerald-400/60 transition-colors duration-300">
                    {skill.icon}
                </div>

                {/* Skill Name */}
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 group-hover:text-emerald-50 transition-colors duration-300">
                    {skill.name}
                </h3>

                {/* Level text */}
                <span className="text-xs text-white/30 font-mono group-hover:text-emerald-400/70 transition-colors duration-300">
                    {skill.level}%
                </span>

                {/* Animated progress bar */}
                <div className="mt-4 w-full h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500/70 to-emerald-400/40"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: index * 0.06 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* Hover glow background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
        </motion.div>
    );
}

export function Skills() {
    const gridRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for the spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const spotlightX = useSpring(mouseX, { stiffness: 200, damping: 40 });
    const spotlightY = useSpring(mouseY, { stiffness: 200, damping: 40 });

    const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }, [mouseX, mouseY]);

    return (
        <section className="relative z-20 py-32 md:py-48 w-full bg-[#0a0a0a] overflow-hidden border-y border-white/5">

            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-20 md:mb-28 text-center px-6"
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-400 text-xs font-medium tracking-widest uppercase mb-8"
                >
                    Skills & Expertise
                </motion.span>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
                    Technical Arsenal
                </h2>
                <div className="w-24 h-1 bg-emerald-400/40 rounded-full mx-auto" />
                <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">
                    Mastering the tools that transform ideas into exceptional mobile experiences
                </p>
            </motion.div>

            {/* Skills Grid with Mouse Spotlight */}
            <div
                ref={gridRef}
                onMouseMove={handleMouseMove}
                className="relative max-w-6xl mx-auto px-6 md:px-12"
            >
                {/* Mouse-following spotlight */}
                <motion.div
                    className="pointer-events-none absolute w-[500px] h-[500px] rounded-full z-0"
                    style={{
                        x: spotlightX,
                        y: spotlightY,
                        translateX: "-50%",
                        translateY: "-50%",
                        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
                    }}
                />

                {/* Grid */}
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {skills.map((skill, idx) => (
                        <SkillCard key={skill.name} skill={skill} index={idx} />
                    ))}
                </div>
            </div>

            {/* Bottom stats bar */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-20 md:mt-28 max-w-4xl mx-auto px-6 md:px-12"
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 px-8 md:px-12 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
                    {stats.map((stat, idx) => (
                        <div key={stat.label} className="contents">
                            <div className="text-center">
                                <motion.span
                                    className="block text-4xl md:text-5xl font-bold text-white"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    {stat.value}
                                </motion.span>
                                <span className="text-white/30 text-sm mt-1 block">{stat.label}</span>
                            </div>
                            {idx < stats.length - 1 && (
                                <div className="w-px h-12 bg-white/10 hidden md:block" />
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
