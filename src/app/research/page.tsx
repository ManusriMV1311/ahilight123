"use client";

import { NeuralNetworkBackground } from "@/components/backgrounds/NeuralNetworkBackground";
import { Section } from "@/components/ui/section";
import { FileText, Microscope, FlaskConical, Atom, Download } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";
import { Button } from "@/components/ui/button";

// Helper component for Lock icon to fix import error
function LockKeyhole(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="16" r="1" />
            <rect x="3" y="10" width="18" height="12" rx="2" />
            <path d="M7 10V7a5 5 0 0 1 10 0v3" />
        </svg>
    )
}

export default function ResearchPage() {
    return (
        <div className="flex flex-col gap-0 min-h-screen relative overflow-hidden">
            <NeuralNetworkBackground />

            {/* Hero Section */}
            <Section background="transparent" className="pt-32 pb-16 md:pt-40 md:pb-24 relative z-10">
                <div className="text-center max-w-5xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <TypewriterEffect
                            words={[
                                { text: "Pioneering", className: "text-white font-heading" },
                                { text: "the", className: "text-white font-heading" },
                                { text: "Future", className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pb-2 font-heading" },
                                { text: "of", className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pb-2 font-heading" },
                                { text: "Compute", className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pb-2 font-heading" },
                            ]}
                            className="text-5xl md:text-7xl font-bold tracking-tight inline-block py-4 leading-tight font-heading"
                            cursorClassName="bg-purple-500"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        We don't just use algorithms; we invent them. Our research lab pushes the boundaries of distributed systems and cryptography.
                    </motion.p>
                </div>
            </Section>

            {/* Publications List */}
            <Section className="">
                <div className="max-w-4xl mx-auto space-y-6">
                    {[
                        {
                            title: "Optimizing Event Sourcing at Scale",
                            date: "Jan 2026",
                            abstract: "A deep dive into reducing latency in event-driven architectures using optimistic concurrency controls."
                        },
                        {
                            title: "The Future of Autonomous Cyber-Defense",
                            date: "Nov 2025",
                            abstract: "Exploring the role of generative agents in identifying and neutralizing zero-day exploits."
                        },
                        {
                            title: "Data Sovereignty in Multi-Cloud Environments",
                            date: "Sep 2025",
                            abstract: "Strategies for maintaining compliance and control over data resident in disparate public cloud infrastructures."
                        }
                    ].map((paper, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-electric-blue/20 hover:bg-electric-blue hover:border-electric-blue hover:text-white group"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="w-5 h-5 text-electric-blue" />
                                        <h3 className="text-xl font-bold text-white">{paper.title}</h3>
                                    </div>
                                    <p className="text-slate-400 mb-2 group-hover:text-white/90">{paper.abstract}</p>
                                    <span className="text-sm text-slate-500 font-mono group-hover:text-white/70">{paper.date} • Technical Whitepaper</span>
                                </div>
                                <Button
                                    size="sm"
                                    className="shrink-0 bg-gradient-to-r from-electric-blue to-cyan-accent text-white font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all border-none"
                                    onClick={() => window.open(`/research/${paper.title.toLowerCase().replace(/\s+/g, '-')}.pdf`, '_blank')}
                                >
                                    <Download className="w-4 h-4 mr-2" /> PDF
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
        </div >
    );
}
