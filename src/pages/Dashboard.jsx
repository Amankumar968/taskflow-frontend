import { useState, useEffect } from "react";
import { getDashboard } from "../services/focusSessionService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock, faCircleCheck, faListCheck, faFire,
    faCheck, faXmark, faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const res = await getDashboard();
            setData(res.data);
        } catch (err) {
            setError("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <FontAwesomeIcon icon={faSpinner} className="h-6 w-6 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="text-center py-24 text-neutral-500">
                {error || "No data available"}
            </div>
        );
    }

    const totalTasks = data.pendingTasks + data.completedTasks;
    const completionPercent = totalTasks > 0
        ? Math.round((data.completedTasks / totalTasks) * 100)
        : 0;

    const maxWeekly = Math.max(...Object.values(data.weeklyFocusMinutes), 1);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className=" text-3xl font-semibold text-neutral-900 dark:text-white mb-1">
                    Dashboard
                </h1>
                <p className="text-neutral-500 text-sm">Your productivity at a glance</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={faClock}
                    label="Focus Time Today"
                    value={`${data.totalFocusMinutesToday}m`}
                    color="primary"
                />
                <StatCard
                    icon={faCircleCheck}
                    label="Sessions Today"
                    value={data.completedSessionsToday}
                    color="success"
                />
                <StatCard
                    icon={faListCheck}
                    label="Pending Tasks"
                    value={data.pendingTasks}
                    color="warning"
                />
                <StatCard
                    icon={faFire}
                    label="Completed Tasks"
                    value={data.completedTasks}
                    color="danger"
                />
            </div>

            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
                {/* Weekly Chart */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-warm
                                 dark:bg-neutral-900/60 dark:border-neutral-800">
                    <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
                        This Week's Focus
                    </h2>
                    <div className="flex items-end justify-between gap-3 h-40">
                        {Object.entries(data.weeklyFocusMinutes).map(([day, minutes]) => {
                            const heightPercent = (minutes / maxWeekly) * 100;
                            const isToday = day === new Date().toLocaleDateString("en-US", { weekday: "short" });
                            return (
                                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full h-32 flex items-end">
                                        <div
                                            className={`w-full rounded-t-lg transition-all duration-500 ${
                                                isToday
                                                    ? "bg-gradient-to-t from-primary-600 to-primary-400"
                                                    : "bg-neutral-200 dark:bg-neutral-700"
                                            }`}
                                            style={{ height: `${minutes > 0 ? Math.max(heightPercent, 6) : 3}%` }}
                                            title={`${minutes} min`}
                                        />
                                    </div>
                                    <span className={`text-xs font-medium ${isToday ? "text-primary-600 dark:text-primary-300" : "text-neutral-400 dark:text-neutral-500"}`}>
                                        {day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Task Progress */}
                <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-warm
                                 dark:bg-neutral-900/60 dark:border-neutral-800">
                    <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
                        Task Progress
                    </h2>
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative w-32 h-32">
                            <svg className="transform -rotate-90 w-32 h-32">
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10"
                                    fill="transparent" className="text-neutral-200 dark:text-neutral-800" />
                                <circle
                                    cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 56}
                                    strokeDashoffset={2 * Math.PI * 56 * (1 - completionPercent / 100)}
                                    strokeLinecap="round"
                                    className="text-success-500 transition-all duration-700"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className=" text-2xl font-semibold text-neutral-900 dark:text-white">
                                    {completionPercent}%
                                </span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-neutral-500">
                            {data.completedTasks} of {totalTasks} tasks completed
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-warm
                             dark:bg-neutral-900/60 dark:border-neutral-800">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                    Recent Sessions
                </h2>
                {data.recentSessions.length === 0 ? (
                    <div className="text-center py-8 text-neutral-400 text-sm">
                        No sessions yet. Start your first focus session!
                    </div>
                ) : (
                    <ul className="space-y-2.5">
                        {data.recentSessions.map((s) => (
                            <li
                                key={s.id}
                                className="flex justify-between items-center px-4 py-3 bg-neutral-50
                                           rounded-2xl border border-neutral-200
                                           dark:bg-neutral-800/40 dark:border-neutral-800"
                            >
                                <div>
                                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                        {s.taskTitle || "No task"}
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                        {s.duration} minutes
                                    </p>
                                </div>
                                <SessionStatusBadge status={s.status} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }) {
    const colors = {
    primary: "from-primary-500/20 to-primary-500/5 text-primary-400",
    success: "from-success-500/20 to-success-500/5 text-success-400",
    warning: "from-warning-500/20 to-warning-500/5 text-warning-400",
    danger:  "from-danger-500/20 to-danger-500/5 text-danger-400",
};


    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-warm
                         dark:bg-neutral-900/60 dark:border-neutral-800">
            <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${colors[color]} mb-3`}>
                <FontAwesomeIcon icon={icon} className="h-4 w-4" />
            </div>
            <p className=" text-2xl font-semibold text-neutral-900 dark:text-white">{value}</p>
            <p className="text-xs text-neutral-500 mt-1">{label}</p>
        </div>
    );
}

function SessionStatusBadge({ status }) {
    const config = {
        RUNNING: { className: "bg-warning-500/10 text-warning-500", icon: faSpinner },
        COMPLETED: { className: "bg-success-500/10 text-success-500", icon: faCheck },
        CANCELLED: { className: "bg-neutral-200 text-neutral-500 dark:bg-neutral-700/50 dark:text-neutral-400", icon: faXmark },
    };
    const { className, icon } = config[status] || config.CANCELLED;

    return (
        <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${className}`}>
            <FontAwesomeIcon icon={icon} className="h-3 w-3" />
            {status}
        </span>
    );
}