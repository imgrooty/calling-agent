"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export const FinalCTA = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary -z-10" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -z-0" />

            <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-display font-black mb-8">
                        Join 500+ Forward-Thinking Brokerages
                    </h2>
                    <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Stop losing leads to competitors who answer faster.
                        Automate your calling team today and see the results in 24 hours.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/login" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-10 py-5 bg-white text-brand-primary font-black rounded-full hover:bg-slate-50 hover:scale-105 transition-all shadow-2xl">
                                Start Your Free Trial
                            </button>
                        </Link>
                        <Link href="/login" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-10 py-5 bg-brand-primary border border-white/30 text-white font-black rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                Speak to an Expert
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="mt-24 pt-16 border-t border-white/10 max-w-7xl mx-auto px-6 text-white/60">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 text-white mb-6">
                            <div className="bg-white p-2 rounded-lg">
                                <Phone className="w-5 h-5 text-brand-primary" />
                            </div>
                            <span className="text-xl font-display font-bold tracking-tight">CallAgentAI</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Revolutionizing real estate lead qualification with human-like AI call agents.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Sales</Link></li>
                            <li><div className="flex items-center gap-4 mt-2">
                                <Twitter className="w-5 h-5 cursor-pointer hover:text-white" />
                                <Github className="w-5 h-5 cursor-pointer hover:text-white" />
                                <Linkedin className="w-5 h-5 cursor-pointer hover:text-white" />
                            </div></li>
                        </ul>
                    </div>
                </div>
                <div className="pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© 2026 CallAgentAI. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                        <Link href="#" className="hover:text-white">Cookie Policy</Link>
                    </div>
                </div>
            </footer>
        </section>
    );
};
