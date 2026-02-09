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
        <section id="pricing" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b1847] mb-6">
                        Flexible Plans for Scaling Teams
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
                        Choose the plan that fits your brokerage's growth stage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="relative p-8 rounded-[2rem] border border-slate-200 bg-white flex flex-col transition-all duration-300 hover:border-[#0b1847] hover:shadow-[0_20px_40px_rgba(11,24,71,0.08)] group"
                        >
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-[#0b1847] mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-slate-900 tracking-tight">{tier.price}</span>
                                    {tier.price !== "Custom" && <span className="text-slate-500 font-medium">/mo</span>}
                                </div>
                                <p className="text-slate-500 mt-4 leading-relaxed">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {tier.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/login" className="w-full">
                                <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-[#131f49] text-white hover:bg-[#131f49]/90 hover:shadow-lg transition-all shadow-md group-hover:scale-[1.02]">
                                    {tier.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
