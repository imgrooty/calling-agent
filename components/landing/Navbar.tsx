"use client";

import Link from "next/link";
import { Phone, ArrowRight, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "@/components/shared/ThemeProvider";

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 border-none pointer-events-none"
        >
            <div className="flex items-center justify-between w-full max-w-7xl px-6 py-3 glass dark:glass-dark rounded-full pointer-events-auto">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-brand-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
                        <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">CallAgent<span className="text-brand-primary">AI</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <Link href="#features" className="hover:text-brand-primary dark:hover:text-brand-primary transition-colors">Features</Link>
                    <Link href="#demo" className="hover:text-brand-primary dark:hover:text-brand-primary transition-colors">Solution</Link>
                    <Link href="#pricing" className="hover:text-brand-primary dark:hover:text-brand-primary transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <Link href="/login" className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary">Admin Login</Link>
                    <Link
                        href="/get-started"
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-full hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 transition-all active:scale-95"
                    >
                        Start Free
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};
