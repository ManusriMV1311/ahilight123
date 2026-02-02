"use client"

import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { HelpCircle, AlertCircle, ShieldQuestion } from "lucide-react"

const faqs = [
    {
        icon: HelpCircle,
        question: "Is this a black box?",
        answer: "No. Every detection includes an explainability breakdown — the specific behaviors, correlated events, and confidence scores that triggered the alert. Analysts see exactly why CyberFortress flagged something, not just that it did. Every action is logged to an immutable blockchain audit trail."
    },
    {
        icon: AlertCircle,
        question: "What about false positives?",
        answer: "CyberFortress uses a confidence scoring system that assigns a maliciousness rating (0–100) to each indicator based on source reliability, external enrichment, and behavioral pattern matching. High-confidence alerts trigger automated response. Lower-confidence alerts route to human review. The system is designed to reduce alert fatigue, not create it."
    },
    {
        icon: ShieldQuestion,
        question: "Is autonomous response safe?",
        answer: "Automation has guardrails. Response actions escalate through configurable approval tiers — block a malicious IP automatically, but isolating a device requires analyst confirmation. Every automated action has a one-click rollback. A safe mode (detection only, zero automated response) is always available."
    }
]

export function AISkepticism() {
    return (
        <Section background="transparent" className="py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Questions enterprise security teams ask. <br />
                        <span className="text-electric-blue">Honest answers.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {faqs.map((faq, idx) => (
                        <Card key={idx} className="p-8 bg-white/5 border border-white/10 hover:border-electric-blue/30 transition-all hover:bg-white/10 group h-full">
                            <div className="mb-6 p-4 rounded-full bg-deep-navy w-fit border border-white/10 group-hover:border-electric-blue/50 transition-colors">
                                <faq.icon className="w-8 h-8 text-slate-400 group-hover:text-electric-blue transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {faq.answer}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    )
}
