"use client"

import { Check, Database, Lock, Server, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"

const capabilities = [
    "Behavioral correlation across network, endpoint, and identity",
    "Graph neural network-based attack chain detection",
    "<1% false positive rate on MITRE ATT&CK test datasets",
    "MTTD target: under 5 minutes",
    "MTTR target: under 15 minutes",
    "100K+ events processed per second per instance",
    "Post-quantum key exchange (ML-KEM) for all data in transit",
    "Blockchain-backed immutable audit (Hyperledger Fabric)",
    "Generative AI honeypots with LLM-powered deception",
    "Human-in-the-loop response with automatic rollback",
    "Supports 10,000+ devices per deployment",
    "Agent-based and agentless device discovery",
]

export function TechnicalCredibility() {
    return (
        <Section background="navy-gradient" className="py-32">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Built for the threat landscape that&apos;s coming.
                </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: Capability List */}
                <div className="grid sm:grid-cols-1 gap-4">
                    {capabilities.map((cap, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                        >
                            <div className="mt-1 flex-shrink-0 bg-success-green/10 text-success-green p-1 rounded-full">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="text-slate-300 font-medium">{cap}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Architecture Flow */}
                <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_8s_linear_infinite]" />

                    <div className="relative space-y-4">
                        {/* Layer 1 */}
                        <div className="group relative z-10 bg-navy-card border border-white/10 p-6 rounded-xl flex items-center gap-6 hover:border-electric-blue/50 transition-colors">
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg"><Server className="w-6 h-6" /></div>
                            <div>
                                <div className="text-white font-bold">Data Collection</div>
                                <div className="text-slate-500 text-sm">Agents, Network Taps, API Integrations</div>
                            </div>
                            <div className="absolute left-9 bottom-[-24px] z-0 h-6 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50" />
                        </div>

                        {/* Layer 2 */}
                        <div className="group relative z-10 bg-navy-card border border-white/10 p-6 rounded-xl flex items-center gap-6 hover:border-electric-blue/50 transition-colors ml-8">
                            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg"><ActivityIcon className="w-6 h-6" /></div>
                            <div>
                                <div className="text-white font-bold">Analysis &amp; Correlation</div>
                                <div className="text-slate-500 text-sm">ML Inference, GNN Engine</div>
                            </div>
                            <div className="absolute left-9 bottom-[-24px] z-0 h-6 w-0.5 bg-gradient-to-b from-purple-500/50 to-orange-500/50" />
                        </div>

                        {/* Layer 3 */}
                        <div className="group relative z-10 bg-navy-card border border-white/10 p-6 rounded-xl flex items-center gap-6 hover:border-electric-blue/50 transition-colors ml-16">
                            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-lg"><ShieldCheck className="w-6 h-6" /></div>
                            <div>
                                <div className="text-white font-bold">Response Orchestration</div>
                                <div className="text-slate-500 text-sm">SOAR Playbooks, Human Approval Gates</div>
                            </div>
                            <div className="absolute left-9 bottom-[-24px] z-0 h-6 w-0.5 bg-gradient-to-b from-orange-500/50 to-green-500/50" />
                        </div>

                        {/* Layer 4 */}
                        <div className="group relative z-10 bg-navy-card border border-white/10 p-6 rounded-xl flex items-center gap-6 hover:border-electric-blue/50 transition-colors ml-24">
                            <div className="p-3 bg-green-500/10 text-green-400 rounded-lg"><Database className="w-6 h-6" /></div>
                            <div>
                                <div className="text-white font-bold">Audit &amp; Compliance</div>
                                <div className="text-slate-500 text-sm">Blockchain Ledger, Immutable Logs</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    )
}

function ActivityIcon(props: any) {
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
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
