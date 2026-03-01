"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

export function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Section 1: 0% scroll (fades out early)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

    // Section 2: ~30% scroll
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [100, 0, -100]);

    // Section 3: ~60% scroll
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [100, 0, -100]);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Container for Sections */}
            <div className="relative h-full w-full max-w-7xl mx-auto px-6">
                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
                        Kasim.
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-white/80 drop-shadow-md">
                        Creative Developer.
                    </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute inset-y-0 left-6 md:left-24 flex flex-col justify-center"
                >
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-lg drop-shadow-lg">
                        I build digital experiences.
                    </h2>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute inset-y-0 right-6 md:right-24 flex flex-col justify-center items-end text-right"
                >
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-lg drop-shadow-lg">
                        Bridging design and engineering.
                    </h2>
                </motion.div>
            </div>
        </div>
    );
}
