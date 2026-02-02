"use client"

import { Clock, Layers, ShieldAlert } from "lucide-react"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"

const problems = [
    {
        icon: Clock,
        title: "Human Response Speed",
        description: "Attacks move at machine speed. MTTR gaps are structural, not a training problem. By the time an analyst triages an alert, the lateral movement has already happened.",
    },
    {
        icon: Layers,
        title: "Tool Fragmentation",
        description: "Enterprise security stacks contain 30 to 50 point solutions that don't communicate. Alert fatigue is inevitable. Critical signals get buried in noise.",
    },
    {
        icon: ShieldAlert,
        title: "Reactive Posture",
        description: "Defenders wait. Adversaries probe continuously, learn from failures, and adapt. The asymmetry is baked into the model.",
    },
]

export function ProblemStatement() {
    return (
        <Section background="transparent" className="relative overflow-hidden pt-32">
            {/* Background Blob for depth */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-20 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Security teams are drowning. <br />
                        <span className="text-electric-blue">The tools aren&apos;t the problem, the architecture is.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, idx) => (
                        <motion.div
                            key={problem.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                        >
                            <Card className="p-8 h-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
                                <div className="mb-6 p-4 rounded-xl bg-deep-navy w-fit border border-white/10 group-hover:border-electric-blue/50 transition-colors">
                                    <problem.icon className="w-8 h-8 text-electric-blue" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{problem.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {problem.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
