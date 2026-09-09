// import React, { useState, useEffect } from "react";
// import { getAnalytics } from "../services/analyticsService";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faArrowTrendUp, faClock, faTag, faFlag, faFire, faTrophy, faSpinner
// } from "@fortawesome/free-solid-svg-icons";
// export default function AnalyticsPage() {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         loadAnalytics();
//     }, []);

//     const loadAnalytics = async () => {
//         try {
//             setLoading(true);
//             const res = await getAnalytics();
//             setData(res.data);
//         } catch (err) {
//             setError("Failed to load analytics");
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center py-24">
//                 <FontAwesomeIcon icon={faSpinner} className="h-6 w-6 text-primary-500 animate-spin" />
//             </div>
//         );
//     }

//     if (error || !data) {
//         return (
//             <div className="text-center py-24 text-neutral-500">
//                 {error || "No data available"}
//             </div>
//         );
//     }

//     const completionEntries = Object.entries(data.taskCompletionTrend);
//     const maxCompletion = Math.max(...completionEntries.map(([, v]) => v), 1);

//     const focusEntries = Object.entries(data.focusTimeTrend);
//     const maxFocus = Math.max(...focusEntries.map(([, v]) => v), 1);

//     const categoryEntries = Object.entries(data.categoryBreakdown);
//     const totalCategoryTasks = categoryEntries.reduce((sum, [, v]) => sum + v, 0) || 1;

//     const priorityColors = {
//         HIGH: "bg-danger-500",
//         MEDIUM: "bg-warning-500",
//         LOW: "bg-success-500",
//         NONE: "bg-neutral-400",
//     };

//     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     const blocks = ["Night", "Morning", "Afternoon", "Evening"];
//     const heatmapMap = {};
//     data.productivityHeatmap.forEach((c) => {
//         heatmapMap[`${c.day}|${c.timeBlock}`] = c.minutes;
//     });
//     const maxHeat = Math.max(...data.productivityHeatmap.map((c) => c.minutes), 1);

//     return (
//         <div className="space-y-8">
//             <div>
//                 <h1 className=" text-3xl font-semibold text-neutral-900 dark:text-white mb-1">Analytics</h1>
//                 <p className="text-neutral-500 text-sm">Deep dive into your productivity patterns</p>
//             </div>

//             {/* Streak Cards */}
//             <div className="grid grid-cols-2 gap-4">
//                 <StatCard icon={faFire} label="Current Streak" value={`${data.currentStreak} days`} color="danger" />
//                 <StatCard icon={faTrophy} label="Longest Streak" value={`${data.longestStreak} days`} color="warning" />
//             </div>

//             {/* Task Completion Trend */}
//             <Panel icon={faArrowTrendUp} title="Task Completion (Last 30 Days)">
//                 <div className="flex items-end gap-1 h-32">
//                     {completionEntries.map(([date, count]) => (
//                         <div key={date} className="flex-1 flex flex-col items-center gap-1 group relative">
//                             <div className="w-full h-24 flex items-end">
//                                 <div
//                                     className="w-full rounded-t-sm bg-gradient-to-t from-primary-600 to-primary-400 transition-all"
//                                     style={{ height: `${count > 0 ? Math.max((count / maxCompletion) * 100, 8) : 3}%` }}
//                                 />
//                             </div>
//                             <div className="hidden group-hover:block absolute -top-6 text-[10px] bg-neutral-800 text-white px-1.5 py-0.5 rounded">
//                                 {count}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex justify-between mt-2 text-[10px] text-neutral-500">
//                     <span>{completionEntries[0]?.[0]}</span>
//                     <span>{completionEntries[completionEntries.length - 1]?.[0]}</span>
//                 </div>
//             </Panel>

//             <div className="grid lg:grid-cols-2 gap-6">
//                 {/* Focus Time Trend */}
//                 <Panel icon={faClock} title="Focus Time (Last 8 Weeks)">
//                     <div className="flex items-end justify-between gap-2 h-32">
//                         {focusEntries.map(([week, mins]) => (
//                             <div key={week} className="flex-1 flex flex-col items-center gap-2">
//                                 <div className="w-full h-24 flex items-end">
//                                     <div
//                                         className="w-full rounded-t-lg bg-gradient-to-t from-success-500 to-success-400"
//                                         style={{ height: `${mins > 0 ? Math.max((mins / maxFocus) * 100, 6) : 3}%` }}
//                                         title={`${mins} min`}
//                                     />
//                                 </div>
//                                 <span className="text-[10px] text-neutral-500">{week}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </Panel>

