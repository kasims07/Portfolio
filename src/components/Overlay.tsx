"use client";

import { useTransform, motion, MotionValue } from "framer-motion";
import { InteractiveWeb } from "./InteractiveWeb";

export function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Section 1: 0% scroll (fades out early)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
    const scale1 = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

    // Section 2: ~30% scroll
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [100, 0, -100]);

    // Section 3: ~60% scroll
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [100, 0, -100]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Interactive Neural Web Background */}
            <div className="pointer-events-auto">
                <InteractiveWeb />
            </div>

            {/* Container for Sections */}
            <div className="relative h-full w-full max-w-7xl mx-auto px-6">
                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1, scale: scale1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        <span className="text-sm font-medium tracking-wide text-white/80 uppercase">
                            Available For Work ✨
                        </span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl font-inter leading-none">
                        MOHMADKASAM
                    </h1>
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/30 drop-shadow-2xl font-inter leading-none -mt-4">
                        KHIRA.
                    </h1>
                    <p className="mt-8 text-2xl md:text-3xl font-light tracking-wide text-white/70 drop-shadow-md">
                        Sr. Flutter Developer <span className="text-white/40 mx-2">|</span> 3+ Years Experience
                    </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute inset-y-0 left-6 md:left-24 flex flex-col justify-center"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-2xl drop-shadow-xl leading-tight">
                        Building scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">cross-platform</span> apps.
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mt-8 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute inset-y-0 right-6 md:right-24 flex flex-col justify-center items-end text-right"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-2xl drop-shadow-xl leading-tight">
                        Bridging Mobile Design and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Engineering.</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mt-8 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)] float-right" />
                </motion.div>
            </div>
        </div>
    );
}
