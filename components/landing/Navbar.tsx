"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#demo", label: "Solution" },
        { href: "#pricing", label: "Pricing" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none"
        >
            <div className="flex flex-col w-full max-w-7xl pointer-events-auto">
                <motion.div 
                    className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
                        scrolled ? 'glass shadow-2xl shadow-[#6366f1]/10' : 'glass-dark'
                    }`}
                    animate={{
                        backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
                    }}
                >
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div 
                            className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-2 rounded-lg group-hover:rotate-12 transition-transform relative overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Phone className="w-5 h-5 text-white relative z-10" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6] to-[#6366f1]"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                            />
                        </motion.div>
                        <span className="text-xl font-display font-bold tracking-tight text-white">
                            CallingAgent<span className="text-gradient-ai">.AI</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href} 
                                className="hover:text-[#00d9ff] transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="hidden lg:block text-sm font-medium text-gray-300 hover:text-[#00d9ff] transition-colors">
                            Admin Login
                        </Link>
                        <Link
                            href="/login"
                            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-[#6366f1]/50 transition-all active:scale-95 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Start Free</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-300 hover:bg-white/10 rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </motion.div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="mt-4 p-6 glass rounded-3xl flex flex-col gap-6 md:hidden border border-white/10 shadow-2xl shadow-[#6366f1]/10"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-semibold text-white border-b border-white/10 pb-2 hover:text-[#00d9ff] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 mt-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-center py-3 text-gray-300 font-medium hover:text-[#00d9ff] transition-colors"
                                >
                                    Admin Login
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold rounded-2xl shadow-xl shadow-[#6366f1]/20 hover:shadow-2xl hover:shadow-[#6366f1]/40 transition-all"
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
