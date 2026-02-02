"use client"

import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

function AbstractNetworkGraph() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-60">
                <svg viewBox="0 0 800 800" className="w-full h-full">
                    <defs>
                        <linearGradient id="network-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00d4aa" />
                            <stop offset="100%" stopColor="#0066FF" />
                        </linearGradient>
                        <radialGradient id="pulse-grad" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Central Core */}
                    <motion.circle
                        cx="400" cy="400"
                        r="100"
                        fill="none"
                        stroke="url(#network-gradient)"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "center" }}
                    />

                    <motion.circle
                        cx="400" cy="400"
                        r="200"
                        fill="none"
                        stroke="url(#network-gradient)"
                        strokeWidth="0.2"
                        opacity="0.5"
                        animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                        transition={{
                            rotate: { duration: 90, repeat: Infinity, ease: "linear" },
                            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{ transformOrigin: "center" }}
                    />

                    {/* Orbiting Nodes & Connections */}
                    <motion.g animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "center" }}>
                        {/* Node Group 1 */}
                        <g transform="translate(400, 400)">
                            <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                                <circle cx="150" cy="0" r="3" fill="#00d4aa" opacity="0.8" />
                                <line x1="0" y1="0" x2="150" y2="0" stroke="url(#network-gradient)" strokeWidth="0.5" opacity="0.4" />
                            </motion.g>
                        </g>

                        {/* Node Group 2 */}
                        <g transform="translate(400, 400)">
                            <motion.g animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                                <circle cx="0" cy="250" r="4" fill="#0066FF" opacity="0.6" />
                                <line x1="0" y1="0" x2="0" y2="250" stroke="url(#network-gradient)" strokeWidth="0.5" opacity="0.3" />
                            </motion.g>
                        </g>

                        {/* Satellite Nodes */}
                        <motion.circle cx="600" cy="400" r="2" fill="#00d4aa" opacity="0.4" animate={{ r: [2, 4, 2] }} transition={{ duration: 3, repeat: Infinity }} />
                        <motion.circle cx="200" cy="400" r="2" fill="#0066FF" opacity="0.4" animate={{ r: [2, 4, 2] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
                    </motion.g>

                    {/* Dynamic Pulses */}
                    <motion.circle
                        cx="400" cy="400" r="20"
                        fill="url(#pulse-grad)"
                        animate={{ r: [20, 300], opacity: [0.5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                    />
                </svg>
            </div>

            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-deep-navy to-transparent opacity-80" />
        </div>
    )
}

export function Hero() {
    return (
        <Section background="transparent" className="min-h-screen flex items-center relative overflow-hidden pt-20">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-deep-navy z-0" />
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay z-0 pointer-events-none" />

            {/* Animation */}
            <AbstractNetworkGraph />

            <div className="container mx-auto px-4 z-10 relative">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                            Engineering the Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent">
                                Enterprise Intelligence
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-12 max-w-2xl">
                            AhiLight builds research driven autonomous software systems for the world&apos;s most critical operations, from security to supply chain.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button size="lg" className="bg-electric-blue hover:bg-cyan-accent text-deep-navy font-bold h-14 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(0,212,170,0.3)] hover:shadow-[0_0_30px_rgba(0,212,170,0.5)] transition-all">
                                Explore Our Research
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white h-14 px-8 rounded-full text-lg">
                                View Technologies
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}
