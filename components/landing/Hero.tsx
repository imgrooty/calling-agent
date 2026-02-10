"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const titles = [
    "Never Sleeps",
    "Closes More Deals",
    "Track Leads 24/7",
    "Scales Your Team",
];

export const Hero = () => {
    const [titleIndex, setTitleIndex] = useState(0);
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            
            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 left-20 w-96 h-96 bg-[#6366f1]/20 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-[#00d9ff]/20 rounded-full blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Video Background with overlay */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden opacity-30">
                <video
                    src="/assets/robot-animation.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]" />
            </div>

            <motion.div 
                className="relative z-10 max-w-6xl mx-auto px-6 text-center"
                style={{ opacity, scale }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* AI Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full border border-white/10"
                    >
                        <Sparkles className="w-4 h-4 text-[#00d9ff]" />
                        <span className="text-sm font-medium text-white">Powered by Advanced AI Technology</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mt-4 mb-8">
                        <span className="block mb-2 text-white">Your AI Sales Team</span>
                        <div className="relative h-[1.2em] w-full mt-4 lg:mt-6 flex justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={titles[titleIndex]}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute left-0 right-0 text-gradient-ai"
                                >
                                    {titles[titleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12 leading-relaxed"
                    >
                        Close more deals while your AI agents handle lead qualification calls 24/7.
                        Scale your outreach without hiring a single person.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
                    >
                        <Link href="/login" className="w-full sm:w-auto">
                            <button className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#6366f1]/50 transition-all text-base overflow-hidden">
                                <span className="relative z-10">Get Started</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
                >
                    <motion.div className="w-1.5 h-2 bg-white/60 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};
