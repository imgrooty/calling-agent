"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, Instagram } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-black text-white relative overflow-hidden pt-24 pb-12">
            {/* Top Section */}
            <div className="max-w-[1520px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">

                    {/* Brand Column (Left) */}
                    <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            {/* Placeholder Logo or Text */}
                            <div className="w-10 h-10 bg-white rounded-full" />
                            <span className="text-2xl font-display font-bold">Fagoon</span>
                        </Link>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            The world's #1 AI Agent for Real Estate. Automate lead qualification, schedule appointments, and close 3x more deals without lifting a finger.
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                            {[Linkedin, Twitter, Facebook, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* Links Column 1 - Find / Product */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Product</h4>
                        <ul className="flex flex-col gap-4">
                            {["AI Voice Agent", "Lead Qualification", "Appointment Setting", "Live Transfer", "Multilingual Support"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 - Who We Help */}
                    <div className="md:col-span-3 lg:col-span-3">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Who We Help</h4>
                        <ul className="flex flex-col gap-4">
                            {["Real Estate Brokers", "Property Managers", "Inside Sales Agents", "Wholesalers", "Loan Officers"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 3 - Services / Company */}
                    <div className="md:col-span-3 lg:col-span-3">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Company</h4>
                        <ul className="flex flex-col gap-4">
                            {["Our Story", "Careers", "Blog", "Press Kit", "Contact Support"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500 font-medium">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <span>More</span>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Blog</Link>
                        <Link href="#" className="hover:text-slate-300 transition-colors">FAQs & Support</Link>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Contact Us</Link>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <span>© 2026 Fagoon AI. All rights reserved.</span>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Giant Watermark Text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none w-full flex justify-center overflow-hidden">
                <span className="text-[12rem] md:text-[20rem] font-black text-white/[0.03] leading-[0.8] tracking-tighter whitespace-nowrap">
                    FAGOON
                </span>
                {/* Gradient fade similar to reference */}
                <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
            </div>
        </footer>
    );
};
