"use client";

import { MatrixRainBackground } from "@/components/backgrounds/MatrixRainBackground";
import { Section } from "@/components/ui/section";
import { Cpu, Network, Lock, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { useState } from "react";

export default function TechnologyPage() {
    return (
        <div className="flex flex-col gap-0 relative">
            <MatrixRainBackground />

            {/* Hero Section */}
            <Section background="transparent" className="pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterEffect
                            words={[
                                { text: "Powered", className: "text-white font-heading" },
                                { text: "by", className: "text-white font-heading" },
                                { text: "Advanced", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent pb-2 font-heading" },
                                { text: "Research", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent pb-2 font-heading" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight inline-block py-4 leading-tight font-heading"
                            cursorClassName="bg-electric-blue"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-slate-300"
                    >
                        Our software is built upon proprietary algorithms in distributed computing and artificial intelligence.
                    </motion.p>
                </div>
            </Section>

            {/* Tech Stack Grid - Terminal Style */}
            <Section className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {[
                        {
                            title: "Distributed Ledger",
                            desc: "Trustless synchronization across fragmented networks using advanced consensus.",
                            icon: Network,
                            command: "init --consensus"
                        },
                        {
                            title: "Neural Threat Detection",
                            desc: "AI models processing millions of signals per second to identify anomalies.",
                            icon: Cpu,
                            command: "scan --neural"
                        },
                        {
                            title: "Zero-Knowledge",
                            desc: "Privacy by design. Computations on encrypted data without raw exposure.",
                            icon: Lock,
                            command: "encrypt --zk"
                        },
                        {
                            title: "Polyglot Microservices",
                            desc: "Resilient mesh of Rust, Go, and TypeScript services.",
                            icon: Code2,
                            command: "build --polyglot"
                        }
                    ].map((tech, i) => (
                        <TerminalCard key={i} tech={tech} index={i} />
                    ))}
                </div>
            </Section>
        </div>
    );
}

function TerminalCard({ tech, index }: { tech: any; index: number }) {
    const [isCompiling, setIsCompiling] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleHover = () => {
        setIsCompiling(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsCompiling(false), 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 30);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onHoverStart={handleHover}
            className="group"
        >
            {/* Terminal Window */}
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 overflow-hidden shadow-[0_0_30px_rgba(0,242,255,0.2)] hover:shadow-[0_0_50px_rgba(0,242,255,0.4)] transition-all duration-300">
                {/* Terminal Header */}
                <div className="bg-gray-800/90 px-4 py-2 flex items-center gap-2 border-b border-cyan-500/20">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-cyan-400 font-mono ml-2">ahilight://{tech.command}</span>
                </div>

                {/* Terminal Content */}
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
                            <tech.icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white font-mono">{tech.title}</h3>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-sm mb-4 font-mono">
                        <span className="text-cyan-400">$</span> {tech.desc}
                    </p>

                    {/* Compile Progress Bar */}
                    {isCompiling && (
                        <div className="mt-4">
                            <div className="flex items-center justify-between text-xs text-cyan-400 mb-1 font-mono">
                                <span>Compiling...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-electric-blue"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,242,255,0.1)_50%)] bg-[length:100%_4px]"></div>
                </div>
            </div>
        </motion.div>
    );
}
