"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Box, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
    { name: "About", href: "/about" },
    { name: "Vision", href: "/vision" },
    { name: "Products", href: "/products" },
    { name: "Technology", href: "/technology" },
    { name: "Research", href: "/research" },
    { name: "Careers", href: "/careers" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                    isScrolled
                        ? "h-16 md:h-20 bg-deep-navy/80 backdrop-blur-md border-b border-white/10 shadow-lg"
                        : "h-20 md:h-24 bg-transparent"
                )}
            >
                <div className="container mx-auto px-4 h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-electric-blue to-cyan-accent p-2 rounded-lg group-hover:scale-105 transition-transform">
                            <Box className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white transition-colors">
                            AhiLight
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => {
                            if (link.name === "Products") {
                                const isActive = pathname.startsWith("/products") || pathname.startsWith("/cyberfortress");
                                return (
                                    <div key={link.name} className="relative group">
                                        <Link
                                            href="/products"
                                            className={cn(
                                                "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-white/10 text-white"
                                                    : "text-slate-300 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {link.name}
                                            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
                                        </Link>

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
                                            <div className="bg-deep-navy/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 w-64 shadow-2xl overflow-hidden ring-1 ring-white/5">
                                                <Link href="/cyberfortress" className="block p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                                                    <div className="text-white font-semibold text-sm mb-0.5 group-hover/item:text-electric-blue transition-colors">CyberFortress</div>
                                                    <div className="text-xs text-slate-400 leading-snug">Flagship autonomous security platform</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-white/10 text-white"
                                            : "text-slate-300 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Button
                            className="hidden lg:flex bg-electric-blue hover:bg-cyan-accent text-deep-navy hover:text-white font-bold rounded-full px-6 shadow-[0_0_15px_rgba(0,212,170,0.3)] hover:shadow-[0_0_25px_rgba(0,212,170,0.5)] transition-all duration-300"
                        >
                            Contact Us
                        </Button>

                        <button
                            className="lg:hidden p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-[60] bg-deep-navy/95 backdrop-blur-xl lg:hidden"
                        >
                            <div className="flex flex-col h-full p-6">
                                <div className="flex items-center justify-between mb-10">
                                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                                        <div className="bg-electric-blue p-1.5 rounded-lg">
                                            <Box className="w-6 h-6 text-deep-navy" />
                                        </div>
                                        <span className="text-xl font-bold text-white">AhiLight</span>
                                    </Link>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-slate-300 hover:text-white"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-6">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "text-2xl font-semibold transition-colors hover:text-electric-blue",
                                                pathname === link.href ? "text-electric-blue" : "text-white"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-auto">
                                    <Button className="w-full text-lg py-6 bg-electric-blue hover:bg-cyan-accent text-deep-navy font-bold shadow-lg">Contact Us</Button>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    )
}
