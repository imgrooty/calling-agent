"use client";

import { motion } from "framer-motion";
import { Heart, BarChart3, Users, Zap, ShieldCheck } from "lucide-react";

// Lucide icon replacement as Voiceover doesn't exist
import { Mic2 } from "lucide-react";

const features = [
    {
        icon: Mic2,
        title: "AI Call Agents",
        description: "Human-like AI that qualifies leads, handles objections, and schedules viewings directly in your calendar.",
        accent: "bg-blue-500"
    },
    {
        icon: Users,
        title: "Lead Management",
        description: "Automatic lead capture from all platforms. Categorize, tag, and track every interaction in one central hub.",
        accent: "bg-indigo-500"
    },
    {
        icon: BarChart3,
        title: "Analytics & Insights",
        description: "Deep-dive into call performance, sentiment analysis, and conversion rates to optimize your sales funnel.",
        accent: "bg-emerald-500"
    },
    {
        icon: Zap,
        title: "Instant Response",
        description: "Call back speed matters. Our AI reaches out to new leads within 30 seconds of registration.",
        accent: "bg-amber-500"
    },
    {
        icon: ShieldCheck,
        title: "Sentiment Analysis",
        description: "Know exactly how your leads feel. Identify high-intent customers based on their tone and vocabulary.",
        accent: "bg-purple-500"
    },
    {
        icon: Heart,
        title: "Seamless Integration",
        description: "Works with Zillow, Compass, and your favorite CRMs. No complicated setup required.",
        accent: "bg-pink-500"
    }
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6">
                            Everything You Need to <br />
                            <span className="text-brand-primary">Automate Your Success</span>
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Custom-built for real estate brokerages who want to scale their
                            operations without increasing their overhead.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${feature.accent} flex items-center justify-center mb-6 shadow-lg shadow-black/10`}>
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">{feature.description}</p>
                            <div className="h-1 w-12 bg-slate-100 rounded-full group-hover:w-full group-hover:bg-brand-primary transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
