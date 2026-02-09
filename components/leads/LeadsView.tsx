"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, MapPin, Phone, Mail, Calendar, User, Eye, Plus, X, UserPlus, CheckCircle, AlertCircle, Edit3, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Lead {
    id: string;
    name: string;
    phone_number: string;
    email: string | null;
    created_at: string;
    updated_at: string;
    scheduled_call_time: string | null;
    call_status: string;
    geographical_direction: string | null;
}

interface LeadsResponse {
    success: boolean;
    message: string;
    data: {
        leads: Lead[];
        total: number;
    };
}

export default function LeadsView() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/leads');

                if (!response.ok) {
                    throw new Error(`Failed to fetch leads: ${response.statusText}`);
                }

                const result: LeadsResponse = await response.json();

                if (result.success) {
                    setLeads(result.data.leads);
                } else {
                    throw new Error(result.message || "Failed to load leads");
                }
            } catch (err: any) {
                console.error("Error fetching leads:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone_number.includes(searchQuery)
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-slate-500 dark:text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#0c1d56] dark:text-white" />
                <p>Loading leads...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-rose-500">
                <p className="font-semibold mb-2">Error loading leads</p>
                <p className="text-sm border px-3 py-1 rounded border-rose-200 bg-rose-50 dark:bg-rose-900/10 dark:border-rose-800">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-[#0c1d56] text-white rounded-md text-sm hover:bg-slate-800 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Desktop Header / Actions */}
            <div className="hidden md:flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#0c1d56] dark:text-white">Leads Store</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage and track your potential clients</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-white dark:bg-[#11224d] border border-slate-200 dark:border-white/10 rounded-lg text-sm w-full focus:ring-2 focus:ring-[#0c1d56] dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
                        />
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0c1d56] dark:bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-md hover:shadow-lg w-full sm:w-auto active:scale-95"
                    >
                        <UserPlus size={18} />
                        Add Lead
                    </button>
                </div>
            </div>

            {/* Mobile Header / Search */}
            <div className="md:hidden space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-[#0c1d56] dark:text-white uppercase tracking-tight">Leads Store</h2>
                        <div className="h-1 w-8 bg-[#0c1d56] dark:bg-indigo-500 rounded-full mt-1"></div>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#11224d] border border-slate-100 dark:border-white/5 rounded-2xl text-sm focus:ring-2 focus:ring-[#0c1d56] dark:focus:ring-indigo-500 outline-none shadow-sm dark:text-white"
                    />
                </div>

                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-[70%] mx-auto flex items-center justify-center gap-2 bg-[#0c1d56] text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-900/10 active:scale-95 transition-transform"
                >
                    <UserPlus size={18} />
                    Add Lead
                </button>
            </div>

            {/* Desktop Leads Table */}
            <div className="hidden md:block bg-white dark:bg-[#11224d]/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200/60 dark:border-white/10">
                                <th className="px-6 py-4 text-[11px] font-bold text-[#0c1d56] dark:text-slate-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#0c1d56] dark:text-slate-300 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#0c1d56] dark:text-slate-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#0c1d56] dark:text-slate-300 uppercase tracking-wider">Email Address</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#0c1d56] dark:text-slate-300 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                                        No leads found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div className="font-semibold text-[#0c1d56] dark:text-white">{lead.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                    {lead.phone_number}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${lead.call_status === 'converted'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 shadow-sm shadow-emerald-100/50'
                                                : lead.call_status === 'scheduled'
                                                    ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 shadow-sm shadow-blue-100/50'
                                                    : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-700/50'
                                                }`}>
                                                {lead.call_status.charAt(0).toUpperCase() + lead.call_status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5 font-medium">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                {lead.email || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-wider">
                                                <Link
                                                    href={`/leads/${lead.id}`}
                                                    className="px-3 py-1.5 bg-slate-50 hover:bg-[#0c1d56] dark:bg-white/5 dark:hover:bg-white text-[#0c1d56] hover:text-white dark:text-white dark:hover:text-[#0c1d56] border border-slate-200 dark:border-white/10 rounded-lg transition-all"
                                                >
                                                    View Detail
                                                </Link>
                                                <button
                                                    onClick={() => setEditingLead(lead)}
                                                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600/90 dark:bg-indigo-500/10 dark:hover:bg-indigo-600 text-indigo-600 hover:text-white dark:text-indigo-400 dark:hover:text-white border border-indigo-100 dark:border-indigo-500/20 rounded-lg transition-all"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setDeletingLeadId(lead.id)}
                                                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-600/90 dark:bg-rose-500/10 dark:hover:bg-rose-600 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white border border-rose-100 dark:border-rose-500/20 rounded-lg transition-all"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination (Mock) */}
                <div className="px-6 py-4 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
                    <div className="font-medium">Showing {filteredLeads.length} leads</div>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 font-semibold transition-colors">Previous</button>
                        <button disabled className="px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 font-semibold transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Mobile Leads List */}
            <div className="md:hidden space-y-4 pb-20">
                {filteredLeads.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 uppercase tracking-widest text-xs font-bold">
                        No leads found
                    </div>
                ) : (
                    filteredLeads.map((lead) => (
                        <div key={lead.id} className="bg-white dark:bg-[#11224d] rounded-3xl p-5 border border-slate-100 dark:border-white/5 shadow-sm space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-lg font-black shadow-sm">
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#0c1d56] dark:text-white tracking-tight">{lead.name}</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${lead.call_status === 'converted' ? 'bg-emerald-500' : lead.call_status === 'scheduled' ? 'bg-blue-500' : 'bg-slate-400'}`}></span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {lead.call_status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
                                    <button
                                        onClick={() => setEditingLead(lead)}
                                        className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-100 dark:border-indigo-500/20"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeletingLeadId(lead.id)}
                                        className="px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg border border-rose-100 dark:border-rose-500/20"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-row gap-2">
                                <div className="flex-1 flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-100 dark:border-white/5">
                                    <span className="text-[11px] font-bold tracking-tight">{lead.phone_number}</span>
                                </div>
                                <div className="flex-1 flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden">
                                    <span className="text-[11px] font-bold tracking-tight truncate">{lead.email || "No Email"}</span>
                                </div>
                            </div>

                            <Link
                                href={`/leads/${lead.id}`}
                                className="w-[70%] mx-auto flex items-center justify-center gap-2 bg-[#0c1d56] text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-all shadow-md shadow-indigo-900/10"
                            >
                                View Detail
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {/* Create Lead Modal */}
            <CreateLeadModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={(newLead) => {
                    setLeads(prev => [newLead, ...prev]);
                    setIsCreateModalOpen(false);
                }}
            />

            {/* Edit Lead Modal */}
            <EditLeadModal
                isOpen={!!editingLead}
                lead={editingLead}
                onClose={() => setEditingLead(null)}
                onSuccess={(updatedLead) => {
                    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
                    setEditingLead(null);
                }}
            />

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deletingLeadId && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDeletingLeadId(null)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-sm bg-white dark:bg-[#0c1d56] rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-white/5"
                        >
                            <h3 className="text-lg font-bold text-[#0c1d56] dark:text-white mb-2">Delete Lead?</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Are you sure you want to remove this lead? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeletingLeadId(null)}
                                    className="flex-1 px-4 py-2 text-sm font-bold text-slate-500 hover:text-[#0c1d56] dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        try {
                                            setIsDeleting(true);
                                            const res = await fetch(`/api/leads/${deletingLeadId}`, { method: 'DELETE' });
                                            if (res.ok) {
                                                setLeads(prev => prev.filter(l => l.id !== deletingLeadId));
                                                setDeletingLeadId(null);
                                            }
                                        } catch (err) {
                                            console.error(err);
                                        } finally {
                                            setIsDeleting(false);
                                        }
                                    }}
                                    disabled={isDeleting}
                                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function EditLeadModal({ isOpen, lead, onClose, onSuccess }: {
    isOpen: boolean,
    lead: Lead | null,
    onClose: () => void,
    onSuccess: (lead: Lead) => void
}) {
    const [formData, setFormData] = useState<NewLead>({
        name: "",
        phone_number: "",
        email: "",
        scheduled_call_time: "",
        call_status: "scheduled",
        geographical_direction: null
    });

    useEffect(() => {
        if (lead) {
            setFormData({
                name: lead.name,
                phone_number: lead.phone_number,
                email: lead.email || "",
                scheduled_call_time: lead.scheduled_call_time || "",
                call_status: lead.call_status,
                geographical_direction: lead.geographical_direction
            });
        }
    }, [lead]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleInputChange = (field: keyof NewLead, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value || null }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!lead) return;

        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const response = await fetch(`/api/leads/${lead.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update lead");
            }

            const result = await response.json();
            if (result.success) {
                onSuccess(result.data);
            } else {
                throw new Error(result.message || "Failed to update lead");
            }
        } catch (err: any) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        className="relative w-full max-w-[440px] bg-white dark:bg-[#0c1d56] rounded-3xl shadow-xl overflow-hidden border border-slate-200/60 dark:border-white/5"
                    >
                        {/* Compact Header */}
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/30 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100 dark:shadow-none">
                                    <Edit3 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#0c1d56] dark:text-white tracking-tight">Edit Lead</h3>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">Update prospect details</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-[#0c1d56] dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Full Name</label>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold"
                                        />
                                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Contact Number</label>
                                    <div className="relative group/input">
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone_number}
                                            onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold"
                                        />
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Email Address</label>
                                    <div className="relative group/input">
                                        <input
                                            type="email"
                                            value={formData.email || ""}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold"
                                        />
                                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Scheduled Date</label>
                                    <div className="relative group/input">
                                        <input
                                            type="datetime-local"
                                            value={formData.scheduled_call_time || ""}
                                            onChange={(e) => handleInputChange('scheduled_call_time', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold"
                                        />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none" size={16} />
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="flex items-center gap-2 text-rose-500 font-bold text-[10px] p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-xl">
                                        <AlertCircle size={14} />
                                        <span>{submitError}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 pt-4 mt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#0c1d56] dark:hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 relative group/btn bg-[#0c1d56] dark:bg-indigo-600 px-6 py-3 rounded-xl transition-all hover:bg-slate-800 dark:hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-100 dark:shadow-none"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-2 text-white">
                                            {isSubmitting ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <CheckCircle size={16} />
                                            )}
                                            <span className="text-xs font-bold uppercase tracking-widest">
                                                {isSubmitting ? 'Updating...' : 'Update Lead'}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

interface NewLead {
    name: string;
    phone_number: string;
    email: string | null;
    scheduled_call_time: string | null;
    call_status: string | null;
    geographical_direction: string | null;
}

function CreateLeadModal({ isOpen, onClose, onSuccess }: {
    isOpen: boolean,
    onClose: () => void,
    onSuccess: (lead: Lead) => void
}) {
    const [lead, setLead] = useState<NewLead>({
        name: "",
        phone_number: "",
        email: "",
        scheduled_call_time: "",
        call_status: "scheduled",
        geographical_direction: null
    });

    useEffect(() => {
        if (!isOpen) {
            setLead({
                name: "",
                phone_number: "",
                email: "",
                scheduled_call_time: "",
                call_status: "scheduled",
                geographical_direction: null
            });
            setSubmitError(null);
        }
    }, [isOpen]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleInputChange = (field: keyof NewLead, value: string) => {
        setLead(prev => ({ ...prev, [field]: value || null }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            if (!lead.name || !lead.phone_number) {
                throw new Error("Name and Phone Number are required.");
            }

            const response = await fetch('/api/leads/create', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(lead)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create lead");
            }

            const result: { success: boolean, data: Lead, message?: string } = await response.json();

            if (result.success) {
                onSuccess(result.data);
            } else {
                throw new Error(result.message || "Failed to create lead");
            }
        } catch (err: any) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        className="relative w-full max-w-[440px] bg-white dark:bg-[#0c1d56] rounded-3xl shadow-xl overflow-hidden border border-slate-200/60 dark:border-white/5"
                    >
                        {/* Compact Header */}
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/30 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100 dark:shadow-none">
                                    <UserPlus size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#0c1d56] dark:text-white tracking-tight">Add New Lead</h3>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">Enter details to save prospect</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-[#0c1d56] dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body - Single Column and Compact */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Full Name</label>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Jonathan Wick"
                                            value={lead.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                        />
                                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Contact Number</label>
                                    <div className="relative group/input">
                                        <input
                                            type="tel"
                                            required
                                            placeholder="e.g. +977 9865..."
                                            value={lead.phone_number}
                                            onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                        />
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Email Address</label>
                                    <div className="relative group/input">
                                        <input
                                            type="email"
                                            placeholder="e.g. contact@domain.com"
                                            value={lead.email || ""}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                        />
                                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Scheduled Date</label>
                                    <div className="relative group/input">
                                        <input
                                            type="datetime-local"
                                            value={lead.scheduled_call_time || ""}
                                            onChange={(e) => handleInputChange('scheduled_call_time', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                        />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none" size={16} />
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="flex items-center gap-2 text-rose-500 font-bold text-[10px] p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-xl">
                                        <AlertCircle size={14} />
                                        <span>{submitError}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 pt-4 mt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#0c1d56] dark:hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 relative group/btn bg-[#0c1d56] dark:bg-indigo-600 px-6 py-3 rounded-xl transition-all hover:bg-slate-800 dark:hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-100 dark:shadow-none"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-2 text-white">
                                            {isSubmitting ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <CheckCircle size={16} />
                                            )}
                                            <span className="text-xs font-bold uppercase tracking-widest">
                                                {isSubmitting ? 'Saving...' : 'Save Lead'}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
