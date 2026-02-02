"use client"

import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"

const quarters = [
    {
        quarter: "Q1 2026",
        items: ["Enhanced OT/ICS protocol support", "AWS GovCloud deployment option"],
        active: true
    },
    {
        quarter: "Q2 2026",
        items: ["Advanced threat hunting UI", "Kubernetes-native deployment"],
        active: false
    },
    {
        quarter: "Q3 2026",
        items: ["Post-quantum cryptography module (ML-KEM) integration", "FedRAMP authorization pursuit begins"],
        active: false
    },
    {
        quarter: "Q4 2026",
        items: ["Hardware security module integration preview", "Next-generation honeypot adaptive learning v2"],
        active: false
    }
]

export function Roadmap() {
    return (
        <Section background="navy-gradient" className="py-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    What&apos;s next. No surprises.
                </h2>
                <p className="text-slate-400 text-sm uppercase tracking-widest mt-4">Product Roadmap</p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="relative border-l-2 border-white/10 ml-6 md:ml-0 md:border-l-0 md:border-t-2 md:grid md:grid-cols-4 md:gap-8 md:pt-10">

                    {quarters.map((q, idx) => (
                        <motion.div
                            key={q.quarter}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className={`mb-10 md:mb-0 ml-10 md:ml-0 relative ${q.active ? "opacity-100" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"}`}
                        >
                            {/* Dot */}
                            <div className={`absolute -left-[43px] md:-top-[46px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-deep-navy ${q.active ? "bg-electric-blue shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "bg-slate-700"}`} />

                            <h3 className={`text-xl font-bold mb-4 ${q.active ? "text-electric-blue" : "text-white"}`}>
                                {q.quarter}
                            </h3>
                            <ul className="space-y-3">
                                {q.items.map((item, i) => (
                                    <li key={i} className="text-slate-400 text-sm leading-relaxed border-l-2 border-white/5 pl-3">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                </div>

                <div className="text-center mt-16">
                    <p className="text-slate-600 text-xs italic">
                        Roadmap reflects planned priorities. Delivery is subject to ongoing evaluation.
                    </p>
                </div>
            </div>
        </Section>
    )
}
