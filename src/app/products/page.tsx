"use client"

import { ProductsBackground } from "@/components/backgrounds/ProductsBackground";
import { DomainApproach } from "@/components/sections/domain-approach"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ShieldCheck } from "lucide-react";

function ProductDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left relative z-50 mb-8 mt-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white font-medium hover:bg-slate-800 transition-colors"
            >
                Explore Products
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-xl shadow-black/50 overflow-hidden z-50"
                    >
                        <div className="py-1">
                            <Link href="/cyberfortress" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors group">
                                <div className="p-2 rounded-lg bg-electric-blue/10 text-electric-blue group-hover:bg-electric-blue group-hover:text-deep-navy transition-colors">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">CyberFortress</p>
                                    <p className="text-xs text-slate-400">Enterprise Security</p>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <div className="pt-20 min-h-screen relative flex flex-col items-center">
            <ProductsBackground />
            <div className="container mx-auto px-4">
                <ProductDropdown />
            </div>
            {/* Reusing the DomainApproach component as the main content */}
            <DomainApproach />
        </div>
    )
}
