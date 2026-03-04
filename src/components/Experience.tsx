"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/portfolio";

// Scrub-Linked Word Reveal
function Word({ word, progress, range }: { word: string, progress: MotionValue<number>, range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span style={{ opacity }} className="text-white">
            {word}
        </motion.span>
    );
}

function AnimatedText({ text }: { text: string }) {
    const containerRef = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "end 50%"],
    });

    const words = text.split(" ");

    return (
        <p ref={containerRef} className="text-white/50 flex flex-wrap gap-x-[0.25em] leading-relaxed text-lg md:text-xl font-light mt-6">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
            })}
        </p>
    );
}

// Individual Experience Card with scroll-linked entrance
function ExperienceCard({ exp, index }: { exp: typeof experiences[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"],
    });

    const isEven = index % 2 === 0;
    const xStart = isEven ? -120 : 120;

    const x = useTransform(scrollYProgress, [0, 1], [xStart, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ x, opacity, scale }}
            className="relative w-full max-w-5xl mx-auto mb-12"
        >
            {/* The giant number watermark */}
            <div className={`absolute top-0 ${isEven ? '-left-8 md:-left-16' : '-right-8 md:-right-16'} text-[10rem] md:text-[14rem] font-black text-white/[0.02] leading-none select-none pointer-events-none z-0`}>
                {exp.number}
            </div>

            <div className="relative z-10 p-8 md:p-14 rounded-[2rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] backdrop-blur-2xl group hover:border-white/15 transition-all duration-500">

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-500/[0.03] to-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top row — period badge + company */}
                <div className="relative flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400 text-sm font-medium tracking-wider uppercase w-fit">
                        {exp.period}
                    </span>
                    <span className="text-white/30 text-lg hidden md:inline">—</span>
                    <h4 className="text-xl text-white/50 font-light">{exp.company}</h4>
                </div>

                {/* Role */}
                <h3 className="relative text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                    {exp.role}
                </h3>

                {/* Animated description */}
                <div className="relative max-w-3xl">
                    <AnimatedText text={exp.description} />
                </div>

                {/* Bottom accent line */}
                <motion.div
                    className="mt-8 h-[1px] bg-gradient-to-r from-emerald-400/30 via-white/10 to-transparent rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    style={{ transformOrigin: "left" }}
                />
            </div>
        </motion.div>
    );
}

export function Experience() {
    return (
        <section className="relative z-20 py-32 md:py-48 w-full bg-[#0a0a0a] overflow-hidden">

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-24 md:mb-32 px-6 md:px-12 lg:px-24 text-center"
            >
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
                    Career Journey
                </h2>
                <div className="w-24 h-1 bg-emerald-400/40 rounded-full mx-auto" />
            </motion.div>

            {/* Timeline */}
            <div className="px-6 md:px-12 lg:px-24">
                {experiences.map((exp, idx) => (
                    <ExperienceCard key={idx} exp={exp} index={idx} />
                ))}
            </div>
        </section>
    );
}
