"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Determine active view based on path
    const getActiveView = () => {
        if (pathname === "/dashboard") return "overview";
        if (pathname.startsWith("/leads")) return "leads";
        if (pathname.startsWith("/logs")) return "logs";
        if (pathname.startsWith("/analytics")) return "analytics";
        if (pathname.startsWith("/settings")) return "settings";
        return "overview";
    };

    const activeView = getActiveView();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0c1d56] font-sans text-[#0c1d56] dark:text-white flex transition-colors duration-300">
            {/* Sidebar */}
            <Sidebar
                isMobileOpen={isSidebarOpen}
                closeMobile={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen flex flex-col relative z-0">
                {/* Header */}
                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                    activeView={activeView}
                />

                {/* Content Area */}
                <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
