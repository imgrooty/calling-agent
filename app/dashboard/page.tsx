"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Phone,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    MoreHorizontal,
    Search,
    LayoutDashboard,
    Settings,
    LogOut,
    Menu,
    X,
    Filter,
    BarChart3
} from "lucide-react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/constants";

// Types based on the backend response
interface CallDay {
    date: string;
    completed_calls: number;
}

interface RecentCall {
    call_id: string;
    lead_name: string;
    call_start_time: string;
    duration_seconds: number;
    status: string;
    property_discussed: string | null;
    visit_scheduled_time: string;
}

interface DashboardData {
    total_leads: number;
    total_calls: number;
    scheduled_calls: number;
    daily_calls_completed: CallDay[];
    sentiment_distribution: {
        positive: number;
        negative: number;
        neutral: number;
    };
    recent_calls: RecentCall[];
    leads_trend: {
        growth_rate: number;
    };
    calls_trend: {
        growth_rate: number;
    };
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch from our local proxy instead of the ngrok URL
                const response = await fetch('/api/stats');

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch dashboard statistics");
                }

                setData(data);
            } catch (err: any) {
                console.error("Dashboard fetch error:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#0b1847]/10 border-t-[#0b1847] rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <X className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">System Connection Error</h2>
                    <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                        {error}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-4 bg-[#0b1847] text-white font-bold rounded-2xl hover:bg-[#13235d] shadow-lg shadow-[#0b1847]/10 transition-all active:scale-[0.98]"
                    >
                        Try refreshing page
                    </button>
                </div>
            </div>
        );
    }

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-display text-slate-900 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex flex-col w-72 bg-[#0b1847] text-white p-8 fixed h-full z-50">
                <div className="flex items-center gap-3 mb-12">
                    <div className="bg-brand-primary p-2 rounded-xl">
                        <Phone className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">CallAgentAI</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <SidebarLink icon={<Users size={20} />} label="Leads" />
                    <SidebarLink icon={<Phone size={20} />} label="Call Logs" />
                    <SidebarLink icon={<BarChart3 size={20} />} label="Analytics" />
                    <SidebarLink icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="mt-auto border-t border-white/10 pt-8">
                    <button className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-medium">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-[#0b1847]/60 backdrop-blur-md z-[60] lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="w-72 bg-[#0b1847] h-full p-8 flex flex-col relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-8 right-6 text-white/40 hover:text-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-3 mb-12">
                            <div className="bg-brand-primary p-2 rounded-xl">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">CallAgentAI</span>
                        </div>

                        <nav className="flex-1 space-y-2">
                            <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active />
                            <SidebarLink icon={<Users size={20} />} label="Leads" />
                            <SidebarLink icon={<Phone size={20} />} label="Call Logs" />
                            <SidebarLink icon={<BarChart3 size={20} />} label="Analytics" />
                            <SidebarLink icon={<Settings size={20} />} label="Settings" />
                        </nav>

                        <div className="mt-auto border-t border-white/10 pt-8">
                            <button className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-medium">
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </motion.aside>
                </div>
            )}

            <main className="flex-1 lg:ml-72 min-h-screen">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-[#0b1847]">Organization Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search records..."
                                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#0b1847]/5 transition-all w-64"
                            />
                        </div>
                        <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center font-bold">
                            AS
                        </div>
                    </div>
                </header>

                <div className="p-6 sm:p-10 space-y-10 max-w-[1600px] mx-auto">
                    {/* Welcome Section */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <p className="text-slate-500 font-medium mb-1 uppercase tracking-widest text-[11px]">System Status: Online</p>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Admin</h2>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
                                <Filter size={16} />
                                Filters
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0b1847] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#0b1847]/20 hover:bg-[#13235d] transition-all">
                                <Plus size={16} />
                                New Campaign
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard
                            title="Total Leads"
                            value={data?.total_leads.toString() || "0"}
                            trend={data?.leads_trend.growth_rate || 0}
                            icon={<Users className="text-indigo-500" />}
                        />
                        <StatCard
                            title="Calls Handled"
                            value={data?.total_calls.toString() || "0"}
                            trend={data?.calls_trend.growth_rate || 0}
                            icon={<Phone className="text-sky-500" />}
                        />
                        <StatCard
                            title="Scheduled Visits"
                            value={data?.scheduled_calls.toString() || "0"}
                            trend={0}
                            icon={<Calendar className="text-emerald-500" />}
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Daily Activity Chart */}
                        <div className="xl:col-span-2 bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Call Activity</h3>
                                    <p className="text-sm text-slate-500 font-medium">Volume of handled calls over time</p>
                                </div>
                                <select className="text-xs font-bold border-none bg-slate-50 rounded-lg p-2 outline-none">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                </select>
                            </div>

                            {/* Custom SVG Bar Chart */}
                            <div className="h-64 flex items-end justify-between gap-4 px-2">
                                {data?.daily_calls_completed.map((day, idx) => {
                                    const maxCalls = Math.max(...data.daily_calls_completed.map(d => d.completed_calls), 10);
                                    const height = (day.completed_calls / maxCalls) * 100;
                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center gap-4 group">
                                            <div className="w-full relative">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${height}%` }}
                                                    className="w-full min-h-[4px] bg-gradient-to-t from-brand-primary to-indigo-400 rounded-t-lg group-hover:from-indigo-400 group-hover:to-brand-primary transition-all duration-500 relative cursor-pointer"
                                                >
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0b1847] text-white py-1 px-2 rounded-md text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {day.completed_calls}
                                                    </div>
                                                </motion.div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Sentiment Breakdown */}
                        <div className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Sentiment Sentiment</h3>
                            <p className="text-sm text-slate-500 font-medium mb-8">Overall customer reception</p>

                            <div className="space-y-6">
                                <SentimentBar label="Positive" count={data?.sentiment_distribution.positive || 0} total={data?.total_calls || 1} color="bg-emerald-500" />
                                <SentimentBar label="Neutral" count={data?.sentiment_distribution.neutral || 0} total={data?.total_calls || 1} color="bg-slate-400" />
                                <SentimentBar label="Negative" count={data?.sentiment_distribution.negative || 0} total={data?.total_calls || 1} color="bg-rose-500" />
                            </div>

                            <div className="mt-10 p-6 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-xl font-extrabold text-[#0b1847]">Healthy</p>
                                </div>
                                <CheckCircle2 className="text-emerald-500 w-10 h-10" />
                            </div>
                        </div>
                    </div>

                    {/* Recent Calls Table */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900">Recent Call Logs</h3>
                            <button className="text-brand-primary font-bold text-sm hover:underline">View All Records</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Lead Name</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Property</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {data?.recent_calls.map((call, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                                                        {call.lead_name.charAt(0)}
                                                    </div>
                                                    <span className="font-bold text-slate-900">{call.lead_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-medium text-slate-600">
                                                {formatDate(call.call_start_time)}
                                            </td>
                                            <td className="px-8 py-6 font-medium text-slate-600">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} className="text-slate-300" />
                                                    {formatDuration(call.duration_seconds)}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-medium text-slate-400 italic">
                                                {call.property_discussed || "General Inquiry"}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                                                    {call.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {data?.recent_calls.length === 0 && (
                                <div className="p-20 text-center">
                                    <p className="text-slate-400 font-medium">No calls recorded yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function SidebarLink({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-medium ${active ? 'bg-white/10 text-white shadow-lg shadow-black/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
            {icon}
            {label}
        </button>
    );
}

function StatCard({ title, value, trend, icon }: { title: string, value: string, trend: number, icon: any }) {
    return (
        <div className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-start justify-between">
                <div className="p-3 bg-slate-50 rounded-2xl">
                    {icon}
                </div>
                {trend !== 0 && (
                    <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${trend > 0 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                        {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</p>
                <p className="text-4xl font-extrabold text-[#0b1847]">{value}</p>
            </div>
        </div>
    );
}

function SentimentBar({ label, count, total, color }: { label: string, count: number, total: number, color: string }) {
    const percentage = Math.round((count / total) * 100);
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>{label}</span>
                <span>{percentage}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full ${color} rounded-full`}
                />
            </div>
        </div>
    );
}

function Plus({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    )
}
