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
                <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Loading stats...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-rose-50 dark:bg-rose-500/10 p-6 rounded-xl border border-rose-200 dark:border-rose-500/20 text-center">
                <Zap className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <h3 className="text-rose-900 dark:text-rose-400 font-semibold">Error Loading Statistics</h3>
                <p className="text-rose-600 dark:text-rose-500 text-sm mt-1">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Desktop View */}
            <div className="hidden md:block space-y-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#11224d]/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-md font-semibold text-[#0c1d56] dark:text-white">Call Volume</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Last 7 days activity</p>
                            </div>
                        </div>
                        <div className="h-[240px] w-full">
                            <ActivityChart data={data?.daily_calls_completed || []} isMobile={false} />
                        </div>
                    </div>

                    {/* Sentiment */}
                    <div className="bg-white dark:bg-[#11224d]/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col">
                        <h3 className="text-md font-semibold text-[#0c1d56] dark:text-white mb-1">Sentiment Analysis</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Aggregate call tone</p>

                        <div className="flex-1 flex flex-col justify-center space-y-4">
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
                <div>
                    <h2 className="text-xl font-black text-[#0c1d56] dark:text-white uppercase">Dashboard</h2>
                    <div className="h-1 w-8 bg-[#0c1d56] dark:bg-indigo-500 rounded-full mt-1"></div>
                </div>

                {/* Metrics Grid Mobile - 2 columns */}
                <div className="grid grid-cols-2 gap-3">
                    <MetricCard
                        title="Leads"
                        value={data?.total_leads.toString() || "0"}
                        trend={data?.leads_trend.growth_rate || 0}
                        icon={<Users size={16} />}
                        color="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                        isMobile
                    />
                    <MetricCard
                        title="Calls"
                        value={data?.total_calls.toString() || "0"}
                        trend={data?.calls_trend.growth_rate || 0}
                        icon={<Phone size={16} />}
                        color="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        isMobile
                    />
                    <MetricCard
                        title="Visits"
                        value={data?.scheduled_calls.toString() || "0"}
                        trend={12.5}
                        icon={<Calendar size={16} />}
                        color="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        isMobile
                    />
                    <MetricCard
                        title="CTR"
                        value="--"
                        trend={0}
                        icon={<Zap size={16} />}
                        color="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                        isMobile
                    />
                </div>

                {/* Chart Section Mobile */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-bold text-indigo-900/40 dark:text-indigo-300/40 uppercase tracking-widest">Global Activity</span>
                    </div>
                    <div className="bg-white dark:bg-[#11224d] p-6 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm">
                        <div className="h-[180px] w-full">
                            <ActivityChart data={data?.daily_calls_completed || []} isMobile />
                        </div>
                    </div>
                </div>

                {/* Sentiment Mobile */}
                <div className="bg-[#0c1d56] dark:bg-white/5 p-7 rounded-[40px] text-white space-y-6 shadow-xl shadow-indigo-950/20">
                    <div>
                        <span className="text-[10px] font-bold text-indigo-300 dark:text-slate-400 uppercase tracking-widest">Insight Engine</span>
                        <h3 className="text-xl font-bold mt-1">Lead Sentiment</h3>
                    </div>
                    <div className="space-y-6">
                        <SentimentMeter label="Positive" value={data?.sentiment_distribution.positive || 0} total={data?.total_calls || 1} color="bg-emerald-400" isMobile />
                        <SentimentMeter label="Neutral" value={data?.sentiment_distribution.neutral || 0} total={data?.total_calls || 1} color="bg-indigo-400/60 dark:bg-slate-500" isMobile />
                        <SentimentMeter label="Negative" value={data?.sentiment_distribution.negative || 0} total={data?.total_calls || 1} color="bg-rose-400" isMobile />
                    </div>
                </div>
            </div>

            {/* Desktop Recent Calls Data Grid */}
            <div className="hidden md:block bg-white dark:bg-[#11224d]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-[#0c1d56] dark:text-white whitespace-nowrap">Recent Logs</h3>
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Filter logs..."
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0c1d56]/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:bg-white dark:focus:bg-[#0c1d56] focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none dark:text-white dark:placeholder-slate-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                <th className="px-6 py-4 text-lg font-semibold text-slate-700 dark:text-slate-600 ">Lead</th>
                                <th className="px-6 py-4 text-lg font-semibold text-slate-700 dark:text-slate-600 ">Type</th>
                                <th className="px-6 py-4 text-lg font-semibold text-slate-700 dark:text-slate-600 ">Duration</th>
                                <th className="px-6 py-4 text-lg font-semibold text-slate-700 dark:text-slate-600 ">Status</th>
                                <th className="px-6 py-4 text-lg font-semibold text-slate-700 dark:text-slate-600  text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {data?.recent_calls.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                                        No calls recorded yet.
                                    </td>
                                </tr>
                            ) : (
                                data?.recent_calls.map((call, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-md">
                                                    {(call.lead_name || '?').charAt(0)}
                                                </div>
                                                <span className="text-md font-medium text-[#0c1d56] dark:text-white">{call.lead_name || 'Unknown Lead'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-md text-slate-700 dark:text-slate-300">{call.property_discussed ? 'Property Inquiry' : 'General Inquiry'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-md text-slate-600 dark:text-slate-400 font-medium tabular-nums">
                                                {Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium border ${call.status === 'completed'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                : 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-700/50'
                                                }`}>
                                                {call.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-md text-slate-600 dark:text-slate-400 tabular-nums">
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
                    <span className="text-[10px] font-bold text-indigo-900/40 dark:text-indigo-300/40 uppercase tracking-widest">Operational History</span>
                </div>
                {data?.recent_calls.length === 0 ? (
                    <div className="text-center py-12 text-indigo-900/30 uppercase tracking-widest text-[9px] font-bold">No calls recorded</div>
                ) : (
                    data?.recent_calls.map((call, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#11224d] rounded-[24px] p-4 border border-slate-100 dark:border-white/5 shadow-sm flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-400 text-sm">
                                    {(call.lead_name || '?').charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#0c1d56] dark:text-white truncate max-w-[120px]">{call.lead_name || 'Unknown Lead'}</h4>
                                    <p className="text-[10px] text-indigo-900/50 dark:text-indigo-300/40 font-bold uppercase tracking-tighter mt-0.5">{new Date(call.call_start_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5">
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${call.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-none' : 'bg-slate-50 text-indigo-900/40 border border-slate-200/50 dark:bg-white/5 dark:border-none'}`}>
                                    {call.status}
                                </span>
                                <span className="text-[10px] font-black text-[#0c1d56] dark:text-indigo-300/50">{Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s</span>
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
            <div className="bg-white dark:bg-[#11224d] p-4 rounded-[20px] border border-slate-100 dark:border-white/5 shadow-sm flex flex-col justify-between aspect-[1.5/1] active:scale-[0.98] transition-transform overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 dark:bg-white/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
                <div className="flex items-start justify-between relative z-10">
                    <div className={`p-2.5 rounded-2xl ${color} shadow-sm`}>
                        {icon}
                    </div>
                    {trend !== 0 && (
                        <div className={`px-2 py-1 rounded-lg text-[9px] font-black flex items-center gap-0.5 ${trend > 0 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10' : 'bg-rose-50 text-rose-600 dark:bg-rose-400/10'}`}>
                            {trend > 0 ? '↑' : '↓'}{Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div className="relative z-10 flex items-center justify-between mt-auto">
                    <div className="text-[11px] text-slate-700 dark:text-indigo-300/40 uppercase font-black truncate mr-2">{title}</div>
                    <div className="text-xl font-black text-[#0c1d56] dark:text-white tracking-tighter leading-none">{value}</div>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white dark:bg-[#11224d]/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32 md:h-36 group">
            <div className="flex items-start justify-between">
                <span className="text-md font-semibold text-slate-700 dark:text-slate-400">{title}</span>
                <div className={`p-2 rounded-lg ${color} group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
            </div>
            <div className="flex items-end justify-between mt-4">
                <span className="text-4xl font-bold text-[#0c1d56] dark:text-white tracking-tight">{value}</span>
                {trend !== 0 && (
                    <div className={`flex items-center gap-0.5 text-xs font-bold ${trend > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
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
        'bg-[#0c1d56] dark:bg-indigo-500',
        'bg-indigo-500 dark:bg-indigo-400',
        'bg-blue-500 dark:bg-blue-400',
        'bg-emerald-500 dark:bg-emerald-400',
        'bg-amber-500 dark:bg-amber-400',
        'bg-rose-500 dark:bg-rose-400',
        'bg-violet-500 dark:bg-violet-400'
    ];

    return (
        <div className="w-full h-full flex items-end justify-between gap-1.5 pt-4">
            {normalizedData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-default">
                    <div className="w-full relative h-full flex items-end justify-center">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(d.height, 6)}%` }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                            className={`w-[60%] ${colors[i % colors.length]} rounded-t-lg transition-all duration-300 relative shadow-lg shadow-indigo-900/5`}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0c1d56] dark:bg-white text-white dark:text-[#0c1d56] text-[10px] font-black px-2 py-1 rounded-xl shadow-2xl pointer-events-none whitespace-nowrap z-20 transition-all transform group-hover:-translate-y-1">
                                {d.completed_calls} Calls
                            </div>
                        </motion.div>
                    </div>
                    <span className={`text-[10px] transition-colors uppercase tracking-tight text-center ${isMobile ? 'font-black text-[#0c1d56]/30 dark:text-white/20' : 'font-medium text-slate-600 dark:text-slate-400'}`}>
                        {isMobile ?
                            new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }) :
                            new Date(d.date).toLocaleDateString('en-US', { weekday: 'long' })
                        }
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
            <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-indigo-200 dark:text-slate-400 uppercase tracking-widest">{label}</span>
                    <span className="text-white">{percentage}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full rounded-full ${color}`}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-400 w-14">{label}</span>
            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
            <span className="text-xs font-medium text-[#0c1d56] dark:text-white w-8 text-right">{percentage}%</span>
        </div>
    );
}
