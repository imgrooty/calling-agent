"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Phone,
    Calendar,
    Search,
    Zap,
} from "lucide-react";

// Types
interface CallDay {
    date: string;
    completed_calls: number;
}

interface RecentCall {
    call_id: string;
    lead_name: string | null;
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

export default function DashboardOverview() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [logFilter, setLogFilter] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats');
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch dashboard statistics");
                }

                setData(result);
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
            <div className="h-96 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-slate-200 dark:border-white/10 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold tracking-wide">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-500/10 dark:to-rose-600/10 p-8 rounded-2xl border border-rose-200 dark:border-rose-500/20 text-center backdrop-blur-sm shadow-lg">
                <Zap className="w-10 h-10 text-rose-600 dark:text-rose-400 mx-auto mb-3" />
                <h3 className="text-rose-900 dark:text-rose-300 font-bold text-lg">Error Loading Statistics</h3>
                <p className="text-rose-700 dark:text-rose-400 text-sm mt-2 font-medium">{error}</p>
            </div>
        );
    }

    // Filter recent calls based on search input
    const filteredCalls = data?.recent_calls.filter(call => {
        if (!logFilter) return true;
        const searchTerm = logFilter.toLowerCase();
        return (
            call.lead_name?.toLowerCase().includes(searchTerm) ||
            call.status.toLowerCase().includes(searchTerm) ||
            call.property_discussed?.toLowerCase().includes(searchTerm)
        );
    }) || [];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Desktop View */}
            <div className="hidden md:block space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Total Leads"
                        value={data?.total_leads.toString() || "0"}
                        trend={data?.leads_trend.growth_rate || 0}
                        icon={<Users className="w-5 h-5" />}
                        color="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    />
                    <MetricCard
                        title="Calls Handled"
                        value={data?.total_calls.toString() || "0"}
                        trend={data?.calls_trend.growth_rate || 0}
                        icon={<Phone className="w-5 h-5" />}
                        color="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    />
                    <MetricCard
                        title="Scheduled Visits"
                        value={data?.scheduled_calls.toString() || "0"}
                        trend={12.5}
                        icon={<Calendar className="w-5 h-5" />}
                        color="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    />
                    <MetricCard
                        title="Conversion Rate"
                        value="--"
                        trend={0}
                        icon={<Zap className="w-5 h-5" />}
                        color="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50/30 dark:from-[#11224d]/90 dark:to-[#0c1d56]/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-[#0c1d56] dark:text-white tracking-tight">Call Volume</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">Last 7 days activity</p>
                            </div>
                        </div>
                        <div className="h-[240px] w-full">
                            <ActivityChart data={data?.daily_calls_completed || []} isMobile={false} />
                        </div>
                    </div>

                    {/* Sentiment */}
                    <div className="bg-gradient-to-br from-white to-slate-50/30 dark:from-[#11224d]/90 dark:to-[#0c1d56]/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
                        <h3 className="text-lg font-bold text-[#0c1d56] dark:text-white tracking-tight mb-1">Sentiment Analysis</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-8">Aggregate call tone</p>

                        <div className="flex-1 flex flex-col justify-center space-y-5">
                            <SentimentMeter label="Positive" value={data?.sentiment_distribution.positive || 0} total={data?.total_calls || 1} color="bg-emerald-500" />
                            <SentimentMeter label="Neutral" value={data?.sentiment_distribution.neutral || 0} total={data?.total_calls || 1} color="bg-slate-400 dark:bg-slate-600" />
                            <SentimentMeter label="Negative" value={data?.sentiment_distribution.negative || 0} total={data?.total_calls || 1} color="bg-rose-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-8">
                {/* Header */}
                <div className="relative">
                    <h2 className="text-2xl font-black text-[#0c1d56] dark:text-white uppercase tracking-tight">Dashboard</h2>
                    <div className="h-1.5 w-12 bg-gradient-to-r from-[#0c1d56] to-indigo-500 dark:from-indigo-400 dark:to-indigo-600 rounded-full mt-2 shadow-lg shadow-indigo-500/50"></div>
                </div>

                {/* Metrics Grid Mobile - 2 columns */}
                <div className="grid grid-cols-2 gap-4">
                    <MetricCard
                        title="Leads"
                        value={data?.total_leads.toString() || "0"}
                        trend={data?.leads_trend.growth_rate || 0}
                        icon={<Users size={18} />}
                        color="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                        isMobile
                    />
                    <MetricCard
                        title="Calls"
                        value={data?.total_calls.toString() || "0"}
                        trend={data?.calls_trend.growth_rate || 0}
                        icon={<Phone size={18} />}
                        color="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        isMobile
                    />
                    <MetricCard
                        title="Visits"
                        value={data?.scheduled_calls.toString() || "0"}
                        trend={12.5}
                        icon={<Calendar size={18} />}
                        color="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        isMobile
                    />
                    <MetricCard
                        title="CTR"
                        value="--"
                        trend={0}
                        icon={<Zap size={18} />}
                        color="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                        isMobile
                    />
                </div>

                {/* Chart Section Mobile */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-[11px] font-black text-indigo-900/40 dark:text-indigo-300/40 uppercase tracking-widest">Call Volume</span>
                    </div>
                    <div className="bg-gradient-to-br from-white to-slate-50/50 dark:from-[#11224d] dark:to-[#0c1d56] p-7 rounded-[28px] border border-slate-200/60 dark:border-white/10 shadow-xl">
                        <div className="h-[180px] w-full">
                            <ActivityChart data={data?.daily_calls_completed || []} isMobile />
                        </div>
                    </div>
                </div>

                {/* Sentiment Mobile */}
                <div className="bg-gradient-to-br from-[#0c1d56] to-indigo-900 dark:from-white/10 dark:to-white/5 p-8 rounded-[32px] text-white space-y-6 shadow-2xl shadow-indigo-950/30 border border-indigo-800/50 dark:border-white/10 backdrop-blur-sm">
                    <div>
                        <span className="text-[11px] font-black text-indigo-300 dark:text-slate-400 uppercase tracking-widest">Insight Engine</span>
                        <h3 className="text-xl font-black mt-2">Lead Sentiment</h3>
                    </div>
                    <div className="space-y-6">
                        <SentimentMeter label="Positive" value={data?.sentiment_distribution.positive || 0} total={data?.total_calls || 1} color="bg-emerald-400" isMobile />
                        <SentimentMeter label="Neutral" value={data?.sentiment_distribution.neutral || 0} total={data?.total_calls || 1} color="bg-indigo-400/60 dark:bg-slate-500" isMobile />
                        <SentimentMeter label="Negative" value={data?.sentiment_distribution.negative || 0} total={data?.total_calls || 1} color="bg-rose-400" isMobile />
                    </div>
                </div>
            </div>

            {/* Desktop Recent Calls Data Grid */}
            <div className="hidden md:block bg-gradient-to-br from-white to-slate-50/30 dark:from-[#11224d]/90 dark:to-[#0c1d56]/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-white/10 shadow-xl overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-white/5 dark:to-transparent">
                    <h3 className="text-base font-bold text-[#0c1d56] dark:text-white whitespace-nowrap tracking-tight">Recent Activity</h3>
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Filter logs..."
                            aria-label="Filter recent activity logs"
                            value={logFilter}
                            onChange={(e) => setLogFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0c1d56]/50 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-medium focus:bg-white dark:focus:bg-[#0c1d56] focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none dark:text-white dark:placeholder-slate-400 shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-50/50 dark:from-white/5 dark:to-transparent border-b border-slate-200/60 dark:border-white/10">
                                <th className="px-8 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Lead</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Type</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Duration</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredCalls.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-16 text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        {logFilter ? 'No matching calls found.' : 'No calls recorded yet.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredCalls.map((call) => (
                                    <tr key={call.call_id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-500/20 dark:to-indigo-600/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shadow-sm border border-indigo-200/50 dark:border-indigo-500/20">
                                                    {(call.lead_name || '?').charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-[#0c1d56] dark:text-white">{call.lead_name || 'Unknown Lead'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{call.property_discussed ? 'Property Inquiry' : 'General Inquiry'}</span>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-400 font-bold tabular-nums">
                                                {Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s
                                            </span>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border shadow-sm ${call.status === 'completed'
                                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                : 'bg-slate-100 text-slate-600 border-slate-200/50 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-700/50'
                                                }`}>
                                                {call.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <span className="text-sm text-slate-600 dark:text-slate-400 tabular-nums font-medium">
                                                {new Date(call.call_start_time).toLocaleDateString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Recent Logs */}
            <div className="md:hidden space-y-4 pb-12">
                <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-black text-indigo-900/40 dark:text-indigo-300/40 uppercase tracking-widest">Recent Activity</span>
                </div>
                {filteredCalls.length === 0 ? (
                    <div className="text-center py-16 text-indigo-900/40 dark:text-indigo-300/40 uppercase tracking-widest text-[10px] font-black">No calls recorded</div>
                ) : (
                    filteredCalls.map((call) => (
                        <div key={call.call_id} className="bg-gradient-to-br from-white to-slate-50/50 dark:from-[#11224d] dark:to-[#0c1d56] rounded-[28px] p-5 border border-slate-200/60 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-500/20 dark:to-indigo-600/20 rounded-2xl flex items-center justify-center font-black text-indigo-700 dark:text-indigo-300 text-sm shadow-sm border border-indigo-200/50 dark:border-indigo-500/20">
                                    {(call.lead_name || '?').charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-[#0c1d56] dark:text-white truncate max-w-[140px]">{call.lead_name || 'Unknown Lead'}</h4>
                                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-bold tracking-tight mt-1">{new Date(call.call_start_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wide shadow-sm ${call.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-slate-100 text-slate-600 border border-slate-200/50 dark:bg-white/5 dark:text-slate-300 dark:border-white/10'}`}>
                                    {call.status}
                                </span>
                                <span className="text-[11px] font-black text-[#0c1d56] dark:text-slate-400 tabular-nums">{Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

// --- Subcomponents ---

function MetricCard({ title, value, trend, icon, color, isMobile }: any) {
    if (isMobile) {
        return (
            <div className="bg-gradient-to-br from-white to-slate-50/50 dark:from-[#11224d] dark:to-[#0c1d56] p-5 rounded-[24px] border border-slate-200/60 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between aspect-[1.5/1] active:scale-[0.97] overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/30 to-blue-100/30 dark:from-white/5 dark:to-indigo-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-125 duration-500" />
                <div className="flex items-start justify-between relative z-10">
                    <div className={`p-3 rounded-[18px] ${color} shadow-md backdrop-blur-sm`}>
                        {icon}
                    </div>
                    {trend !== 0 && (
                        <div className={`px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold flex items-center gap-1 shadow-sm backdrop-blur-sm ${trend > 0 ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300' : 'bg-rose-100/80 text-rose-700 dark:bg-rose-400/20 dark:text-rose-300'}`}>
                            {trend > 0 ? '↑' : '↓'}{Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div className="relative z-10 flex items-center justify-between mt-auto">
                    <div className="text-xs text-slate-600 dark:text-slate-300 uppercase font-bold tracking-wide truncate mr-2">{title}</div>
                    <div className="text-2xl font-black text-[#0c1d56] dark:text-white tracking-tight leading-none">{value}</div>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-gradient-to-br from-white to-slate-50/30 dark:from-[#11224d]/90 dark:to-[#0c1d56]/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between h-36 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-50/20 to-blue-50/20 dark:from-transparent dark:via-white/5 dark:to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-start justify-between relative z-10">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 tracking-wide">{title}</span>
                <div className={`p-2.5 rounded-xl ${color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                    {icon}
                </div>
            </div>
            <div className="flex items-end justify-between mt-4 relative z-10">
                <span className="text-4xl font-black text-[#0c1d56] dark:text-white tracking-tight">{value}</span>
                {trend !== 0 && (
                    <div className={`flex items-center gap-1 text-sm font-bold ${trend > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {trend > 0 ? '↑' : '↓'}{Math.abs(trend)}%
                    </div>
                )}
            </div>
        </div>
    );
}

function ActivityChart({ data, isMobile }: { data: CallDay[], isMobile?: boolean }) {
    if (!data.length) return null;

    const max = Math.max(...data.map(d => d.completed_calls), 5);
    const normalizedData = data.map(d => ({
        ...d,
        height: (d.completed_calls / max) * 100
    }));

    const colors = [
        'bg-gradient-to-t from-[#0c1d56] to-indigo-600 dark:from-indigo-600 dark:to-indigo-400',
        'bg-gradient-to-t from-indigo-500 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300',
        'bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-500 dark:to-blue-300',
        'bg-gradient-to-t from-emerald-500 to-emerald-400 dark:from-emerald-500 dark:to-emerald-300',
        'bg-gradient-to-t from-amber-500 to-amber-400 dark:from-amber-500 dark:to-amber-300',
        'bg-gradient-to-t from-rose-500 to-rose-400 dark:from-rose-500 dark:to-rose-300',
        'bg-gradient-to-t from-violet-500 to-violet-400 dark:from-violet-500 dark:to-violet-300'
    ];

    return (
        <div className="w-full h-full flex items-end justify-between gap-2 pt-4">
            {normalizedData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-default">
                    <div className="w-full relative h-full flex items-end justify-center">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(d.height, 8)}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                            className={`w-[65%] ${colors[i % colors.length]} rounded-t-xl transition-all duration-300 relative shadow-lg hover:shadow-xl border-t-2 border-white/20`}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0c1d56] dark:bg-white text-white dark:text-[#0c1d56] text-[11px] font-black px-3 py-2 rounded-xl shadow-2xl pointer-events-none whitespace-nowrap z-20 transition-all transform group-hover:-translate-y-1">
                                {d.completed_calls} Calls
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0c1d56] dark:bg-white rotate-45"></div>
                            </div>
                        </motion.div>
                    </div>
                    <span className={`text-[11px] transition-colors uppercase tracking-tight text-center font-bold ${isMobile ? 'text-[#0c1d56]/40 dark:text-white/30' : 'text-slate-600 dark:text-slate-400'}`}>
                        {new Date(d.date).toLocaleDateString(undefined, { weekday: isMobile ? 'short' : 'long' })}
                    </span>
                </div>
            ))}
        </div>
    );
}

function SentimentMeter({ label, value, total, color, isMobile }: any) {
    const percentage = Math.round((value / total) * 100);

    if (isMobile) {
        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-indigo-200 dark:text-slate-300 uppercase tracking-wide">{label}</span>
                    <span className="text-white text-base font-black">{percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${color} shadow-lg`}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 w-16">{label}</span>
            <div className="flex-1 h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${color} shadow-md`}
                />
            </div>
            <span className="text-sm font-bold text-[#0c1d56] dark:text-white w-12 text-right tabular-nums">{percentage}%</span>
        </div>
    );
}
