"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const titles = [
    "Never Sleeps",
    "Closes More Deals",
    "Qualifies Leads 24/7",
    "Scales Your Team",
];

export const Hero = () => {
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    src="/assets/robot-animation.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-[66px] font-display mb-8 tracking-tight">
                        <span className="block mb-2">Your AI Sales Team</span>
                        <div className="relative h-[1.2em] w-full mt-2 lg:mt-4 flex justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={titles[titleIndex]}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute left-0 right-0 text-brand-secondary"
                                >
                                    {titles[titleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-12 leading-relaxed">
                        Close more deals while your AI agents handle lead qualification calls 24/7.
                        Scale your outreach without hiring a single person.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 bg-[#0c1d56] text-white font-bold rounded-full hover:bg-brand-primary/90 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/30 transition-all text-base border border-white/10">
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 bg-white/10 text-white font-bold border border-white/20 rounded-full hover:bg-white/20 backdrop-blur-sm transition-all shadow-sm text-base">
                            <Play className="w-5 h-5 fill-white" />
                            Watch Demo
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
