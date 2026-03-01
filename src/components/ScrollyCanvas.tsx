"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Overlay } from "./Overlay";

const FRAME_COUNT = 45; // 0 to 44
const getFramePath = (index: number) =>
    `/sequence/frame_${index.toString().padStart(2, "0")}_delay-0.066s.png`;

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    // Initial draw wrapper safely
                    renderFrame(0, loadedImages);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const renderFrame = (index: number, imgArray: HTMLImageElement[] = images) => {
        if (!canvasRef.current || imgArray.length === 0 || !imgArray[index]) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // object-fit: cover logic
        const img = imgArray[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        } else {
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Add a slight dark overlay to the canvas images
        ctx.filter = "brightness(0.7) contrast(1.1)";
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.filter = "none";
    };

    // Sync canvas size on mount & resize
    useEffect(() => {
        const updateCanvasSize = () => {
            if (canvasRef.current) {
                // Use device pixel ratio for sharper images on retina screens
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // We purposefully do NOT scale the context by dpr here, 
                // because drawWidth/drawHeight are already calculated using the physical canvas.width/height.
                // Doing ctx.scale(dpr, dpr) would zoom the image twice!

                // Ensure we draw using logical coordinates
                canvasRef.current.style.width = `${window.innerWidth}px`;
                canvasRef.current.style.height = `${window.innerHeight}px`;

                // redraw current frame
                const currentIndex = Math.min(
                    FRAME_COUNT - 1,
                    Math.floor(scrollYProgress.get() * FRAME_COUNT)
                );
                renderFrame(currentIndex);
            }
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);
        return () => window.removeEventListener("resize", updateCanvasSize);
    }, [images, scrollYProgress]);

    // Scrub through images
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (images.length === 0) return;
        const frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
        renderFrame(frameIndex);
    });

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                />
                <Overlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
