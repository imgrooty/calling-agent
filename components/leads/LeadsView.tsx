"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, MapPin, Phone, Mail, Calendar, User, Eye, Plus, X, UserPlus, CheckCircle, AlertCircle, Edit3, Trash2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Globe } from "lucide-react";

const COUNTRY_CODES = [
    { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
    { code: "+355", country: "Albania", flag: "🇦🇱" },
    { code: "+213", country: "Algeria", flag: "🇩🇿" },
    { code: "+1-684", country: "American Samoa", flag: "🇦🇸" },
    { code: "+376", country: "Andorra", flag: "🇦🇩" },
    { code: "+244", country: "Angola", flag: "🇦🇴" },
    { code: "+1-264", country: "Anguilla", flag: "🇦🇮" },
    { code: "+1-268", country: "Antigua & Barbuda", flag: "🇦🇬" },
    { code: "+54", country: "Argentina", flag: "🇦🇷" },
    { code: "+374", country: "Armenia", flag: "🇦🇲" },
    { code: "+297", country: "Aruba", flag: "🇦🇼" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+43", country: "Austria", flag: "🇦🇹" },
    { code: "+994", country: "Azerbaijan", flag: "🇦🇿" },
    { code: "+1-242", country: "Bahamas", flag: "🇧🇸" },
    { code: "+973", country: "Bahrain", flag: "🇧🇭" },
    { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
    { code: "+1-246", country: "Barbados", flag: "🇧🇧" },
    { code: "+375", country: "Belarus", flag: "🇧🇾" },
    { code: "+32", country: "Belgium", flag: "🇧🇪" },
    { code: "+501", country: "Belize", flag: "🇧🇿" },
    { code: "+229", country: "Benin", flag: "🇧🇯" },
    { code: "+1-441", country: "Bermuda", flag: "🇧🇲" },
    { code: "+975", country: "Bhutan", flag: "🇧🇹" },
    { code: "+591", country: "Bolivia", flag: "🇧🇴" },
    { code: "+387", country: "Bosnia & Herzegovina", flag: "🇧🇦" },
    { code: "+267", country: "Botswana", flag: "🇧🇼" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+673", country: "Brunei", flag: "🇧🇳" },
    { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
    { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
    { code: "+257", country: "Burundi", flag: "🇧🇮" },
    { code: "+855", country: "Cambodia", flag: "🇰🇭" },
    { code: "+237", country: "Cameroon", flag: "🇨🇲" },
    { code: "+1", country: "Canada", flag: "🇨🇦" },
    { code: "+238", country: "Cape Verde", flag: "🇨🇻" },
    { code: "+1-345", country: "Cayman Islands", flag: "🇰🇾" },
    { code: "+236", country: "Central African Republic", flag: "🇨🇫" },
    { code: "+235", country: "Chad", flag: "🇹🇩" },
    { code: "+56", country: "Chile", flag: "🇨🇱" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+57", country: "Colombia", flag: "🇨🇴" },
    { code: "+269", country: "Comoros", flag: "🇰🇲" },
    { code: "+682", country: "Cook Islands", flag: "🇨🇰" },
    { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
    { code: "+385", country: "Croatia", flag: "🇭🇷" },
    { code: "+53", country: "Cuba", flag: "🇨🇺" },
    { code: "+357", country: "Cyprus", flag: "🇨🇾" },
    { code: "+420", country: "Czechia", flag: "🇨🇿" },
    { code: "+243", country: "Dem. Rep. Congo", flag: "🇨🇩" },
    { code: "+45", country: "Denmark", flag: "🇩🇰" },
    { code: "+253", country: "Djibouti", flag: "🇩🇯" },
    { code: "+1-767", country: "Dominica", flag: "🇩🇲" },
    { code: "+1-809", country: "Dominican Republic", flag: "🇩🇴" },
    { code: "+593", country: "Ecuador", flag: "🇪🇨" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+503", country: "El Salvador", flag: "🇸🇻" },
    { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" },
    { code: "+291", country: "Eritrea", flag: "🇪🇷" },
    { code: "+372", country: "Estonia", flag: "🇪🇪" },
    { code: "+268", country: "Eswatini", flag: "🇸🇿" },
    { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
    { code: "+679", country: "Fiji", flag: "🇫🇯" },
    { code: "+358", country: "Finland", flag: "🇫🇮" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+241", country: "Gabon", flag: "🇬🇦" },
    { code: "+220", country: "Gambia", flag: "🇬🇲" },
    { code: "+995", country: "Georgia", flag: "🇬🇪" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
    { code: "+350", country: "Gibraltar", flag: "🇬🇮" },
    { code: "+30", country: "Greece", flag: "🇬🇷" },
    { code: "+299", country: "Greenland", flag: "🇬🇱" },
    { code: "+1-473", country: "Grenada", flag: "🇬🇩" },
    { code: "+1-671", country: "Guam", flag: "🇬🇺" },
    { code: "+502", country: "Guatemala", flag: "🇬🇹" },
    { code: "+224", country: "Guinea", flag: "🇬🇳" },
    { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" },
    { code: "+592", country: "Guyana", flag: "🇬🇾" },
    { code: "+509", country: "Haiti", flag: "🇭🇹" },
    { code: "+504", country: "Honduras", flag: "🇭🇳" },
    { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
    { code: "+36", country: "Hungary", flag: "🇭🇺" },
    { code: "+354", country: "Iceland", flag: "🇮🇸" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+98", country: "Iran", flag: "🇮🇷" },
    { code: "+964", country: "Iraq", flag: "🇮🇶" },
    { code: "+353", country: "Ireland", flag: "🇮🇪" },
    { code: "+972", country: "Israel", flag: "🇮🇱" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+1-876", country: "Jamaica", flag: "🇯🇲" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+962", country: "Jordan", flag: "🇯🇴" },
    { code: "+7", country: "Kazakhstan", flag: "🇰🇿" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+686", country: "Kiribati", flag: "🇰🇮" },
    { code: "+965", country: "Kuwait", flag: "🇰🇼" },
    { code: "+996", country: "Kyrgyzstan", flag: "🇰🇬" },
    { code: "+856", country: "Laos", flag: "🇱🇦" },
    { code: "+371", country: "Latvia", flag: "🇱🇻" },
    { code: "+961", country: "Lebanon", flag: "🇱🇧" },
    { code: "+266", country: "Lesotho", flag: "🇱🇸" },
    { code: "+231", country: "Liberia", flag: "🇱🇷" },
    { code: "+218", country: "Libya", flag: "🇱🇾" },
    { code: "+423", country: "Liechtenstein", flag: "🇱🇮" },
    { code: "+370", country: "Lithuania", flag: "🇱🇹" },
    { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
    { code: "+853", country: "Macau", flag: "🇲🇴" },
    { code: "+261", country: "Madagascar", flag: "🇲🇬" },
    { code: "+265", country: "Malawi", flag: "🇲🇼" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+960", country: "Maldives", flag: "🇲🇻" },
    { code: "+223", country: "Mali", flag: "🇲🇱" },
    { code: "+356", country: "Malta", flag: "🇲🇹" },
    { code: "+692", country: "Marshall Islands", flag: "🇲🇭" },
    { code: "+222", country: "Mauritania", flag: "🇲🇷" },
    { code: "+230", country: "Mauritius", flag: "🇲🇺" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+691", country: "Micronesia", flag: "🇫🇲" },
    { code: "+373", country: "Moldova", flag: "🇲🇩" },
    { code: "+377", country: "Monaco", flag: "🇲🇨" },
    { code: "+976", country: "Mongolia", flag: "🇲🇳" },
    { code: "+382", country: "Montenegro", flag: "🇲🇪" },
    { code: "+1-664", country: "Montserrat", flag: "🇲🇸" },
    { code: "+212", country: "Morocco", flag: "🇲🇦" },
    { code: "+258", country: "Mozambique", flag: "🇲🇿" },
    { code: "+95", country: "Myanmar", flag: "🇲🇲" },
    { code: "+264", country: "Namibia", flag: "🇳🇦" },
    { code: "+674", country: "Nauru", flag: "🇳🇷" },
    { code: "+977", country: "Nepal", flag: "🇳🇵" },
    { code: "+31", country: "Netherlands", flag: "🇳🇱" },
    { code: "+687", country: "New Caledonia", flag: "🇳🇨" },
    { code: "+64", country: "New Zealand", flag: "🇳🇿" },
    { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
    { code: "+227", country: "Niger", flag: "🇳🇪" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+683", country: "Niue", flag: "🇳🇺" },
    { code: "+850", country: "North Korea", flag: "🇰🇵" },
    { code: "+389", country: "North Macedonia", flag: "🇲🇰" },
    { code: "+47", country: "Norway", flag: "🇳🇴" },
    { code: "+968", country: "Oman", flag: "🇴🇲" },
    { code: "+92", country: "Pakistan", flag: "🇵🇰" },
    { code: "+680", country: "Palau", flag: "🇵🇼" },
    { code: "+970", country: "Palestine", flag: "🇵🇸" },
    { code: "+507", country: "Panama", flag: "🇵🇦" },
    { code: "+675", country: "Papua New Guinea", flag: "🇵🇬" },
    { code: "+595", country: "Paraguay", flag: "🇵🇾" },
    { code: "+51", country: "Peru", flag: "🇵🇪" },
    { code: "+63", country: "Philippines", flag: "🇵🇭" },
    { code: "+48", country: "Poland", flag: "🇵🇱" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+1-787", country: "Puerto Rico", flag: "🇵🇷" },
    { code: "+974", country: "Qatar", flag: "🇶🇦" },
    { code: "+40", country: "Romania", flag: "🇷🇴" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+250", country: "Rwanda", flag: "🇷🇼" },
    { code: "+685", country: "Samoa", flag: "🇼🇸" },
    { code: "+378", country: "San Marino", flag: "🇸🇲" },
    { code: "+239", country: "São Tomé & Príncipe", flag: "🇸🇹" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+221", country: "Senegal", flag: "🇸🇳" },
    { code: "+381", country: "Serbia", flag: "🇷🇸" },
    { code: "+248", country: "Seychelles", flag: "🇸🇨" },
    { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+421", country: "Slovakia", flag: "🇸🇰" },
    { code: "+386", country: "Slovenia", flag: "🇸🇮" },
    { code: "+677", country: "Solomon Islands", flag: "🇸🇧" },
    { code: "+252", country: "Somalia", flag: "🇸🇴" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+211", country: "South Sudan", flag: "🇸🇸" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
    { code: "+249", country: "Sudan", flag: "🇸🇩" },
    { code: "+597", country: "Suriname", flag: "🇸🇷" },
    { code: "+46", country: "Sweden", flag: "🇸🇪" },
    { code: "+41", country: "Switzerland", flag: "🇨🇭" },
    { code: "+963", country: "Syria", flag: "🇸🇾" },
    { code: "+886", country: "Taiwan", flag: "🇹🇼" },
    { code: "+992", country: "Tajikistan", flag: "🇹🇯" },
    { code: "+255", country: "Tanzania", flag: "🇹🇿" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
    { code: "+670", country: "Timor-Leste", flag: "🇹🇱" },
    { code: "+228", country: "Togo", flag: "🇹🇬" },
    { code: "+676", country: "Tonga", flag: "🇹🇴" },
    { code: "+1-868", country: "Trinidad & Tobago", flag: "🇹🇹" },
    { code: "+216", country: "Tunisia", flag: "🇹🇳" },
    { code: "+90", country: "Turkey", flag: "🇹🇷" },
    { code: "+993", country: "Turkmenistan", flag: "🇹🇲" },
    { code: "+688", country: "Tuvalu", flag: "🇹🇻" },
    { code: "+256", country: "Uganda", flag: "🇺🇬" },
    { code: "+380", country: "Ukraine", flag: "🇺🇦" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+598", country: "Uruguay", flag: "🇺🇾" },
    { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
    { code: "+678", country: "Vanuatu", flag: "🇻🇺" },
    { code: "+58", country: "Venezuela", flag: "🇻🇪" },
    { code: "+84", country: "Vietnam", flag: "🇻🇳" },
    { code: "+967", country: "Yemen", flag: "🇾🇪" },
    { code: "+260", country: "Zambia", flag: "🇿🇲" },
    { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
];

function CountrySelector({ selectedCode, onChange, className = "" }: { selectedCode: string, onChange: (code: string) => void, className?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selected = COUNTRY_CODES.find(c => selectedCode.startsWith(c.code)) || COUNTRY_CODES.find(c => c.code === "+977") || COUNTRY_CODES[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-full flex items-center justify-between gap-2 px-3 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:border-indigo-500 transition-all outline-none min-w-[90px]"
            >
                <div className="flex items-center gap-1.5">
                    <span className="text-base leading-none">{selected?.flag}</span>
                    <span className="text-[13px] font-bold dark:text-white">{selected?.code}</span>
                </div>
                <ChevronDown size={14} className={"text-slate-400 transition-transform shrink-0 " + (isOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute z-[100] left-0 mt-2 w-56 md:w-64 bg-white dark:bg-[#0c1d56] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="max-h-56 overflow-y-auto custom-scrollbar p-1">
                            {COUNTRY_CODES.map((c) => (
                                <button
                                    key={c.country + "-" + c.code}
                                    type="button"
                                    onClick={() => {
                                        onChange(c.code);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                                >
                                    <span className="text-base leading-none shrink-0">{c.flag}</span>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-[13px] font-bold text-[#0c1d56] dark:text-white">{c.code}</span>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[100px]">{c.country}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateName = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2;
};

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
                    <h2 className="text-2xl font-semibold text-black dark:text-white">Leads Store</h2>
                    <p className="text-black dark:text-slate-400">Manage and track your potential clients</p>
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
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0c1d56] dark:bg-indigo-600 text-white rounded-lg text-[15px] font-semibold hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-md hover:shadow-lg w-full sm:w-auto active:scale-95"
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
                                <th className="px-6 py-4 text-[14px] font-semibold text-black dark:text-slate-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-[14px] font-semibold text-black dark:text-slate-300 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-[14px] font-semibold text-black dark:text-slate-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[14px] font-semibold text-black dark:text-slate-300 uppercase tracking-wider">Email Address</th>
                                <th className="px-6 py-4 text-[14px] font-semibold text-black dark:text-slate-300 uppercase tracking-wider text-right">Actions</th>
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
                                                <div className="font-normal text-[16px] text-black dark:text-white">{lead.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-[15px] text-black dark:text-slate-300 font-normal">
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
                                            <div className="flex items-center gap-1.5 font-normal text-black text-[15px]">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                {lead.email || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-[13px] font-semibold">
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
                    <div className="font-semibold text-black">Showing {filteredLeads.length} leads</div>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 text-[13px] font-semibold transition-colors">Previous</button>
                        <button disabled className="px-3 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 text-[13px] font-semibold transition-colors">Next</button>
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
        if (lead && isOpen) {
            setFormData({
                name: lead.name,
                phone_number: lead.phone_number,
                email: lead.email || "",
                scheduled_call_time: lead.scheduled_call_time || "",
                call_status: lead.call_status,
                geographical_direction: lead.geographical_direction
            });
            setSubmitError(null);
        }
    }, [lead, isOpen]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleInputChange = (field: keyof NewLead, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value || null }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!lead) return;

        try {
            setSubmitError(null);

            if (!formData.name) {
                throw new Error("Name is required.");
            }

            if (!validateName(formData.name)) {
                throw new Error("Please enter both first and last name.");
            }

            if (formData.email && !validateEmail(formData.email)) {
                throw new Error("Please enter a valid email address.");
            }

            setIsSubmitting(true);

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
                                    <div className="flex gap-2">
                                        <CountrySelector
                                            selectedCode={formData.phone_number}
                                            onChange={(code) => {
                                                if (!formData.phone_number.startsWith(code)) {
                                                    const currentNumber = formData.phone_number.replace(/^\+\d+(- \d+)*\s*/, "");
                                                    setFormData(prev => ({ ...prev, phone_number: `${code} ${currentNumber}` }));
                                                }
                                            }}
                                        />
                                        <div className="relative flex-1 group/input">
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
            setSubmitError(null);

            if (!lead.name || !lead.phone_number) {
                throw new Error("Name and Phone Number are required.");
            }

            if (!validateName(lead.name)) {
                throw new Error("Please enter both first and last name.");
            }

            if (lead.email && !validateEmail(lead.email)) {
                throw new Error("Please enter a valid email address.");
            }

            setIsSubmitting(true);

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

                        {/* Modal Body */}
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
                                    <div className="flex gap-2">
                                        <CountrySelector
                                            selectedCode={lead.phone_number}
                                            onChange={(code) => {
                                                if (!lead.phone_number.startsWith(code)) {
                                                    const currentNumber = lead.phone_number.replace(/^\+\d+(- \d+)*\s*/, "");
                                                    setLead(prev => ({ ...prev, phone_number: `${code} ${currentNumber}` }));
                                                }
                                            }}
                                        />
                                        <div className="relative flex-1 group/input">
                                            <input
                                                type="tel"
                                                required
                                                placeholder="e.g. 9865..."
                                                value={lead.phone_number}
                                                onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                            />
                                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-indigo-500 transition-colors pointer-events-none" size={16} />
                                        </div>
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
