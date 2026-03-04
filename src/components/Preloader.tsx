"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        // Prevent body scroll while loading
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        const bootSequence = [
            "Initializing Kasim OS v2.0...",
            "Loading Flutter Framework...",
            "Mounting Dart Virtual Machine...",
            "Connecting to Firebase Analytics...",
            "Injecting Framer Motion Physics...",
            "System Boot Complete."
        ];

        let lineIndex = 0;
        const lineInterval = setInterval(() => {
            if (lineIndex < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[lineIndex]]);
                lineIndex++;
            }
        }, 300);

        const duration = 2500; // 2.5 seconds total loading
        const intervalTime = 30;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const progressInterval = setInterval(() => {
            currentStep++;
            const newProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(progressInterval);
                clearInterval(lineInterval);
                setTimeout(() => setIsLoading(false), 500); // Small pause at 100%
            }
        }, intervalTime);

        return () => {
            clearInterval(progressInterval);
            clearInterval(lineInterval);
            document.body.style.overflow = 'unset';
        };
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0a0a] text-emerald-400 font-mono tracking-widest overflow-hidden"
                    exit={{
                        y: "-100%",
                        opacity: 0,
                    }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

                    <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col h-64 justify-end pb-8">
                        {/* Terminal Lines */}
                        <div className="flex flex-col space-y-2 mb-8 items-start text-xs md:text-sm text-white/50">
                            {lines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center space-x-2"
                                >
                                    <span className="text-emerald-500">{">"}</span>
                                    <span>{line}</span>
                                </motion.div>
                            ))}
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-emerald-400 ml-3"
                            />
                        </div>

                        {/* Progress Bar & Percentage */}
                        <div className="flex items-end justify-between w-full mb-2">
                            <span className="text-sm font-semibold tracking-[0.2em] text-white">LOADING</span>
                            <span className="text-5xl md:text-7xl font-bold font-sans text-white">{progress}%</span>
                        </div>

                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-emerald-400"
                                style={{ width: `${progress}%` }}
                                layout
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
