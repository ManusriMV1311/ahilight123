"use client"

import { Activity, ShieldCheck, Ghost, Database, LayoutGrid } from "lucide-react"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"

const pillars = [
    {
        title: "Autonomous Detection",
        description: "Traditional tools alert on signatures or rules. CyberFortress correlates behaviors across network, endpoint, and identity to identify attack chains before they complete.",
        icon: Activity,
    },
    {
        title: "Policy-Driven Response",
        description: "Automation without guardrails is dangerous. CyberFortress executes predefined response playbooks with rollback capabilities and human override at every critical decision point.",
        icon: ShieldCheck,
    },
    {
        title: "Adversarial Deception",
        description: "Passive defense is insufficient. CyberFortress deploys adaptive honeypots powered by generative AI that waste adversary time and gather actionable threat intelligence.",
        icon: Ghost,
    },
    {
        title: "Immutable Audit",
        description: "Compliance and forensics require tamper-proof records. Every detection and response action is logged to a blockchain-backed audit trail — unalterable, verifiable, and forensically sound.",
        icon: Database,
    },
    {
        title: "Unified Platform",
        description: "Security teams don't need another point solution. CyberFortress replaces fragmented stacks with a single platform that integrates with or replaces existing tools.",
        icon: LayoutGrid,
    },
]

export function ValuePillars() {
    return (
        <Section background="navy-gradient" className="relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    CyberFortress. One platform. <span className="text-electric-blue">Five capabilities.</span>
                </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillars.map((pillar, idx) => (
                    <motion.div
                        key={pillar.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={idx === 4 ? "lg:col-span-3 lg:w-1/3 lg:mx-auto" : ""} // Center the 5th item
                    >
                        <Card className="p-8 h-full bg-navy-card hover:bg-navy-card-hover border border-white/5 transition-all group hover:border-electric-blue/30">
                            <div className="mb-6 inline-flex p-3 rounded-xl bg-electric-blue/10 text-electric-blue group-hover:bg-electric-blue group-hover:text-white transition-colors">
                                <pillar.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {pillar.description}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
