"use client";

import { motion } from "framer-motion";
import { Phone, Users, BarChart3, MessageSquareText, Play, ArrowUpRight } from "lucide-react";

export const HeroMockup = () => {
    return (
        <div className="relative w-full max-w-4xl mx-auto mt-12 overflow-hidden rounded-2xl glass-dark shadow-2xl">
            {/* Dashboard Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="ml-4 px-3 py-1 bg-slate-800 rounded-md text-[10px] text-slate-400 font-mono">
                        api.callagent.ai/v1/live-session/8823
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Live Call
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-0 h-[400px]">
                {/* Sidebar */}
                <div className="col-span-3 border-r border-slate-800 p-4 space-y-4 bg-slate-900/30">
                    {[
                        { icon: Users, label: "leads" },
                        { icon: Phone, label: "Campaigns", active: true },
                        { icon: MessageSquareText, label: "Transcripts" },
                        { icon: BarChart3, label: "Analytics" },
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${item.active ? 'bg-brand-primary/10 text-brand-primary' : 'text-slate-400'}`}>
                            <item.icon className="w-4 h-4" />
                            <span className="text-xs font-medium capitalize">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Main Content - Live Transcription */}
                <div className="col-span-9 p-6 flex flex-col h-full bg-slate-900/20">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-sm font-semibold text-white">Call with John Anderson</h4>
                            <p className="text-[10px] text-slate-500 mt-1 pb-2 border-b border-slate-800">Lead ID: #RE-9921 • Property: 422 Sunset Blvd</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-hidden mask-fade-bottom">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-3"
                        >
                            <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-[10px] text-white shrink-0">AI</div>
                            <div className="bg-slate-800/80 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                                <p className="text-xs text-slate-200 leading-relaxed text-left">Hi John, I'm calling from Summit Realty. I saw you were interested in the Sunset Blvd property. Have you been looking long?</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 }}
                            className="flex gap-3 justify-end"
                        >
                            <div className="bg-white/10 rounded-2xl rounded-tr-none p-3 max-w-[80%]">
                                <p className="text-xs text-slate-300 leading-relaxed text-left font-sans">Yes, we've been searching for about 3 months now. We really need a 4-bedroom place.</p>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white shrink-0 font-sans italic">H</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5, repeat: Infinity, repeatDelay: 5 }}
                            className="flex gap-3"
                        >
                            <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-[10px] text-white shrink-0">AI</div>
                            <div className="bg-slate-800/80 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                                <p className="text-xs text-slate-200 leading-relaxed text-left">That's helpful! This property actually has a flex space that can be a 4th bedroom. Would you like to schedule a viewing tomorrow at 2 PM?</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-medium">Sentiment</span>
                                <span className="text-xs text-emerald-400 font-semibold font-sans">Highly Positive</span>
                            </div>
                            <div className="w-px h-8 bg-slate-800" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-medium">Topic</span>
                                <span className="text-xs text-slate-300 font-sans">Property Tour</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary/20 text-brand-primary rounded-lg text-xs font-semibold hover:bg-brand-primary/30 transition-colors font-sans">
                            View Details <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Badge Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="bg-brand-primary rounded-full p-4 shadow-2xl animate-bounce-slow">
                    <Play className="w-8 h-8 text-white fill-white" />
                </div>
            </div>
        </div>
    );
};
