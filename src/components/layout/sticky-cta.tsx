"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past hero (approx 500px)
            setIsVisible(window.scrollY > 500)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-6 right-6 z-50 lg:hidden"
                >
                    <Button
                        size="lg"
                        className="rounded-full shadow-2xl bg-electric-blue hover:bg-cyan-accent text-white font-bold h-14 px-6 gap-2"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        Request Demo
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
