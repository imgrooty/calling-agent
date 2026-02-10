const fs = require('fs');
const path = require('path');

const filePath = 'd:/fagoon_ai/calling-agent/components/leads/LeadsView.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Refine CountrySelector component
const countrySelectorOld = `function CountrySelector({ selectedCode, onChange, className = "" }: { selectedCode: string, onChange: (code: string) => void, className?: string }) {
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
                className="w-full h-full flex items-center justify-between gap-2 px-3 py-3 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:border-indigo-500 transition-all outline-none min-w-[100px]"
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{selected?.flag}</span>
                    <span className="text-sm font-semibold dark:text-white">{selected?.code}</span>
                </div>
                <ChevronDown size={14} className={"text-slate-400 transition-transform " + (isOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute z-[100] left-0 mt-2 w-64 bg-white dark:bg-[#0c1d56] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                            {COUNTRY_CODES.map((c) => (
                                <button
                                    key={c.country + "-" + c.code}
                                    type="button"
                                    onClick={() => {
                                        onChange(c.code);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                                >
                                    <span className="text-lg leading-none shrink-0">{c.flag}</span>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-[#0c1d56] dark:text-white">{c.code}</span>
                                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[140px]">{c.country}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}`;

const countrySelectorNew = `function CountrySelector({ selectedCode, onChange, className = "" }: { selectedCode: string, onChange: (code: string) => void, className?: string }) {
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
}`;

if (content.includes(countrySelectorOld)) {
    content = content.replace(countrySelectorOld, countrySelectorNew);
} else {
    console.log("CountrySelectorOld not found exactly, skipping component refinement in this step.");
}

// Reconstruct EditLeadModal
const editModalRegex = /function EditLeadModal\({ isOpen, lead, onClose, onSuccess \}: \{[\s\S]*?AnimatePresence >[\s\S]*?\);[\s\S]*?\}/;
const newEditModal = `function EditLeadModal({ isOpen, lead, onClose, onSuccess }: {
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

            const response = await fetch(\`/api/leads/\${lead.id}\`, {
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
                                                    const currentNumber = formData.phone_number.replace(/^\\+\\d+(- \\d+)*\\s*/, "");
                                                    setFormData(prev => ({ ...prev, phone_number: \`\${code} \${currentNumber}\` }));
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
}`;

content = content.replace(editModalRegex, newEditModal);

// Reconstruct CreateLeadModal
const createModalRegex = /function CreateLeadModal\({ isOpen, onClose, onSuccess \}: \{[\s\S]*?AnimatePresence >[\s\S]*?\);[\s\S]*?\}/;
const newCreateModal = `function CreateLeadModal({ isOpen, onClose, onSuccess }: {
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
                                                    const currentNumber = lead.phone_number.replace(/^\\+\\d+(- \\d+)*\\s*/, "");
                                                    setLead(prev => ({ ...prev, phone_number: \`\${code} \${currentNumber}\` }));
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
}`;

content = content.replace(createModalRegex, newCreateModal);

fs.writeFileSync(filePath, content);
console.log("Successfully restored modals in LeadsView.tsx");
