"use client"

import { Section } from "@/components/ui/section"
import { FileText, Github, CheckCircle } from "lucide-react"
import Link from "next/link"

export function ResearchCredibility() {
    return (
        <Section background="navy-gradient" className="py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16 text-center mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Built on Research, Not Marketing
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Every AhiLight platform is grounded in peer-reviewed research, open-source contributions, and transparent validation.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Publications */}
                    <div className="bg-navy-card p-8 rounded-2xl border border-white/5 hover:border-electric-blue/50 transition-colors group">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-400 group-hover:bg-electric-blue/10 group-hover:text-electric-blue transition-colors">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Research Publications</h3>
                        <p className="text-slate-400 mb-6">
                            Peer-reviewed papers across machine learning, distributed systems, and cryptography. Our work is cited by academic researchers and industry practitioners building next-generation infrastructure.
                        </p>
                        <Link href="/research" className="text-electric-blue font-bold hover:underline flex items-center gap-2">
                            View publications &rarr;
                        </Link>
                    </div>

                    {/* Open Source */}
                    <div className="bg-navy-card p-8 rounded-2xl border border-white/5 hover:border-electric-blue/50 transition-colors group">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-400 group-hover:bg-electric-blue/10 group-hover:text-electric-blue transition-colors">
                            <Github className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Open Source</h3>
                        <p className="text-slate-400 mb-6">
                            Active open-source projects with contributions from enterprise security and infrastructure teams. We believe in transparent research — our tools are used by Fortune 500 teams.
                        </p>
                        <Link href="https://github.com" className="text-electric-blue font-bold hover:underline flex items-center gap-2">
                            Explore on GitHub &rarr;
                        </Link>
                    </div>

                    {/* Standards */}
                    <div className="bg-navy-card p-8 rounded-2xl border border-white/5 hover:border-electric-blue/50 transition-colors group">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-slate-400 group-hover:bg-electric-blue/10 group-hover:text-electric-blue transition-colors">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Standards Alignment</h3>
                        <p className="text-slate-400 mb-6">
                            MITRE ATT&CK, NIST, Zero Trust Architecture — we build on validated standards and contribute back through working groups and public research.
                        </p>
                        <Link href="/research" className="text-electric-blue font-bold hover:underline flex items-center gap-2">
                            Read our approach &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    )
}
