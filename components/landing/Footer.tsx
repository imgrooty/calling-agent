"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#0a0a0f] to-[#000000] text-white relative overflow-hidden pt-24 pb-12 border-t border-white/5">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_50%)]" />
            
            {/* Top Section */}
            <div className="max-w-[1520px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">

                    {/* Brand Column (Left) */}
                    <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div 
                                className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center"
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="text-white font-bold text-lg">C</span>
                            </motion.div>
                            <span className="text-2xl font-display font-bold">
                                CallingAgent<span className="text-gradient-ai">.AI</span>
                            </span>
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            The world's #1 AI Agent for Sales Automation. Close more deals while AI handles lead qualification calls 24/7.
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                            {[Linkedin, Twitter, Facebook, Mail].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-[#6366f1]/20 hover:to-[#8b5cf6]/20 hover:text-[#00d9ff] hover:border-[#00d9ff]/30 transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* Links Column 1 - Product */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Product</h4>
                        <ul className="flex flex-col gap-4">
                            {["AI Voice Agent", "Lead Qualification", "Appointment Setting", "Live Transfer", "Multilingual Support"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-300 hover:text-[#00d9ff] text-sm transition-colors relative group">
                                        {item}
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 - Who We Help */}
                    <div className="md:col-span-3 lg:col-span-3">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Who We Help</h4>
                        <ul className="flex flex-col gap-4">
                            {["Real Estate Brokers", "Property Managers", "Inside Sales Agents", "Wholesalers", "Loan Officers"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-300 hover:text-[#00d9ff] text-sm transition-colors relative group">
                                        {item}
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 3 - Company */}
                    <div className="md:col-span-3 lg:col-span-3">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Company</h4>
                        <ul className="flex flex-col gap-4">
                            {["Our Story", "Careers", "Blog", "Press Kit", "Contact Support"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-300 hover:text-[#00d9ff] text-sm transition-colors relative group">
                                        {item}
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500 font-medium">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <span>More</span>
                        <Link href="#" className="hover:text-gray-300 transition-colors">Blog</Link>
                        <Link href="#" className="hover:text-gray-300 transition-colors">FAQs & Support</Link>
                        <Link href="#" className="hover:text-gray-300 transition-colors">Contact Us</Link>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <span>© 2026 CallingAgent.AI. All rights reserved.</span>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Giant Watermark Text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none w-full flex justify-center overflow-hidden">
                <span className="text-[12rem] md:text-[20rem] font-black text-gradient-ai opacity-[0.03] leading-[0.8] tracking-tighter whitespace-nowrap">
                    AI POWERED
                </span>
                <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
            </div>
        </footer>
    );
};