//                 {/* Category Breakdown */}
//                 <Panel icon={faTag} title="Category Breakdown">
//                     <div className="space-y-3">
//                         {categoryEntries.map(([cat, count]) => (
//                             <div key={cat}>
//                                 <div className="flex justify-between text-xs text-neutral-500 mb-1">
//                                     <span>{cat}</span>
//                                     <span>{count}</span>
//                                 </div>
//                                 <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
//                                     <div
//                                         className="h-full bg-gradient-to-r from-primary-600 to-secondary-400 rounded-full"
//                                         style={{ width: `${(count / totalCategoryTasks) * 100}%` }}
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </Panel>
//             </div>

//             <div className="grid lg:grid-cols-2 gap-6">
//                 {/* Priority Breakdown */}
//                 <Panel icon={faFlag} title="Priority Breakdown">
//                     <div className="flex gap-4">
//                         {Object.entries(data.priorityBreakdown).map(([priority, count]) => (
//                             <div key={priority} className="flex-1 text-center">
//                                 <div className={`h-2 rounded-full mb-2 ${priorityColors[priority] || "bg-neutral-400"}`} />
//                                 <p className="text-xl font-bold text-neutral-900 dark:text-white">{count}</p>
//                                 <p className="text-xs text-neutral-500">{priority}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </Panel>

//                 {/* Productivity Heatmap */}
//                 <Panel icon={faClock} title="Productivity Heatmap">
//                     <div className="grid grid-cols-8 gap-1 text-[10px] text-neutral-500">
//                         <div />
//                         {days.map((d) => (
//                             <div key={d} className="text-center">{d}</div>
//                         ))}
//                         {blocks.map((block) => (
//                             <React.Fragment key={block}>
//                                 <div className="flex items-center text-neutral-500">{block}</div>
//                                 {days.map((day) => {
//                                     const mins = heatmapMap[`${day}|${block}`] || 0;
//                                     const intensity = mins / maxHeat;
//                                     return (
//                                         <div
//                                             key={`${day}-${block}`}
//                                             className="aspect-square rounded-sm"
//                                             style={{
//                                                 backgroundColor: `rgba(156, 97, 54, ${0.1 + intensity * 0.8})`,
//                                             }}
//                                             title={`${day} ${block}: ${mins}m`}
//                                         />
//                                     );
//                                 })}
//                             </React.Fragment>
//                         ))}
//                     </div>
//                 </Panel>
//             </div>
//         </div>
//     );
// }

// function Panel({ icon, title, children }) {
//     return (
//         <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
//             <div className="flex items-center gap-2 mb-6">
//                 <FontAwesomeIcon icon={icon} className="h-4 w-4 text-primary-500 dark:text-primary-300" />
//                 <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h2>
//             </div>
//             {children}
//         </div>
//     );
// }

// function StatCard({ icon, label, value, color }) {
//     const colors = {
//         primary: "from-primary-500/20 to-primary-500/5 text-primary-400",
//         success: "from-success-500/20 to-success-500/5 text-success-400",
//         warning: "from-warning-500/20 to-warning-500/5 text-warning-400",
//         danger: "from-danger-500/20 to-danger-500/5 text-danger-400",
//     };
//     return (
//         <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
//             <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${colors[color]} mb-3`}>
//                 <FontAwesomeIcon icon={icon} className="h-4 w-4" />
//             </div>
//             <p className=" text-2xl font-semibold text-neutral-900 dark:text-white">{value}</p>
//             <p className="text-xs text-neutral-500 mt-1">{label}</p>
//         </div>
//     );
// }


