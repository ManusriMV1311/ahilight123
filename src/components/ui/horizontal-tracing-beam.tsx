"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useTransform,
    useScroll,
    useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export const HorizontalTracingBeam = ({
    children,
    className,
    sticky = true,
}: {
    children: React.ReactNode;
    className?: string;
    sticky?: boolean;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.8", "end 0.5"], // Starts moving when top hits 80% viewport
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const [svgWidth, setSvgWidth] = useState(0);

    useEffect(() => {
        if (!contentRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setSvgWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(contentRef.current);

        // Initial set
        setSvgWidth(contentRef.current.offsetWidth);

        return () => resizeObserver.disconnect();
    }, []);

    const x1 = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, svgWidth]),
        {
            stiffness: 500,
            damping: 90,
        }
    );
    const x2 = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, svgWidth]),
        {
            stiffness: 500,
            damping: 90,
        }
    );

    return (
        <motion.div
            ref={ref}
            className={cn("relative w-full max-w-5xl mx-auto h-full", className)}
        >
            <div className={cn(
                "w-full h-10 flex items-center bg-transparent pointer-events-none",
                sticky ? "sticky top-28 z-50 mb-8" : "absolute top-4 left-0 z-10"
            )}>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-neutral-800" />
                <motion.div
                    transition={{
                        duration: 0.2,
                        delay: 0.5,
                    }}
                    animate={{
                        boxShadow:
                            scrollYProgress.get() > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                    style={{
                        translateX: x1,
                    }}
                    className="absolute -left-3 top-1 h-8 w-8 rounded-full border border-electric-blue shadow-[0_0_10px_var(--electric-blue)] flex items-center justify-center bg-black z-20"
                >
                    <motion.div
                        transition={{
                            duration: 0.2,
                            delay: 0.5,
                        }}
                        animate={{
                            backgroundColor:
                                scrollYProgress.get() > 0 ? "white" : "var(--electric-blue)",
                            borderColor:
                                scrollYProgress.get() > 0 ? "white" : "var(--electric-blue)",
                        }}
                        className="h-2 w-2 rounded-full bg-electric-blue shadow-[0_0_5px_var(--electric-blue)] hidden" // Hide the dot, just show arrow
                    />
                    {/* Arrow Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            animate={{
                                color: scrollYProgress.get() > 0 ? "var(--electric-blue)" : "white",
                            }}
                        >
                            <ChevronRight className="w-6 h-6" strokeWidth={4} />
                        </motion.div>
                    </div>
                </motion.div>

                <svg
                    viewBox={`0 0 ${svgWidth} 20`}
                    width={svgWidth}
                    height="20"
                    className="absolute top-0 w-full block pointer-events-none"
                    aria-hidden="true"
                >
                    <motion.path
                        d={`M 0 10 H ${svgWidth}`}
                        fill="none"
                        stroke="#9091A0"
                        strokeOpacity="0.16"
                        strokeWidth="1.2"
                        initial={{
                            pathLength: 1
                        }}
                    ></motion.path>
                    <motion.path
                        d={`M 0 10 H ${svgWidth}`}
                        fill="none"
                        stroke="url(#gradient-horizontal)"
                        strokeWidth="3"
                        className="motion-reduce:hidden"
                        transition={{
                            duration: 10,
                        }}
                    ></motion.path>
                    <defs>
                        <motion.linearGradient
                            id="gradient-horizontal"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            x2={x1}
                            y1="0"
                            y2="0"
                        >
                            <stop stopColor="var(--electric-blue)" stopOpacity="0"></stop>
                            <stop stopColor="var(--electric-blue)"></stop>
                            <stop offset="0.325" stopColor="var(--cyan-accent)"></stop>
                            <stop offset="1" stopColor="var(--pure-white)" stopOpacity="0"></stop>
                        </motion.linearGradient>
                    </defs>
                </svg>
            </div>
            <div ref={contentRef} className="pt-4">{children}</div>
        </motion.div>
    );
};
