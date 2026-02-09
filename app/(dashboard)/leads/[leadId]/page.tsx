"use client";

import React, { useState, useEffect } from "react";
import {
    Phone,
    Calendar,
    Clock,
    ArrowLeft,
    AudioLines,
    FileText,
    CheckCircle2,
    XCircle,
    Mail,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "agent" | "user";
    content: string | null;
}

interface CallDetail {
    id: string;
    lead_id: string;
    call_start_time: string;
    call_end_time: string;
    duration_seconds: number;
    status: string;
    summary_id: string;
    summary?: {
        summary_text: string;
        sentiment: string;
        outcome: string;
    };
    history?: Message[];
    interest?: {
        data: {
            budget?: string;
            preferred_location?: string;
            interest_level?: string;
            [key: string]: any;
        } | null;
    };
    audio_url: string;
    transcript_url: string | null;
    call_log: string | null;
    notes: string | null;
    property_discussed: string | null;
    visit_scheduled_time: string | null;
    created_at: string;
}

interface DetailsResponse {
    lead: {
        id: string;
        name: string;
        phone_number: string;
        email: string | null;
        created_at: string;
        call_status: string;
    } | null;
    details: CallDetail[];
    total: number;
    page: number;
}

export default function LeadDetailsPage(props: any) {
    const params = useParams();
    const leadId = params.leadId as string;

    const [data, setData] = useState<DetailsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [transcriptCall, setTranscriptCall] = useState<CallDetail | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setIsLoading(true);
                // Use leadId from params
                const response = await fetch(`/api/leads/${leadId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch lead details");
                }

                const result = await response.json();
                setData(result);
            } catch (err: any) {
                console.error("Error fetching lead details:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (leadId) {
            fetchDetails();
        }
    }, [leadId]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-medium">Fetching call history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-rose-50 dark:bg-rose-500/10 p-8 rounded-2xl border border-rose-200 dark:border-rose-500/20 text-center max-w-2xl mx-auto mt-10">
                <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-rose-900 dark:text-rose-400">Error Loading Details</h3>
                <p className="text-rose-600 dark:text-rose-500 text-sm mt-2 mb-6">{error}</p>
                <Link href="/leads" className="px-6 py-2 bg-[#0c1d56] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                    Back to Leads Store
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="hidden md:block space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-[#0c1d56] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none">
                                {data?.lead?.name?.charAt(0) || 'L'}
                            </div>
                            <div>
                                <h2 className="text-xl font-medium text-slate-900 dark:text-white tracking-tight">{data?.lead?.name || 'Lead'} Details</h2>
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-1.5">
                                    <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                                        {data?.lead?.phone_number || 'N/A'}
                                    </div>
                                    {data?.lead?.email && (
                                        <div className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                                            {data?.lead?.email}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-[12px] text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-white/10 pl-5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {data?.lead?.created_at ? formatDate(data.lead.created_at) : 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-[#0c1d56] hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-100 dark:shadow-none">
                                <Phone className="w-4 h-4" />
                                Call Lead Now
                            </button>
                            <div className="bg-slate-50 dark:bg-white/5 px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-white/10 flex flex-col items-end gap-0.5">
                                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total Interest</span>
                                <span className="text-[#0c1d56] dark:text-slate-200 text-sm font-semibold">{data?.total || 0} Successful Calls</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white dark:bg-[#11224d]/80 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden mb-12">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/30 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
                                    <th className="px-8 py-5 text-[15px] text-[#0c1d56] dark:text-slate-300 ">Date & Time</th>
                                    <th className="px-8 py-5 text-[15px] text-[#0c1d56] dark:text-slate-300 ">Duration</th>
                                    <th className="px-8 py-5 text-[15px] text-[#0c1d56] dark:text-slate-300 ">Status</th>
                                    <th className="px-8 py-5 text-[15px] text-[#0c1d56] dark:text-slate-300 ">Primary Topic</th>
                                    <th className="px-8 py-5 text-[15px] text-[#0c1d56] dark:text-slate-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                {data?.details && data.details.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-32 text-center text-slate-400 dark:text-slate-500">
                                            <AudioLines className="w-12 h-12 mx-auto mb-4 opacity-10" />
                                            <p className="text-sm font-medium">No session logs found.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    data?.details.map((call, index) => {
                                        const isExpanded = expandedIndex === index;

                                        return (
                                            <React.Fragment key={`call-${index}`}>
                                                <tr className={`hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all group ${isExpanded ? 'bg-slate-50/80 dark:bg-white/5' : ''}`}>
                                                    <td className="px-8 py-6">
                                                        <div className="flex flex-col">
                                                            <span className="text-[15px] font-medium text-slate-900 dark:text-slate-200">
                                                                {formatDate(call.call_start_time)}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-2 text-[16px] text-slate-700 dark:text-slate-400">
                                                            {formatDuration(call.duration_seconds)}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`inline-flex items-center text-[13px] font-semibold uppercase tracking-tight ${call.status === 'completed'
                                                            ? 'text-[#0c1d56] dark:text-indigo-400'
                                                            : 'text-slate-400'
                                                            }`}>
                                                            {call.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">
                                                            {call.property_discussed || 'General Inquiry'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <button
                                                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                                            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ml-auto cursor-pointer shadow-sm ${isExpanded
                                                                ? 'bg-[#0c1d56] text-white shadow-[#0c1d56]/20'
                                                                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#0c1d56] dark:text-white hover:border-[#0c1d56] dark:hover:border-white'
                                                                }`}
                                                        >
                                                            {isExpanded ? 'Hide Details' : 'View Insights'}
                                                        </button>
                                                    </td>
                                                </tr>
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <tr>
                                                            <td colSpan={5} className="px-8 py-0 border-none bg-slate-50/40 dark:bg-white/[0.02]">
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="py-12 border-t border-slate-100 dark:border-white/5">
                                                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                                                            {/* Left: Recording & Summary */}
                                                                            <div className="lg:col-span-7 space-y-12">
                                                                                <div className="space-y-5">
                                                                                    <div className="flex items-center justify-between">
                                                                                        <div className="flex items-center gap-3">
                                                                                            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[#0c1d56] dark:text-slate-300">
                                                                                                <AudioLines size={18} />
                                                                                            </div>
                                                                                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-tight">Session Audio</span>
                                                                                        </div>
                                                                                        <button
                                                                                            onClick={() => setTranscriptCall(call)}
                                                                                            className="px-5 py-2 bg-[#0c1d56] text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
                                                                                        >
                                                                                            Review Transcript
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="p-2 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                                                                        <audio
                                                                                            controls
                                                                                            src={call.audio_url}
                                                                                            className="w-full h-9 opacity-80"
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="space-y-5">
                                                                                    <div className="flex items-center gap-3">
                                                                                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[#0c1d56] dark:text-slate-300">
                                                                                            <FileText size={18} />
                                                                                        </div>
                                                                                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-200 tracking-tight">Executive Summary</span>
                                                                                    </div>
                                                                                    <div className="p-7 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                                                                                        <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                                                                            {call.summary?.summary_text || call.call_log || "Summary analysis in progress..."}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* Right: Insights Grid */}
                                                                            <div className="lg:col-span-5 space-y-10 border-l border-slate-200 dark:border-white/10 pl-12">
                                                                                <div className="space-y-6">
                                                                                    <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Interest Profile</h4>

                                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                                                                        <div className="space-y-1.5">
                                                                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Budget Entry</span>
                                                                                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{call.interest?.data?.budget || "N/A"}</span>
                                                                                        </div>
                                                                                        <div className="space-y-1.5">
                                                                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Preferred Location</span>
                                                                                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{call.interest?.data?.preferred_location || "N/A"}</span>
                                                                                        </div>
                                                                                        <div className="space-y-1.5">
                                                                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Lead Outcome</span>
                                                                                            <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded italic bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 inline-block`}>
                                                                                                {call.summary?.outcome || "Unknown"}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="space-y-1.5">
                                                                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Next Step</span>
                                                                                            <span className="text-[12px] font-semibold text-[#0c1d56] dark:text-indigo-400">
                                                                                                {call.visit_scheduled_time ? "Visit Scheduled" : "Follow-up Required"}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="pt-8 space-y-4">
                                                                                        <div className="flex items-center justify-between">
                                                                                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Interest Level Score</span>
                                                                                            <span className="text-sm font-black text-[#0c1d56] dark:text-slate-200">{call.interest?.data?.interest_level || "0"}/10</span>
                                                                                        </div>
                                                                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                                                            <motion.div
                                                                                                initial={{ width: 0 }}
                                                                                                animate={{ width: `${(Number(call.interest?.data?.interest_level) || 0) * 10}%` }}
                                                                                                className="h-full bg-[#0c1d56] dark:bg-indigo-500"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </AnimatePresence>
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-8 py-6 bg-slate-50/20 dark:bg-white/5 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                            {data?.details?.length || 0} Professional Records
                        </div>
                    </div>
                </div>

            </div>

            <div className="block md:hidden">
                <MobileLeadView
                    data={data}
                    formatDate={formatDate}
                    formatDuration={formatDuration}
                    setTranscriptCall={setTranscriptCall}
                    expandedIndex={expandedIndex}
                    setExpandedIndex={setExpandedIndex}
                />
            </div>

            <TranscriptModal
                isOpen={!!transcriptCall}
                onClose={() => setTranscriptCall(null)}
                call={transcriptCall}
            />
        </>
    );
}

function MobileLeadView({
    data,
    formatDate,
    formatDuration,
    setTranscriptCall,
    expandedIndex,
    setExpandedIndex
}: {
    data: DetailsResponse | null,
    formatDate: (d: string) => string,
    formatDuration: (s: number) => string,
    setTranscriptCall: (call: CallDetail) => void,
    expandedIndex: number | null,
    setExpandedIndex: (i: number | null) => void
}) {
    if (!data?.lead) return null;

    return (
        <div className="pb-20 space-y-6">
            {/* Mobile Header */}
            <div className="flex flex-col items-center justify-center pt-8 pb-2">
                <div className="w-20 h-20 bg-[#0c1d56] rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-100 dark:shadow-none mb-5">
                    {data.lead.name?.charAt(0) || 'L'}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{data.lead.name} Details</h2>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium tracking-wide">{data.lead.phone_number}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-5 flex items-center justify-between mx-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">TOTAL INTEREST</span>
                <span className="text-[#0c1d56] dark:text-white text-sm font-bold">{data.total} Successful Calls</span>
            </div>

            {/* CTA */}
            <button className="w-[80%] mx-auto block bg-[#0c1d56] text-white py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-900/20 mb-6 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Phone className="w-4 h-4" />
                Call Lead Now
            </button>

            {/* Call History List */}
            <div className="space-y-4">
                {data.details.map((call, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <div key={index} className={`bg-white dark:bg-[#11224d] rounded-[24px] border overflow-hidden transition-all duration-300 ${isExpanded ? 'border-[#0c1d56] dark:border-indigo-500 shadow-xl shadow-indigo-900/10' : 'border-slate-200 dark:border-white/5'}`}>
                            {/* Card Content */}
                            <div className="p-5">
                                {/* Header: Date & Status */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1.5">SESSION DATE</div>
                                        <div className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">
                                            {formatDate(call.call_start_time)}
                                        </div>
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${call.status === 'completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-500'}`}>
                                        {call.status}
                                    </div>
                                </div>

                                {/* Metrics Row */}
                                <div className="flex items-end justify-between mb-6">
                                    <div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1.5">DURATION</div>
                                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium text-sm">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            {formatDuration(call.duration_seconds)}
                                        </div>
                                    </div>
                                    {!isExpanded && (
                                        <button
                                            onClick={() => setExpandedIndex(index)}
                                            className="px-4 py-2 bg-white dark:bg-white/5 border border-indigo-200 dark:border-white/10 text-[#0c1d56] dark:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm shadow-indigo-100 dark:shadow-none active:scale-95 transition-all"
                                        >
                                            VIEW INSIGHTS
                                        </button>
                                    )}
                                </div>

                                {isExpanded && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-8 pt-2 border-t border-slate-100 dark:border-white/5">

                                        {/* Close Button */}
                                        <button
                                            onClick={() => setExpandedIndex(null)}
                                            className="w-[80%] mx-auto block bg-[#0c1d56] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md shadow-indigo-900/10 active:scale-95 transition-transform"
                                        >
                                            CLOSE INSIGHTS
                                        </button>

                                        {/* Audio Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-white/5 flex items-center justify-center text-[#0c1d56] dark:text-white">
                                                    <AudioLines size={14} />
                                                </div>
                                                <div>
                                                    <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">SESSION RECORDING</div>
                                                    <div className="text-sm font-bold text-slate-900 dark:text-white">Audio Playback</div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-1 border border-slate-100 dark:border-white/5">
                                                <audio
                                                    controls
                                                    src={call.audio_url}
                                                    className="w-full h-8 opacity-90"
                                                />
                                            </div>

                                            <button
                                                onClick={() => setTranscriptCall(call)}
                                                className="w-[90%] mx-auto block bg-indigo-50 dark:bg-indigo-500/10 text-[#0c1d56] dark:text-indigo-300 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                                            >
                                                REVIEW TRANSCRIPT
                                            </button>
                                        </div>

                                        {/* Executive Summary */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-slate-400" />
                                                <span className="text-[10px] items-center font-bold text-slate-400 uppercase tracking-widest">EXECUTIVE SUMMARY</span>
                                            </div>
                                            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                                    {call.summary?.summary_text || call.call_log || "Summary analysis in progress..."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Interest Profile */}
                                        <div className="space-y-6">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-white/10 pb-2">INTEREST PROFILE</div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">BUDGET ENTRY</div>
                                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{call.interest?.data?.budget || "N/A"}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">PREFERRED LOCATION</div>
                                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{call.interest?.data?.preferred_location || "N/A"}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">LEAD OUTCOME</div>
                                                    <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-400 italic">
                                                        {call.summary?.outcome || "Unknown"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">NEXT STEP</div>
                                                    <div className="text-xs font-bold text-[#0c1d56] dark:text-indigo-400">
                                                        {call.visit_scheduled_time ? "Visit Scheduled" : "Follow-up Required"}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">INTEREST LEVEL SCORE</span>
                                                    <span className="text-xs font-black text-[#0c1d56] dark:text-white">{call.interest?.data?.interest_level || "0"}/10</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#0c1d56] dark:bg-indigo-500 rounded-full"
                                                        style={{ width: `${(Number(call.interest?.data?.interest_level) || 0) * 10}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function TranscriptModal({ isOpen, onClose, call }: { isOpen: boolean, onClose: () => void, call: CallDetail | null }) {
    if (!call) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
            <div className={`bg-white dark:bg-[#0c1d56] w-full max-w-2xl max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden relative transition-transform duration-300 transform ${isOpen ? 'scale-100' : 'scale-95'}`}>
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
                    <div>
                        <h3 className="text-lg font-bold text-[#0c1d56] dark:text-white">Call Transcript</h3>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Full history of conversation</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors">
                        <XCircle className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)] space-y-4 custom-scrollbar">
                    {call.history && call.history.length > 0 ? (
                        call.history.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col ${msg.role === 'agent' ? 'items-start' : 'items-end'}`}>
                                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${msg.role === 'agent'
                                    ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-500/10 dark:text-indigo-200 rounded-tl-none'
                                    : 'bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200 rounded-tr-none'
                                    }`}>
                                    {msg.content || <span className="italic opacity-50">No content</span>}
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400 px-1 mt-1">
                                    {msg.role}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-slate-400 uppercase tracking-widest text-xs font-bold">
                            No transcript available for this call.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-right">
                    <button onClick={onClose} className="px-6 py-2 bg-[#0c1d56] text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all hover:scale-105 active:scale-95">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
