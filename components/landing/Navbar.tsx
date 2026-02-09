"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#demo", label: "Solution" },
        { href: "#pricing", label: "Pricing" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 border-none pointer-events-none"
        >
            <div className="flex flex-col w-full max-w-7xl pointer-events-auto">
                <div className="flex items-center justify-between px-6 py-3 glass dark:glass-dark rounded-full">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-brand-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
                            <Phone className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">CallAgent<span className="text-brand-primary">AI</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="hidden lg:block text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary">
                            Admin Login
                        </Link>
                        <Link
                            href="/login"
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-full hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 transition-all active:scale-95"
                        >
                            Start Free
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="mt-4 p-6 glass dark:glass-dark rounded-3xl flex flex-col gap-6 md:hidden border border-white/10 dark:border-white/5"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-2"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 mt-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-center py-3 text-slate-600 dark:text-slate-300 font-medium"
                                >
                                    Admin Login
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-xl shadow-brand-primary/20"
                                >
                                    Start Free
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};
