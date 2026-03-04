"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { navItems, personalInfo } from "@/data/portfolio";

export function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeNav, setActiveNav] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        setScrolled(latest > 50);
    });

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setMobileOpen(false);
    };

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
                    ? "py-3"
                    : "py-5"
                    }`}
            >
                {/* Glassmorphic background container */}
                <div className={`absolute inset-0 transition-all duration-500 ${scrolled
                    ? "bg-[#0a0a0a]/60 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    : "bg-transparent"
                    }`} />

                <div className="relative z-10 flex items-center justify-between px-6 md:px-12 lg:px-16 max-w-[1800px] mx-auto">

                    {/* Logo */}
                    <motion.div
                        className="flex items-center cursor-pointer group"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="relative">
                            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-emerald-400 transition-colors duration-300">
                                {personalInfo.logoInitials}
                            </span>
                            <motion.div
                                className="absolute -bottom-0.5 left-0 h-[2px] bg-emerald-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            />
                        </div>
                        <span className="text-white/20 text-2xl font-thin ml-0.5">.</span>
                    </motion.div>

                    {/* Desktop Navigation — Numbered */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                onMouseEnter={() => setActiveNav(item.id)}
                                onMouseLeave={() => setActiveNav(null)}
                                className="relative px-5 py-2 rounded-full text-sm font-medium tracking-wide text-white/50 hover:text-white transition-all duration-300 cursor-pointer group"
                            >
                                {/* Hover background pill */}
                                <AnimatePresence>
                                    {activeNav === item.id && (
                                        <motion.div
                                            layoutId="navHover"
                                            className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.08]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </AnimatePresence>
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-emerald-400/60 group-hover:text-emerald-400 transition-colors">{item.number}</span>
                                    <span>{item.label}</span>
                                </span>
                            </button>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Resume button */}
                        <a
                            href="/resume.pdf"
                            download="Mohmadkasam_Khira_Resume.pdf"
                            className="relative group px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium text-white/70 overflow-hidden transition-all duration-300 hover:border-emerald-400/30 hover:text-white cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-400/5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                <span>Resume</span>
                            </span>
                        </a>

                        {/* CTA button */}
                        <motion.button
                            onClick={() => scrollTo("contact")}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow duration-300 cursor-pointer"
                        >
                            Get in touch
                        </motion.button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                    >
                        <motion.span
                            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                            className="w-6 h-[1.5px] bg-white rounded-full"
                        />
                        <motion.span
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-6 h-[1.5px] bg-white rounded-full"
                        />
                        <motion.span
                            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                            className="w-6 h-[1.5px] bg-white rounded-full"
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navItems.map((item, idx) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => scrollTo(item.id)}
                                    className="flex items-center gap-4 text-3xl font-light text-white/70 hover:text-white transition-colors cursor-pointer"
                                >
                                    <span className="text-sm font-mono text-emerald-400/60">{item.number}</span>
                                    {item.label}
                                </motion.button>
                            ))}
                            <motion.a
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                href="/resume.pdf"
                                download="Mohmadkasam_Khira_Resume.pdf"
                                className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            >
                                Download Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
