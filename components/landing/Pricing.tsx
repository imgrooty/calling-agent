"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const tiers = [
    {
        name: "Starter",
        price: "$299",
        description: "Perfect for individual brokers starting out.",
        features: ["1 AI Agent instance", "Up to 500 calls/mo", "Basic transcription", "Email support"],
        cta: "Get the plan",
    },
    {
        name: "Professional",
        price: "$799",
        description: "Ideal for growing teams and small agencies.",
        features: ["5 AI Agent instances", "Up to 2,500 calls/mo", "Sentiment analysis", "CRM integration", "Priority support"],
        cta: "Get the plan",
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large brokerages with high volume needs.",
        features: ["Unlimited AI Agents", "Custom call volume", "Dedicated account manager", "API access", "Whitelabel dashboard"],
        cta: "Get the plan",
    }
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-32 bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                        Flexible Plans for <span className="text-gradient-ai">Scaling Teams</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Choose the plan that fits your brokerage's growth stage.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            whileHover={{ y: -12, scale: 1.02 }}
                            className="relative p-8 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl flex flex-col transition-all duration-300 hover:border-[#6366f1] hover:shadow-[0_20px_60px_rgba(99,102,241,0.3)] group overflow-hidden"
                        >
                            {/* Animated background gradient (hover-only) */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#00d9ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            
                            <div className="relative z-10 mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-gradient-ai tracking-tight">{tier.price}</span>
                                    {tier.price !== "Custom" && <span className="text-gray-400 font-medium">/mo</span>}
                                </div>
                                <p className="text-gray-400 mt-4 leading-relaxed">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1 relative z-10">
                                {tier.features.map((feature, j) => (
                                    <motion.li 
                                        key={j}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 + j * 0.1 }}
                                        className="flex items-center gap-3 text-sm font-medium text-gray-300"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/10 text-[#10b981] flex items-center justify-center shrink-0 border border-[#10b981]/30">
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        </div>
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>

                            <Link href="/login" className="w-full relative z-10">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:shadow-2xl hover:shadow-[#6366f1]/50 transition-all relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10">{tier.cta}</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
