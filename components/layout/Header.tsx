"use client";

import { Bell, ChevronDown, Menu, Moon, Sun, ArrowLeft, LogOut } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/shared/AuthProvider";

interface HeaderProps {
    onMenuClick: () => void;
    activeView: string;
}

export default function Header({ onMenuClick, activeView }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initial letters for avatar
    const getInitials = (name: string) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="h-20 bg-white/80 dark:bg-[#0c1d56]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-md text-slate-500 dark:text-slate-400 transition-colors">
                    <Menu size={20} />
                </button>

                {/* Brand / Breadcrumbs */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-1 text-slate-400 hover:text-[#0c1d56] dark:hover:text-white transition-all group"
                        title="Go Back"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    <h1 className="text-xl font-bold text-[#0c1d56] dark:text-white tracking-tight hidden sm:block">
                        Dashboard
                    </h1>
                    <div className="hidden md:flex items-center text-sm font-medium text-slate-400 dark:text-slate-500">
                        <span className="mx-2">/</span>
                        <span className="text-slate-500 dark:text-slate-300 capitalize">{activeView}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Profile */}
                <div className="relative mr-4" ref={dropdownRef}>
                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-1 cursor-pointer group"
                    >
                        <div className="w-8 h-8 bg-gradient-to-tr from-[#0c1d56] to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-white dark:ring-white/10 group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900 transition-all uppercase">
                            {user?.name ? getInitials(user.name) : user?.email ? user.email[0].toUpperCase() : "U"}
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-[#0c1d56] dark:text-white leading-none capitalize">{user?.name || user?.email?.split('@')[0] || "User"}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 capitalize">{user?.role || "Admin"}</p>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 dark:text-slate-500 group-hover:text-[#0c1d56] dark:group-hover:text-white transition-all ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0c1d56] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                            <div className="px-4 py-3 border-b border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">Account</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1 capitalize">{user?.name || user?.email?.split('@')[0] || "User"}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email || "No email"}</p>
                            </div>

                            <div className="p-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors group font-bold"
                                >
                                    <LogOut size={16} className="text-rose-400 group-hover:text-rose-600" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
