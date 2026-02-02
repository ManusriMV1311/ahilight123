"use client"

import { Section } from "@/components/ui/section"
import { AlertCircle, Database, Zap } from "lucide-react"

export function Problem() {
    return (
        <Section background="transparent" className="py-24 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-16">

                    {/* Headline */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                            The Fundamental Limit is <br />
                            <span className="text-slate-500">Human Scale Operations</span>
                        </h2>
                        <p className="text-xl text-electric-blue font-medium mb-4">
                            AhiLight builds autonomous software systems designed to operate at the scale and speed modern enterprises demand.
                        </p>
                    </div>

                    {/* Problems List */}
                    <div className="w-full md:w-2/3 space-y-12">

                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500 mt-1">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">Operational Complexity</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Enterprise systems have evolved beyond human scale management. As operations grow more distributed and interconnected, the overhead of manual coordination creates cascading inefficiency across teams and infrastructure.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500 mt-1">
                                <Database className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">Data Silos</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Critical operational intelligence remains trapped in disconnected systems. Security, infrastructure, and logistics teams operate on fragmented data, preventing unified decision making and automated response.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0 text-electric-blue mt-1">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-3">Reactive Posture</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Most enterprise systems wait for problems to occur before responding. Modern operations require proactive intelligence, systems that predict, adapt, and act autonomously at machine speed.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Section>
    )
}
