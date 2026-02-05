"use client";

import { ContactBackground } from "@/components/backgrounds/ContactBackground";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; // Added Link import

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form submitted:", formState);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col pt-24 pb-12">
            <ContactBackground />

            <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center">

                {/* Header */}
                <div className="text-center mb-16">
                    <TypewriterEffect
                        words={[
                            { text: "Let's", className: "text-white" },
                            { text: "Build", className: "text-white" },
                            { text: "the", className: "text-white" },
                            { text: "Future", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent" },
                            { text: "Together", className: "text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-accent" },
                        ]}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6 py-6 leading-normal"
                        cursorClassName="bg-electric-blue"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto"
                    >
                        Have a challenge that requires advanced intelligence? We're ready to listen.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">

                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-electric-blue/10 rounded-lg text-electric-blue group-hover:bg-electric-blue group-hover:text-deep-navy transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Email</p>
                                        <a href="mailto:hello@ahilight.com" className="text-xl text-white font-semibold hover:text-electric-blue transition-colors">
                                            hello@ahilight.com
                                        </a>
                                        <p className="text-sm text-slate-500 mt-1">General Inquiries & Support</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-electric-blue/10 rounded-lg text-electric-blue group-hover:bg-electric-blue group-hover:text-deep-navy transition-colors">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Global HQ</p>
                                        <p className="text-xl text-white font-semibold">
                                            San Francisco, CA
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">Research & Engineering Hub</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-electric-blue/10 rounded-lg text-electric-blue group-hover:bg-electric-blue group-hover:text-deep-navy transition-colors">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Social</p>
                                        <div className="flex gap-4 mt-1">
                                            {/* Social Links Placeholders */}
                                            <a href="#" className="text-white hover:text-electric-blue transition-colors">LinkedIn</a>
                                            <a href="#" className="text-white hover:text-electric-blue transition-colors">Twitter</a>
                                            <a href="#" className="text-white hover:text-electric-blue transition-colors">GitHub</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5">
                            <p className="text-slate-400 text-sm">
                                "The best way to predict the future is to create it."
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form / Success State */}
                    <div className="relative">
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-slate-900/60 backdrop-blur-md border border-electric-blue/50 p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(125,95,255,0.1)]"
                            >
                                <div className="w-20 h-20 bg-electric-blue/20 rounded-full flex items-center justify-center mb-6 text-electric-blue">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Message Received</h3>
                                <p className="text-slate-300 text-lg mb-8 max-w-sm">
                                    Our systems have ingested your request. A human engineer will review it shortly.
                                </p>
                                <Button
                                    onClick={() => { setIsSubmitted(false); setFormState({ ...formState, message: "", subject: "" }); }}
                                    variant="outline"
                                    className="border-white/10 hover:bg-white/5"
                                >
                                    Send another message
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl h-full flex flex-col"
                            >
                                <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                                <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm text-slate-300 font-medium">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm text-slate-300 font-medium">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm text-slate-300 font-medium">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            required
                                            value={formState.subject}
                                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                            placeholder="Enterprise Solutions Inquiry"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm text-slate-300 font-medium">Message</label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <Button type="submit" className="w-full font-bold py-6 text-lg rounded-xl mt-2 group shadow-[0_0_20px_rgba(125,95,255,0.3)]">
                                            Send Message
                                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>

                                    <div className="text-center pt-2">
                                        <p className="text-xs text-slate-500">
                                            By submitting this form, you acknowledge our <Link href="/privacy" className="underline hover:text-electric-blue transition-colors">Privacy Policy</Link>.
                                        </p>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
