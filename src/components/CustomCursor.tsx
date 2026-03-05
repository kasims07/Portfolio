"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "hover" | "text" | "hidden";

export default function CustomCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const [variant, setVariant] = useState<CursorVariant>("default");
    const [cursorText, setCursorText] = useState("");
    const [isPressed, setIsPressed] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Main dot — fast follow
    const dotSpring = { damping: 28, stiffness: 400, mass: 0.3 };
    const dotX = useSpring(mouseX, dotSpring);
    const dotY = useSpring(mouseY, dotSpring);

    // Outer ring — slower, trailing feel
    const ringSpring = { damping: 20, stiffness: 150, mass: 0.8 };
    const ringX = useSpring(mouseX, ringSpring);
    const ringY = useSpring(mouseY, ringSpring);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        },
        [mouseX, mouseY]
    );

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;

        // Check for custom data attributes first
        const cursorEl =
            target.closest("[data-cursor]") as HTMLElement | null;

        if (cursorEl) {
            const type = cursorEl.getAttribute("data-cursor") as CursorVariant;
            const text = cursorEl.getAttribute("data-cursor-text") || "";
            setVariant(type || "hover");
            setCursorText(text);
            return;
        }

        // Auto-detect interactive elements
        if (
            target.tagName.toLowerCase() === "a" ||
            target.tagName.toLowerCase() === "button" ||
            target.closest("a") ||
            target.closest("button") ||
            target.closest(".cursor-pointer") ||
            target.classList.contains("cursor-pointer")
        ) {
            setVariant("hover");
            setCursorText("");
        } else {
            setVariant("default");
            setCursorText("");
        }
    }, []);

    useEffect(() => {
        setIsMounted(true);

        const handleDown = () => setIsPressed(true);
        const handleUp = () => setIsPressed(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [handleMouseMove, handleMouseOver]);

    if (!isMounted) return null;

    // Check if on touch device
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)
        return null;

    const dotSize = variant === "hover" ? 0 : isPressed ? 6 : 8;
    const ringSize = variant === "hover" ? 80 : variant === "text" ? 120 : isPressed ? 30 : 40;

    return (
        <>
            {/* Center Dot */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: "#ffffff",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            {/* Outer Ring with morphing */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: ringSize,
                    height: ringSize,
                    borderWidth: variant === "hover" ? 2 : 1,
                    borderColor:
                        variant === "hover"
                            ? "rgba(16, 185, 129, 0.6)"
                            : "rgba(255, 255, 255, 0.4)",
                    backgroundColor:
                        variant === "hover"
                            ? "rgba(16, 185, 129, 0.08)"
                            : "rgba(255, 255, 255, 0)",
                    scale: isPressed ? 0.85 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                    mass: 0.5,
                }}
            >
                {/* Cursor text label */}
                <AnimatePresence>
                    {cursorText && variant === "text" && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-xs font-semibold text-white uppercase tracking-widest whitespace-nowrap"
                        >
                            {cursorText}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Glow halo for hover state */}
            <AnimatePresence>
                {variant === "hover" && (
                    <motion.div
                        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
                        style={{
                            x: ringX,
                            y: ringY,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        initial={{ width: 40, height: 40, opacity: 0 }}
                        animate={{
                            width: 100,
                            height: 100,
                            opacity: 1,
                        }}
                        exit={{ width: 40, height: 40, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                        }}
                    >
                        <div className="w-full h-full rounded-full bg-emerald-400/10 blur-xl" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
