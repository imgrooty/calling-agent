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
        <section className="relative pt-52 pb-20 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1520px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="z-10 lg:max-w-[45%] lg:-translate-y-6"
                    >

                        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-display font-semibold text-[#0c1d56] leading-[1.1] mb-6">
                            <span className="block whitespace-nowrap">Your AI Sales Team</span>
                            <div className="relative h-[1.2em] w-full mt-2 lg:mt-3">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={titles[titleIndex]}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-gradient absolute left-0 top-0 w-full whitespace-nowrap"
                                    >
                                        {titles[titleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </h1>

                        <p className="text-lg text-slate-600 max-w-xl mb-12 leading-relaxed">
                            Close more deals while your AI agents handle lead qualification calls 24/7.
                            Scale your outreach without hiring a single person.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-5 mb-12 lg:mb-0">
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 bg-brand-primary text-white font-extrabold rounded-full hover:bg-brand-primary/90 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/30 transition-all text-base">
                                Start Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 bg-white text-slate-900 font-bold border border-slate-200 rounded-full hover:bg-slate-50 transition-all shadow-sm text-base">
                                <Play className="w-5 h-5 fill-slate-900" />
                                Watch Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Video Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-[1.5rem] overflow-hidden glass shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-200/60 bg-white/5
                w-[480px] h-[300px] md:w-[580px] md:h-[360px] xl:w-[720px] xl:h-[440px]">
                            <video
                                src="/assets/robot-animation.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decoration */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-brand-secondary/10 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>


            </div>
        </section>
    );
};
