"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
    value: string;
    className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState("0");

    // Extract numeric part and suffix (e.g., "3+" -> num=3, suffix="+")
    const numericMatch = value.match(/^(\d+)(.*)$/);
    const targetNum = numericMatch ? parseInt(numericMatch[1]) : 0;
    const suffix = numericMatch ? numericMatch[2] : value;
    const isNumeric = !!numericMatch;

    useEffect(() => {
        if (!isInView || !isNumeric) return;

        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * targetNum);

            setDisplayValue(`${current}${suffix}`);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, isNumeric, targetNum, suffix]);

    if (!isNumeric) {
        return (
            <motion.span
                ref={ref}
                className={className}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                {value}
            </motion.span>
        );
    }

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {displayValue}
        </motion.span>
    );
}