import React, { useState, useEffect } from "react";
import { getAnalytics } from "../services/analyticsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowTrendUp, faClock, faTag, faFlag, faFire, faTrophy, faSpinner
} from "@fortawesome/free-solid-svg-icons";
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// Hex values matching tailwind.config.js — Recharts needs literal colors, not class names.
const COLORS = {
    primary600: "#7C4C2A",
    primary400: "#BE7F49",
    primary200: "#E5C29F",
    secondary500: "#B37D33",
    success500: "#6E8A54",
    warning500: "#C99A38",
    danger500: "#AD5A42",
    neutral400: "#A8927E",
    neutral300: "#CBB9A8",
};

const PRIORITY_COLORS = {
    HIGH: COLORS.danger500,
    MEDIUM: COLORS.warning500,
    LOW: COLORS.success500,
    NONE: COLORS.neutral400,
};

export default function AnalyticsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            const res = await getAnalytics();
            setData(res.data);
        } catch (err) {
            setError("Failed to load analytics");
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

    const completionData = Object.entries(data.taskCompletionTrend).map(([date, count]) => ({
        date,
        count,
    }));

    const focusData = Object.entries(data.focusTimeTrend).map(([week, minutes]) => ({
        week,
        minutes,
    }));

    const categoryData = Object.entries(data.categoryBreakdown)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);

    const priorityData = Object.entries(data.priorityBreakdown).map(([priority, count]) => ({
        priority,
        count,
    }));
    const totalPriorityTasks = priorityData.reduce((sum, p) => sum + p.count, 0) || 1;

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const blocks = ["Night", "Morning", "Afternoon", "Evening"];
    const heatmapMap = {};
    data.productivityHeatmap.forEach((c) => {
        heatmapMap[`${c.day}|${c.timeBlock}`] = c.minutes;
    });
    const maxHeat = Math.max(...data.productivityHeatmap.map((c) => c.minutes), 1);

    // Show at most ~6 x-axis labels across 30 days so they don't overlap.
    const completionTickInterval = Math.max(0, Math.floor(completionData.length / 6) - 1);

    return (
        <div className="space-y-8">
            <div>
                <h1 className=" text-3xl font-semibold text-neutral-900 dark:text-white mb-1">Analytics</h1>
                <p className="text-neutral-500 text-sm">Deep dive into your productivity patterns</p>
            </div>

            {/* Streak Cards */}
            <div className="grid grid-cols-2 gap-4">
                <StatCard icon={faFire} label="Current Streak" value={`${data.currentStreak} days`} color="danger" />
                <StatCard icon={faTrophy} label="Longest Streak" value={`${data.longestStreak} days`} color="warning" />
            </div>

            {/* Task Completion Trend */}
            <Panel icon={faArrowTrendUp} title="Task Completion (Last 30 Days)">
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={completionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="completionFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={COLORS.primary600} stopOpacity={0.35} />
                                <stop offset="100%" stopColor={COLORS.primary600} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.neutral300} vertical={false} opacity={0.4} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 10, fill: COLORS.neutral400 }}
                            axisLine={false}
                            tickLine={false}
                            interval={completionTickInterval}
                        />
                        <YAxis tick={{ fontSize: 10, fill: COLORS.neutral400 }} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip content={<ChartTooltip valueLabel="tasks" />} />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke={COLORS.primary600}
                            strokeWidth={2}
                            fill="url(#completionFill)"
                            activeDot={{ r: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Panel>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Focus Time Trend */}
                <Panel icon={faClock} title="Focus Time (Last 8 Weeks)">
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={focusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.neutral300} vertical={false} opacity={0.4} />
                            <XAxis dataKey="week" tick={{ fontSize: 10, fill: COLORS.neutral400 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: COLORS.neutral400 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<ChartTooltip valueLabel="min" />} cursor={{ fill: COLORS.success500, opacity: 0.08 }} />
                            <Bar dataKey="minutes" fill={COLORS.success500} radius={[6, 6, 0, 0]} maxBarSize={28} />
                        </BarChart>
                    </ResponsiveContainer>
                </Panel>

                {/* Category Breakdown */}
                <Panel icon={faTag} title="Category Breakdown">
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            data={categoryData}
                            layout="vertical"
                            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                        >
                            <XAxis type="number" hide allowDecimals={false} />
                            <YAxis
                                type="category"
                                dataKey="category"
                                tick={{ fontSize: 11, fill: COLORS.neutral400 }}
                                axisLine={false}
                                tickLine={false}
                                width={90}
                            />
                            <Tooltip content={<ChartTooltip valueLabel="tasks" />} cursor={{ fill: COLORS.primary600, opacity: 0.06 }} />
                            <Bar dataKey="count" fill={COLORS.primary600} radius={[0, 6, 6, 0]} maxBarSize={16} />
                        </BarChart>
                    </ResponsiveContainer>
                </Panel>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Priority Breakdown */}
                <Panel icon={faFlag} title="Priority Breakdown">
                    <div className="flex items-center gap-6">
                        <ResponsiveContainer width={140} height={140}>
                            <PieChart>
                                <Pie
                                    data={priorityData}
                                    dataKey="count"
                                    nameKey="priority"
                                    innerRadius={40}
                                    outerRadius={65}
                                    paddingAngle={2}
                                    stroke="none"
                                >
                                    {priorityData.map((entry) => (
                                        <Cell key={entry.priority} fill={PRIORITY_COLORS[entry.priority] || COLORS.neutral400} />
                                    ))}
                                </Pie>
                                <Tooltip content={<ChartTooltip nameKey="priority" valueLabel="tasks" />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex-1 space-y-2.5">
                            {priorityData.map((p) => (
                                <div key={p.priority} className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                        <span
                                            className="h-2.5 w-2.5 rounded-full"
                                            style={{ backgroundColor: PRIORITY_COLORS[p.priority] || COLORS.neutral400 }}
                                        />
                                        {p.priority}
                                    </span>
                                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                                        {p.count}{" "}
                                        <span className="text-xs font-normal text-neutral-400">
                                            ({Math.round((p.count / totalPriorityTasks) * 100)}%)
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Panel>

                {/* Productivity Heatmap */}
                <Panel icon={faClock} title="Productivity Heatmap">
                    <div className="grid grid-cols-8 gap-1 text-[10px] text-neutral-500">
                        <div />
                        {days.map((d) => (
                            <div key={d} className="text-center">{d}</div>
                        ))}
                        {blocks.map((block) => (
                            <React.Fragment key={block}>
                                <div className="flex items-center text-neutral-500">{block}</div>
                                {days.map((day) => {
                                    const mins = heatmapMap[`${day}|${block}`] || 0;
                                    const intensity = mins / maxHeat;
                                    return (
                                        <div
                                            key={`${day}-${block}`}
                                            className="aspect-square rounded-sm"
                                            style={{
                                                backgroundColor: `rgba(124, 76, 42, ${0.08 + intensity * 0.75})`,
                                            }}
                                            title={`${day} ${block}: ${mins}m`}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </Panel>
            </div>
        </div>
    );
}

function ChartTooltip({ active, payload, label, valueLabel, nameKey }) {
    if (!active || !payload || !payload.length) return null;
    const entry = payload[0];
    const displayLabel = nameKey ? entry.payload[nameKey] : label;

    return (
        <div className="rounded-xl bg-neutral-900/95 px-3 py-2 text-xs text-white shadow-lg dark:bg-neutral-800">
            <p className="font-medium">{displayLabel}</p>
            <p className="text-neutral-300">
                {entry.value} {valueLabel}
            </p>
        </div>
    );
}

function Panel({ icon, title, children }) {
    return (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
            <div className="flex items-center gap-2 mb-6">
                <FontAwesomeIcon icon={icon} className="h-4 w-4 text-primary-500 dark:text-primary-300" />
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function StatCard({ icon, label, value, color }) {
    const colors = {
        primary: "from-primary-500/20 to-primary-500/5 text-primary-400",
        success: "from-success-500/20 to-success-500/5 text-success-400",
        warning: "from-warning-500/20 to-warning-500/5 text-warning-400",
        danger: "from-danger-500/20 to-danger-500/5 text-danger-400",
    };
    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-warm dark:bg-neutral-900/60 dark:border-neutral-800">
            <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${colors[color]} mb-3`}>
                <FontAwesomeIcon icon={icon} className="h-4 w-4" />
            </div>
            <p className=" text-2xl font-semibold text-neutral-900 dark:text-white">{value}</p>
            <p className="text-xs text-neutral-500 mt-1">{label}</p>
        </div>
    );
}