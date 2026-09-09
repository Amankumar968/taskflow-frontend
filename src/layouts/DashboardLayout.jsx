import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
    const [mode, setMode] = useState(() => localStorage.getItem("theme") || "light");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", mode === "dark");
        localStorage.setItem("theme", mode);
    }, [mode]);

    const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar
                    mode={mode}
                    onToggle={toggleTheme}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="flex-1 overflow-y-auto bg-gradient-to-b from-neutral-50 via-neutral-100/40 to-neutral-50
                                  dark:from-neutral-950 dark:via-neutral-900/50 dark:to-neutral-950">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>

            <Chatbot />
        </div>
    );
}