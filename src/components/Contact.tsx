"use client";

import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import { Linkedin, Github, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { AnimatedHeading } from "./AnimatedText";

/* ─── Tiny confetti/particle burst on copy ─── */
function CopyConfetti({ trigger }: { trigger: boolean }) {
    if (!trigger) return null;

    const particles = Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * 360;
        const distance = 50 + Math.random() * 80;
        const x = Math.cos((angle * Math.PI) / 180) * distance;
        const y = Math.sin((angle * Math.PI) / 180) * distance;
        const colors = [
            "#10b981",
            "#06b6d4",
            "#8b5cf6",
            "#ec4899",
            "#f59e0b",
            "#ffffff",
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 3 + Math.random() * 5;

        return (
            <motion.div
                key={i}
                className="absolute rounded-full z-50 pointer-events-none"
                style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    top: "50%",
                    left: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                    x,
                    y,
                    opacity: 0,
                    scale: 0,
                }}
                transition={{
                    duration: 0.6 + Math.random() * 0.4,
                    ease: "easeOut",
                }}
            />
        );
    });

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible flex items-center justify-center">
            {particles}
        </div>
    );
}

/* ─── Local Time Widget ─── */
function LocalTime() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };
            setTime(now.toLocaleTimeString('en-US', options));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Placeholder to prevent layout shift before hydration
    if (!time) return <div className="h-[68px] w-48 mb-8" />;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center py-3 px-8 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-md mb-8 pointer-events-auto"
        >
            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Local Time (India)</span>
            <span className="text-white/80 font-mono text-lg font-medium tracking-wide">{time}</span>
        </motion.div>
    );
}

/* ─── Slide to Copy Email (Mobile OS Style) ─── */
function SlideToCopy({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);
    const [confettiKey, setConfettiKey] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const controls = useAnimation();

    const textOpacity = useTransform(x, [0, 150], [1, 0]);
    const knobColor = useTransform(
        x,
        [0, 200],
        ["rgba(255, 255, 255, 0.1)", "rgba(16, 185, 129, 0.8)"]
    );
    const glowOpacity = useTransform(x, [0, 200], [0, 1]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (!containerRef.current || !knobRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const knobWidth = knobRef.current.clientWidth;
        // The max distance the knob can travel (padding 4px on each side = 8px)
        const maxDrag = containerWidth - knobWidth - 8;
        const threshold = maxDrag * 0.75;

        if (info.offset.x >= threshold) {
            // Success! Snap to end
            controls.start({
                x: maxDrag,
                transition: { type: "spring", stiffness: 400, damping: 25 },
            });
            if (!copied) {
                setCopied(true);
                setConfettiKey((k) => k + 1);
                navigator.clipboard.writeText(email);

                // Reset after delay
                setTimeout(() => {
                    setCopied(false);
                    controls.start({
                        x: 0,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                    });
                }, 3000);
            }
        } else {
            // Snap back to start
            controls.start({
                x: 0,
                transition: { type: "spring", stiffness: 300, damping: 20 },
            });
        }
    };

    return (
        <div className="relative mt-12 overflow-visible pointer-events-auto">
            {/* Confetti anchored to the slider */}
            <CopyConfetti key={confettiKey} trigger={copied} />

            <div
                ref={containerRef}
                className="relative w-80 h-16 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden group"
            >
                {/* Background Fill on drag */}
                <motion.div
                    className="absolute inset-y-0 left-0 bg-emerald-500/20"
                    style={{ width: x }}
                />

                {/* Status Text */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-white/50 text-sm font-medium tracking-wide uppercase group-hover:text-white/70 transition-colors">
                        {copied ? "Copied!" : "Slide to Copy Email"}
                    </span>
                </motion.div>

                {/* Final Copied Text (Fades in) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: copied ? 1 : 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-emerald-400 text-sm font-bold tracking-wide uppercase">
                        Email Copied!
                    </span>
                </motion.div>

                {/* Draggable Knob */}
                <motion.div
                    ref={knobRef}
                    drag="x"
                    dragConstraints={{ left: 0, right: 320 - 56 - 8 }} // w-80 (320px) - knob (56px) - padding (8px)
                    dragElastic={0.05}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    style={{ x, backgroundColor: knobColor }}
                    className="absolute left-1 top-1 bottom-1 w-14 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing border border-white/20 z-10 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {copied ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                        <ArrowRight className="w-5 h-5 text-white/70" />
                    )}
                </motion.div>

                {/* Slider Glow */}
                <motion.div
                    style={{ opacity: glowOpacity }}
                    className="absolute inset-0 rounded-full ring-2 ring-emerald-500/50 pointer-events-none"
                />
            </div>

            {/* Context text below */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: copied ? 1 : 0 }}
                className="absolute -bottom-8 left-0 right-0 text-xs text-emerald-400/60 font-mono tracking-widest text-center"
            >
                {email}
            </motion.p>
        </div>
    );
}

/* ─── Interactive Spotlight Background ─── */
function SpotlightGrid() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="absolute inset-0 overflow-hidden pointer-events-auto"
        >
            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />
            {/* Mouse Spotlight */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
                style={{
                    opacity: isHovering ? 1 : 0,
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16,185,129,0.07), transparent 40%)`,
                }}
            />
        </div>
    );
}

export function Contact() {
    return (
        <section
            id="contact"
            className="relative z-20 w-full min-h-[90vh] flex flex-col items-center justify-center text-center bg-[#050505] overflow-hidden"
        >
            {/* Background Effects */}
            <SpotlightGrid />

            {/* Main Interactive Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center pointer-events-none"
            >
                {/* Local Time Widget */}
                <LocalTime />

                {/* Big heading — letter by letter */}
                <AnimatedHeading
                    text="Let's build something"
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-tight drop-shadow-lg"
                    delay={0.2}
                />
                <AnimatedHeading
                    text="amazing together."
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight drop-shadow-2xl"
                    gradient="from-emerald-400 via-cyan-400 to-purple-400"
                    delay={0.4}
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="text-xl md:text-2xl text-white/40 max-w-2xl mt-8 font-light"
                >
                    Currently open for new roles and freelance projects. Whether you
                    have a question or just want to say hi, I&apos;ll try my best to get
                    back to you!
                </motion.p>

                {/* Mobile-Style Slider */}
                <SlideToCopy email={personalInfo.email} />

                {/* Social Links */}
                <div className="flex items-center space-x-6 mt-24 pointer-events-auto">
                    {[
                        { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
                        { href: socialLinks.github, icon: Github, label: "GitHub" },
                    ].map((social, idx) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: 0.9 + idx * 0.1,
                                type: "spring",
                                stiffness: 200,
                            }}
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all cursor-pointer backdrop-blur-md"
                        >
                            <social.icon className="w-6 h-6" />
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
