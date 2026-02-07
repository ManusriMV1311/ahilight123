"use client";

import { NeuralNetworkBackground } from "@/components/backgrounds/NeuralNetworkBackground";
import { Section } from "@/components/ui/section";
import { FileText, Microscope, FlaskConical, Atom, Download, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlareCard } from "@/components/ui/glare-card";
import { Button } from "@/components/ui/button";

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

            {/* Research Papers Grid */}
            <Section className="relative z-10 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
                    {[
                        {
                            title: "Byzantine General Solutions",
                            category: "Consensus Algorithms",
                            desc: "A novel approach to fault tolerance in asynchronous networks with <10ms latency.",
                            readTime: "15 min read",
                            icon: Atom,
                            color: "from-purple-500 to-indigo-600"
                        },
                        {
                            title: "Homomorphic Encryption",
                            category: "Cryptography",
                            desc: "Processing encrypted data without decryption, enabling privacy-preserving analytics.",
                            readTime: "22 min read",
                            icon: LockKeyhole,
                            color: "from-cyan-500 to-blue-600"
                        },
                        {
                            title: "Self-Healing Meshes",
                            category: "Distributed Systems",
                            desc: "Biological-inspired protocols for network recovery and automated rerouting.",
                            readTime: "18 min read",
                            icon: Microscope,
                            color: "from-emerald-500 to-teal-600"
                        },
                        {
                            title: "Quantum-Resistant Ledger",
                            category: "Security",
                            desc: "Preparing for the post-quantum era with lattice-based cryptographic signatures.",
                            readTime: "25 min read",
                            icon: FlaskConical,
                            color: "from-pink-500 to-rose-600"
                        }
                    ].map((paper, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="h-full"
                        >
                            <GlareCard className="flex flex-col h-full bg-navy-card/40 backdrop-blur-xl border border-white/10 p-1 relative overflow-hidden group">
                                {/* Scientific Corner Decals */}
                                <div className="absolute top-4 right-4 text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded">
                                    RES-{1000 + i}
                                </div>
                                <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${paper.color} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />

                                <div className="h-full w-full bg-deep-navy/60 p-8 rounded-[14px] flex flex-col relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${paper.color} p-[1px] shadow-lg`}>
                                            <div className="w-full h-full bg-deep-navy rounded-xl flex items-center justify-center">
                                                <paper.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <span className="text-xs font-mono text-electric-blue bg-electric-blue/10 px-3 py-1 rounded-full border border-electric-blue/20">
                                            {paper.readTime}
                                        </span>
                                    </div>

                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">{paper.category}</h4>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                        {paper.title}
                                    </h3>

                                    <p className="text-slate-300 leading-relaxed text-base mb-8 flex-grow">
                                        {paper.desc}
                                    </p>

                                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white group-hover:border-white/30 transition-all">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Read Paper
                                    </Button>
                                </div>
                            </GlareCard>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
