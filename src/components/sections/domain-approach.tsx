"use client"

import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { Shield, Activity, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DomainApproach() {
    return (
        <Section background="transparent" className="py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16 mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Solving Complex Challenges
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        AhiLight applies research driven engineering to enterprise operations where existing tools fall short.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Domain 1: Security (CyberFortress) */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-electric-blue to-transparent opacity-20 blur-sm rounded-2xl group-hover:opacity-40 transition-opacity" />
                        <Card className="relative h-full p-8 bg-navy-card border border-white/10 hover:bg-electric-blue hover:border-electric-blue transition-all group flex flex-col">
                            <div className="w-14 h-14 bg-electric-blue/10 rounded-xl flex items-center justify-center mb-6 text-electric-blue group-hover:bg-white group-hover:text-electric-blue transition-colors">
                                <Shield className="w-8 h-8" />
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold text-white group-hover:text-white">Security Operations</h3>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-electric-blue/20 text-electric-blue text-xs font-bold uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white">
                                    CyberFortress
                                </span>
                            </div>

                            <div className="space-y-6 mb-8 flex-grow">
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-hover:text-white/80">The Challenge</div>
                                    <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white/90">
                                        Enterprise security stacks contain 30 to 50 fragmented tools. Attacks move at machine speed while human teams respond in hours.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-electric-blue uppercase tracking-wider mb-2 group-hover:text-white">Our Approach</div>
                                    <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white/90">
                                        Unified autonomous platforms that detect, respond, and audit without human bottlenecks. Uses post quantum encryption and adaptive honeypots.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 group-hover:border-white/20 mt-auto">
                                <Link href="/cyberfortress" className="block">
                                    <Button className="w-full bg-white/10 text-white hover:bg-white hover:text-electric-blue border-transparent group-hover:border-white transition-all shadow-lg">
                                        Explore Platform
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>

                    {/* Common Message: Expanding Horizons */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-transparent opacity-10 blur-sm rounded-2xl group-hover:opacity-30 transition-opacity" />
                        <Card className="relative h-full p-8 bg-navy-card/50 border border-white/5 border-dashed hover:border-solid hover:bg-navy-card hover:border-electric-blue transition-all group flex flex-col justify-center items-center text-center">
                            <div className="mb-6 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-electric-blue/10 transition-colors">
                                <Sparkles className="w-8 h-8 text-slate-500 group-hover:text-electric-blue transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white">Expanding Horizons</h3>
                            <p className="text-slate-400 mb-8 leading-relaxed max-w-sm group-hover:text-slate-300">
                                Our research inputs are continuously evolving. We are actively developing new autonomous systems to tackle complex challenges across enterprise infrastructure and global supply chains.
                            </p>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-slate-400 group-hover:text-electric-blue group-hover:bg-electric-blue/10 group-hover:border-electric-blue/20 transition-all">
                                <Activity className="w-4 h-4" />
                                <span>Research In Progress</span>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </Section>
    )
}
