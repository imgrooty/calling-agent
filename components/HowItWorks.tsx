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
        <section className="py-32 bg-slate-50 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="text-center mb-28">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0b1847] mb-6">
                        Seamless Workflow
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
                        From raw data to closed deals in one automated loop.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-[80px] left-0 w-full h-[2px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0b1847]/10 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* 3D Visual Container */}
                                <div className="relative z-10 mb-12 w-40 h-40 group-hover:-translate-y-4 transition-transform duration-500 ease-out">
                                    {/* Ambient Glow */}
                                    <div className="absolute inset-0 bg-[#0b1847]/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Visual Wrapper */}
                                    <div className="w-full h-full relative flex items-center justify-center">
                                        <step.Visual />
                                    </div>

                                    {/* Number Badge */}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white text-[#0b1847] flex items-center justify-center text-sm font-bold rounded-full border border-slate-100 shadow-xl z-20">
                                        {step.id}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0b1847] transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed font-medium px-4">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
