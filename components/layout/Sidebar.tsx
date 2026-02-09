"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isMobileOpen: boolean;
    closeMobile: () => void;
}

export const Sidebar = ({ isMobileOpen, closeMobile }: SidebarProps) => {
    const pathname = usePathname();

    const SidebarContent = () => (
        <div className="h-full flex flex-col bg-white dark:bg-[#0a1738] border-r border-slate-200 dark:border-white/5 transition-colors duration-300">
            {/* Logo Area */}
            <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-white/5">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#0c1d56] dark:bg-white rounded-xl flex items-center justify-center transition-colors shadow-sm">
                        <Phone className="w-5 h-5 text-white dark:text-[#0c1d56]" />
                    </div>
                    <span className="text-lg font-bold text-[#0c1d56] dark:text-white tracking-tight">CallAgent API</span>
                </Link>
            </div>

            {/* Navigation Items */}
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                <div className="mb-2 px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Main Menu
                </div>

                <NavItem
                    icon={<LayoutDashboard size={20} />}
                    label="Overview"
                    href="/dashboard"
                    active={pathname === '/dashboard'}
                    onClick={closeMobile}
                />

                <NavItem
                    icon={<Users size={20} />}
                    label="Leads Store"
                    href="/leads"
                    active={pathname.startsWith('/leads')}
                    onClick={closeMobile}
                />
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 fixed inset-y-0 z-30 shadow-lg shadow-slate-200/50 dark:shadow-none">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMobile}
                            className="fixed inset-0 bg-[#0c1d56]/20 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                            className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

interface NavItemProps {
    icon: any;
    label: string;
    href: string;
    active?: boolean;
    badge?: string;
    onClick: () => void;
}

function NavItem({ icon, label, href, active = false, badge, onClick }: NavItemProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium group relative overflow-hidden ${active
                ? 'bg-[#0c1d56] text-white shadow-md shadow-[#0c1d56]/20 dark:bg-white dark:text-[#0c1d56]'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#0c1d56] dark:hover:text-white'
                }`}>
            {/* Active Indicator Line (Left) */}
            {active && (
                <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-white/30 dark:bg-[#0c1d56]/30 rounded-r-full"
                />
            )}

            <div className="flex items-center gap-3.5">
                <span className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {icon}
                </span>
                <span>{label}</span>
            </div>

            {badge && (
                <span className="bg-slate-200 dark:bg-white/20 text-slate-600 dark:text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>
            )}
        </Link>
    );
}
