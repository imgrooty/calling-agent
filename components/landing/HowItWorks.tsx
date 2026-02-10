"use client";

import { motion } from "framer-motion";
import { Phone, UserPlus } from "lucide-react";

// --- 3D Glass Abstract Visuals ---

const CreateLeadVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Background Card */}
        <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-20 h-24 bg-gradient-to-br from-indigo-500/20 to-[#0b1847]/10 rounded-2xl border border-indigo-200/40 backdrop-blur-sm -rotate-6 z-10"
        />
        {/* Main Card */}
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-20 h-24 bg-gradient-to-tr from-white to-slate-50 rounded-2xl border border-white backdrop-blur-md shadow-[0_8px_32px_rgba(31,38,135,0.15)] z-20 flex flex-col items-center justify-center gap-2"
        >
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                <UserPlus className="w-5 h-5 text-[#0b1847]" strokeWidth={2} />
            </div>
            <div className="w-12 h-2 bg-slate-200 rounded-full" />
            <div className="w-8 h-2 bg-slate-100 rounded-full" />
        </motion.div>

    </div>
);

const PulseRing = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Core */}
        <div className="w-14 h-14 bg-gradient-to-br from-[#0b1847] to-indigo-900 rounded-full shadow-lg z-20 relative flex items-center justify-center border border-white/10">
            <Phone className="w-6 h-6 text-white fill-white/20" />
        </div>
        {/* Rings */}
        {[1, 2, 3].map((i) => (
            <motion.div
                key={i}
                animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                className="absolute w-14 h-14 rounded-full border border-[#0b1847]/20 bg-[#0b1847]/5 backdrop-blur-sm z-10"
            />
        ))}
    </div>
);

const SoundWave = () => (
    <div className="relative w-full h-full flex items-center justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
                key={i}
                animate={{ height: [24, 64, 24] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                className={`w-3 rounded-full bg-gradient-to-b from-[#0b1847] to-indigo-400 opacity-80 backdrop-blur-sm border border-white/20 shadow-sm`}
            />
        ))}
    </div>
);

const InsightsChart = () => (
    <div className="relative w-full h-full flex items-end justify-center gap-2 pb-6 pl-2">
        <motion.div
            initial={{ height: 20 }}
            whileInView={{ height: 40 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-6 bg-slate-200/50 rounded-t-md backdrop-blur-sm border border-white/30"
        />
        <motion.div
            initial={{ height: 20 }}
            whileInView={{ height: 60 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            className="w-6 bg-indigo-200/50 rounded-t-md backdrop-blur-sm border border-white/30"
        />
        <motion.div
            initial={{ height: 20 }}
            whileInView={{ height: 85 }}
            transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
            className="w-8 bg-gradient-to-t from-[#0b1847] to-indigo-600 rounded-t-lg shadow-lg relative z-10 mx-1"
        />

    </div>
);

const steps = [
    {
        id: "01",
        title: "Frictionless onboarding",
        description: "Create leads in bulk or integrate CRM data in seconds",
        Visual: CreateLeadVisual,
    },
    {
        id: "02",
        title: "Autonomous Dialing",
        description: "Deploy human-like AI agents to engage thousands of prospects simultaneously.",
        Visual: PulseRing,
    },
    {
        id: "03",
        title: "Real-Time Intelligence",
        description: "Capture every nuance with live transcription and sentiment tracking.",
        Visual: SoundWave,
    },
    {
        id: "04",
        title: "Strategic Insights",
        description: "Get instant summaries and setiments analysis for actions and revenue forecasts.",
        Visual: InsightsChart,
    },
];

export const HowItWorks = () => {
    return (
        <section className="py-32 bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,217,255,0.1),transparent_50%)]" />
            
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-28"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                        Seamless <span className="text-gradient-ai">AI Workflow</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        From raw data to closed deals in one automated loop.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-[80px] left-0 w-full h-[2px]">
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent origin-left"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* 3D Visual Container with Glow */}
                                <motion.div 
                                    className="relative z-10 mb-12 w-40 h-40"
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {/* Animated Glow */}
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/30 to-[#00d9ff]/30 blur-[50px] rounded-full"
                                        animate={{ 
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{ 
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: index * 0.5
                                        }}
                                    />

                                    {/* Visual Wrapper */}
                                    <div className="w-full h-full relative flex items-center justify-center">
                                        <step.Visual />
                                    </div>

                                    {/* Number Badge with gradient */}
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center text-sm font-bold rounded-full border-2 border-white/20 shadow-xl z-20"
                                    >
                                        {step.id}
                                    </motion.div>
                                </motion.div>

                                {/* Text Content */}
                                <motion.h3 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 + 0.2 }}
                                    className="text-2xl font-bold text-white mb-3 group-hover:text-gradient-ai transition-all duration-300"
                                >
                                    {step.title}
                                </motion.h3>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 + 0.3 }}
                                    className="text-gray-400 leading-relaxed font-medium px-4"
                                >
                                    {step.description}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
