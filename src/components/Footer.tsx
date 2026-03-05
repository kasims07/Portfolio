"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";

const marqueeItems = [
    personalInfo.displayName,
    "•",
    personalInfo.role,
    "•",
    "Open to Work",
    "•",
    "Flutter",
    "•",
    "Dart",
    "•",
    "Firebase",
    "•",
    "Cross-Platform",
    "•",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
    return (
        <div className="flex overflow-hidden whitespace-nowrap">
            <motion.div
                className="flex shrink-0"
                animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {/* Duplicate for seamless loop */}
                {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                    <span
                        key={idx}
                        className={`text-6xl md:text-8xl font-bold tracking-tighter px-4 md:px-6 ${item === "•"
                                ? "text-emerald-400/30"
                                : "text-white/[0.03] hover:text-white/10 transition-colors duration-500"
                            }`}
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-[#0a0a0a] overflow-hidden">
            {/* Marquee Ticker */}
            <div className="py-12 border-t border-white/[0.04]">
                <MarqueeRow />
            </div>

            {/* Main Footer Content */}
            <div className="border-t border-white/[0.04] py-12">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Left — Info */}
                        <div className="flex flex-col items-center md:items-start space-y-3">
                            <h3 className="text-2xl font-bold text-white tracking-tight">
                                {personalInfo.displayName}
                            </h3>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="text-white/40 hover:text-emerald-400 transition-colors duration-300 text-sm"
                            >
                                {personalInfo.email}
                            </a>
                            <a
                                href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                                className="text-white/40 hover:text-emerald-400 transition-colors duration-300 text-sm"
                            >
                                {personalInfo.phone}
                            </a>
                        </div>

                        {/* Center — Back to top */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex flex-col items-center gap-2 cursor-pointer"
                        >
                            <div className="p-4 rounded-full border border-white/10 group-hover:border-emerald-400/30 group-hover:bg-emerald-400/5 transition-all duration-300">
                                <ArrowUp className="w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors" />
                            </div>
                            <span className="text-xs text-white/30 uppercase tracking-widest group-hover:text-emerald-400/60 transition-colors">
                                Back to top
                            </span>
                        </motion.button>

                        {/* Right — Credits */}
                        <div className="flex flex-col items-center md:items-end space-y-2 text-white/30 text-sm">
                            <p>
                                © {new Date().getFullYear()}{" "}
                                {personalInfo.shortName}. All rights reserved.
                            </p>
                            <p className="uppercase tracking-[0.2em] text-[10px] font-medium text-white/20">
                                Built with Next.js & Framer Motion
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
