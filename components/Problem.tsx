"use client";

import { motion } from "framer-motion";
import { Clock, PhoneOff, AlertCircle, TrendingDown } from "lucide-react";

const painPoints = [
    {
        icon: Clock,
        title: "60% Time Wasted",
        description: "Brokers spend the majority of their day chasing unqualified leads instead of closing.",
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        icon: PhoneOff,
        title: "Missed Opportunities",
        description: "Leads that come in after-hours or during meetings go cold within minutes.",
        color: "text-red-500",
        bg: "bg-red-50"
    },
    {
        icon: AlertCircle,
        title: "Manual Follow-ups",
        description: "Inconsistent follow-up processes lead to potential deals falling through the cracks.",
        color: "text-blue-500",
        bg: "bg-blue-50"
    }
];

export const Problem = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6"
                    >
                        The Real Estate <span className="text-red-500">Wait-Game</span> is Costing You.
                    </motion.h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Real estate brokers waste 60% of their time on unqualified leads.
                        While you're sleeping or showing a house, your next big commission might be calling someone else.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {painPoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl border border-slate-100 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${point.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <point.icon className={`w-6 h-6 ${point.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{point.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 rounded-[2rem] bg-slate-900 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] -z-0" />
                    <p className="text-2xl md:text-3xl font-display font-bold text-white relative z-10">
                        "There is a better way to handle your leads..."
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-brand-primary relative z-10 transition-transform items-center cursor-default">
                        <span className="font-bold underline underline-offset-4 decoration-2">Discover the CallAgentAI Solution</span>
                        <TrendingDown className="w-5 h-5 rotate-180" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
