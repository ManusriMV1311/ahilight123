"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Dr. Alex Thorne",
        role: "Founder & CEO",
        bio: "Previously led AI infrastructure at CyberDyne Systems. PhD in Distributed Systems from MIT. Focused on the intersection of autonomy and security.",
        image: null // Placeholder for real image
    },
    {
        name: "Sarah Chen",
        role: "Head of Research",
        bio: "Former Principal Researcher at DeepMind. Specialist in Reinforcement Learning and Multi-Agent Systems.",
        image: null
    },
    {
        name: "James Voss",
        role: "VP of Engineering",
        bio: "20 years of experience scaling enterprise software. Built critical infrastructure for Fortune 500 financial institutions.",
        image: null
    }
];

const advisors = [
    {
        name: "Prof. David Lee",
        role: "Scientific Advisor",
        title: "Professor of CS, Stanford"
    },
    {
        name: "Elena Rodriguez",
        role: "Technical Advisor",
        title: "CTO, Global Logistics Corp"
    }
];

export function AboutTeam() {
    return (
        <Section className="bg-slate-950/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Leadership</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        A multidisciplinary team combining deep academic research with battle tested enterprise engineering.
                    </p>
                </motion.div>

                {/* Core Team Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-deep-navy border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-colors group"
                        >
                            <div className="aspect-[4/3] bg-slate-800 relative flex items-center justify-center">
                                {/* Placeholder Avatar */}
                                <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-3xl font-bold text-slate-500">
                                    {member.name.charAt(0)}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-80" />
                            </div>
                            <div className="p-6 relative">
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-electric-blue text-sm font-medium mb-4">{member.role}</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {member.bio}
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Advisors */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-white mb-8 text-center border-t border-slate-800 pt-16">Advisors</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {advisors.map((advisor, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5"
                            >
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">
                                    {advisor.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{advisor.name}</h4>
                                    <div className="text-sm text-slate-400">{advisor.role} • {advisor.title}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
