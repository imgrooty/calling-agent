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
        <div className="space-y-6 animate-in fade-in duration-500">
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
                            <h3 className="text-sm font-semibold text-[#0c1d56] dark:text-white">Call Volume</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Last 7 days activity</p>
                        </div>
                    </div>
                    <div className="h-[240px] w-full">
                        <ActivityChart data={data?.daily_calls_completed || []} />
                    </div>
                </div>

                {/* Sentiment */}
                <div className="bg-white dark:bg-[#11224d]/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col">
                    <h3 className="text-sm font-semibold text-[#0c1d56] dark:text-white mb-1">Sentiment Analysis</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Aggregate call tone</p>

                    <div className="flex-1 flex flex-col justify-center space-y-4">
                        <SentimentMeter label="Positive" value={data?.sentiment_distribution.positive || 0} total={data?.total_calls || 1} color="bg-emerald-500" />
                        <SentimentMeter label="Neutral" value={data?.sentiment_distribution.neutral || 0} total={data?.total_calls || 1} color="bg-slate-400 dark:bg-slate-600" />
                        <SentimentMeter label="Negative" value={data?.sentiment_distribution.negative || 0} total={data?.total_calls || 1} color="bg-rose-500" />
                    </div>
                </div>
            </div>

            {/* Recent Calls Data Grid */}
            <div className="bg-white dark:bg-[#11224d]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
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
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lead</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Date</th>
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
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                                                    {call.lead_name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-[#0c1d56] dark:text-white">{call.lead_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-300">{call.property_discussed ? 'Property Inquiry' : 'General Inquiry'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tabular-nums">
                                                {Math.floor(call.duration_seconds / 60)}m {call.duration_seconds % 60}s
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${call.status === 'completed'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                : 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-700/50'
                                                }`}>
                                                {call.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm text-slate-500 dark:text-slate-400 tabular-nums">
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
        </div>
    );
}

// --- Subcomponents ---

function MetricCard({ title, value, trend, icon, color }: any) {
    return (
        <div className="bg-white dark:bg-[#11224d]/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32 md:h-36 group">
            <div className="flex items-start justify-between">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</span>
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

function ActivityChart({ data }: { data: CallDay[] }) {
    if (!data.length) return null;

    const max = Math.max(...data.map(d => d.completed_calls), 5);
    const normalizedData = data.map(d => ({
        ...d,
        height: (d.completed_calls / max) * 100
    }));

    return (
        <div className="w-full h-full flex items-end justify-between gap-1 pt-4">
            {normalizedData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-default">
                    <div className="w-full relative h-full flex items-end">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(d.height, 2)}%` }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="w-full bg-slate-100 dark:bg-white/5 rounded-sm group-hover:bg-[#0c1d56] dark:group-hover:bg-indigo-500 transition-colors duration-200 relative"
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0c1d56] dark:bg-white text-white dark:text-[#0c1d56] text-[10px] font-medium px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-10 transition-opacity">
                                {d.completed_calls} Calls
                            </div>
                        </motion.div>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-[#0c1d56] dark:group-hover:text-white transition-colors uppercase">
                        {new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                    </span>
                </div>
            ))}
        </div>
    );
}

function SentimentMeter({ label, value, total, color }: any) {
    const percentage = Math.round((value / total) * 100);

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-14">{label}</span>
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
