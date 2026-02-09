"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Phone, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Success - redirect to dashboard
            router.push("/dashboard");

        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0c1d56] flex items-center justify-center p-4 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-[#11224d] rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 min-h-[600px] border border-slate-100 dark:border-white/5"
            >
                {/* Left Side - Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center relative">
                    <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-[#0c1d56] dark:hover:text-white transition-colors flex items-center gap-2 group">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back</span>
                    </Link>

                    <div className="max-w-sm w-full mx-auto">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-[#0c1d56] dark:text-white mb-2">Welcome Back</h2>
                            <p className="text-slate-500 dark:text-slate-400">Enter your credentials to access your account.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm rounded-lg flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#0c1d56] dark:group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-[#0c1d56]/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#0c1d56]/20 dark:focus:ring-indigo-500/40 focus:border-[#0c1d56] dark:focus:border-indigo-500 transition-all outline-none"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                    <Link href="#" className="text-xs font-semibold text-[#0c1d56] dark:text-indigo-400 hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#0c1d56] dark:group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-[#0c1d56]/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#0c1d56]/20 dark:focus:ring-indigo-500/40 focus:border-[#0c1d56] dark:focus:border-indigo-500 transition-all outline-none"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-[#0c1d56]/20 dark:shadow-indigo-500/20 text-sm font-bold text-white bg-[#0c1d56] dark:bg-indigo-600 hover:bg-[#0a1845] dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c1d56] dark:focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Sign In <ArrowRight size={16} />
                                    </span>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Don't have an account?{' '}
                                <Link href="#" className="font-semibold text-[#0c1d56] dark:text-indigo-400 hover:underline">
                                    Contact Sales
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image/Brand */}
                <div className="relative hidden md:block bg-slate-900">
                    <Image
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Office"
                        fill
                        className="object-cover opacity-60 mix-blend-overlay"
                        priority
                    />
                    {/* Subtle Overlay to blend with brand */}
                    <div className="absolute inset-0 bg-[#0c1d56]/40 dark:bg-[#0c1d56]/60 backdrop-blur-[1px]" />

                    {/* Minimal Branding on Image */}
                    <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group z-20">
                        <div className="bg-white p-2 rounded-lg shadow-lg">
                            <Phone className="w-5 h-5 text-[#0c1d56]" />
                        </div>
                    </Link>

                    <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
                        <h3 className="text-3xl font-display font-bold mb-4">Scale your sales with AI Agents.</h3>
                        <p className="text-slate-200 text-lg leading-relaxed">
                            "Fagoon's AI agents have transformed our lead qualification process, resulting in a 300% increase in qualified appointments."
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm">
                                JD
                            </div>
                            <div>
                                <p className="font-semibold">John Doe</p>
                                <p className="text-sm text-indigo-200">VP of Sales, TechCorp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
