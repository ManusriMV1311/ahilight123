"use client";

import { useEffect, useRef } from "react";

export const CodeMatrixBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Matrix characters (Katala, binary, and alphanumeric mixed)
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&<>[]{}|=+*/XYZ";
        const charArray = chars.split("");

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Array of drops - one per column
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start at random negative heights
        }

        // Brand colors
        const colors = [
            "#00f2ff", // Cyan
            "#a855f7", // Purple
            "#3b82f6", // Blue
            "#ffffff"  // White head
        ];

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(10, 10, 26, 0.1)"; // Dark Navy tint
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Color logic: Head of the drop is white/bright, tail fades
                const isHead = Math.random() > 0.95;
                if (isHead) {
                    ctx.fillStyle = "#ffffff";
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = "#ffffff";
                } else {
                    // Random brand color
                    ctx.fillStyle = colors[Math.floor(Math.random() * (colors.length - 1))];
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop or move it down
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            requestAnimationFrame(draw);
        };

        const animationId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", setCanvasSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
        />
    );
};
