"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Phone, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/constants";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Invalid response format. If you see an ngrok warning, please visit the API URL directly and click 'Visit Site'.");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed. Please check your credentials.");
            }

            console.log("Login successful:", data);

            // Extract token from standard fields
            const token = data.token || data.access_token || data.accessToken || data.data?.token;
            if (token) {
                // Store in a cookie for the proxy to use
                document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
                console.log("Token stored in cookie");
            }

            window.location.href = "/dashboard";

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-display flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Main Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-6xl bg-white rounded-[1.5rem] shadow-[0_20px_60px_-15px_rgba(11,24,71,0.1)] overflow-hidden flex flex-col md:flex-row relative min-h-[650px]"
            >
                {/* Left Section - Pure Image */}
                <div className="hidden md:block md:w-[45%] relative">
                    <Image
                        src="/assets/login-side-v2.png"
                        alt="AI Network"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Subtle Overlay to blend with brand */}
                    <div className="absolute inset-0 bg-[#0b1847]/5" />

                    {/* Minimal Branding on Image */}
                    <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group z-20">
                        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-md">
                            <Phone className="w-5 h-5 text-[#0b1847]" />
                        </div>
                    </Link>
                </div>

                {/* Right Section - Elegant Login Form */}
                <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
                    <div className="max-w-sm mx-auto w-full">
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Admin Portal</h1>
                            <p className="text-slate-500 font-medium text-lg">Log in to manage your AI agents.</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-3"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    disabled={isLoading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@brokerage.com"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary/30 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300 font-medium text-base shadow-sm disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Password</label>
                                    <Link href="#" className="text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors">Forgot Password?</Link>
                                </div>
                                <input
                                    type="password"
                                    required
                                    disabled={isLoading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary/30 focus:bg-white transition-all text-slate-900 placeholder:text-slate-300 font-medium text-base shadow-sm disabled:opacity-50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4.5 bg-[#0b1847] text-white font-bold rounded-2xl hover:bg-[#13235d] shadow-lg shadow-[#0b1847]/10 hover:shadow-xl hover:shadow-[#0b1847]/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Authenticating...
                                    </div>
                                ) : (
                                    <>
                                        Sign in to Portal
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-slate-400 text-sm font-medium">
                                Don't have an account? <Link href="/get-started" className="text-[#0b1847] font-bold hover:text-brand-primary transition-colors">Request Access</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Background Decorative Element */}
            <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-brand-secondary/5 blur-[120px] rounded-full" />
            </div>
        </div>

    );
}
