"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface AnimatedHeadingProps {
    text: string;
    className?: string;
    tag?: "h1" | "h2" | "h3";
    /** Whether highlight portion uses gradient */
    gradient?: string;
    /** Delay before animation starts */
    delay?: number;
}

export function AnimatedHeading({
    text,
    className = "",
    tag = "h2",
    gradient,
    delay = 0,
}: AnimatedHeadingProps) {
    const ref = useRef<HTMLDivElement>(null);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay,
            },
        },
    };

    const letterVariants = {
        hidden: {
            y: 100,
            opacity: 0,
            rotateX: -90,
        },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                damping: 15,
                stiffness: 150,
            },
        },
    };

    const Tag = tag;

    const chars = text.split("");

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{ perspective: "1000px" }}
        >
            <Tag className={className}>
                {chars.map((char, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        className={`inline-block ${gradient ? `text-transparent bg-clip-text bg-gradient-to-r ${gradient}` : ""}`}
                        style={{
                            transformOrigin: "bottom center",
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </Tag>
        </motion.div>
    );
}

/* ─── Animated section label / badge ─── */
export function AnimatedBadge({
    text,
    delay = 0,
}: {
    text: string;
    delay?: number;
}) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.04] text-emerald-400 text-xs font-medium tracking-widest uppercase mb-8"
        >
            {text}
        </motion.span>
    );
}

/* ─── Animated gradient divider between sections ─── */
export function SectionDivider() {
    return (
        <motion.div
            className="relative w-full h-px my-0 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            {/* Animated glow sweep */}
            <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
                animate={{ x: ["-100%", "400%"] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
    );
}
