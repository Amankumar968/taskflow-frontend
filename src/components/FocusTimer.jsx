import { useState, useEffect, useCallback, useRef } from "react";
import { getTasks } from "../services/api";
import {
    startFocusSession,
    completeFocusSession,
    cancelFocusSession,
    deleteFocusSession,
    getTodaySessions
} from "../services/focusSessionService";
import { useTimer } from "../hooks/useTimer";
import TimerCircle from "../components/TimerCircle";
import TaskSelector from "../components/TaskSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faXmark,
    faCircleCheck,
    faCircleXmark,
    faClock,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const DURATION_OPTIONS = [15, 25, 30, 45, 60];

export default function FocusTimer() {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState("");
    const [duration, setDuration] = useState(25);
    const [session, setSession] = useState(null);
    const [todaySessions, setTodaySessions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Prevents the recovery effect from re-running if this component
    // re-renders for unrelated reasons.
    const hasRecoveredRef = useRef(false);

    const handleAutoComplete = useCallback(async () => {
        if (!session) return;
        try {
            await completeFocusSession(session.id);
            setSession(null);
            loadTodaySessions();
            playCompletionSound();
            showNotification("Focus session complete!");
        } catch {
            setError("Failed to mark session as completed");
        }
    }, [session]);

    const timer = useTimer(duration, handleAutoComplete);

    useEffect(() => {
        loadTasks();
        recoverActiveSession();
    }, []);

    const loadTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch {
            setError("Failed to load tasks");
        }
    };

    const loadTodaySessions = async () => {
        try {
            const res = await getTodaySessions();
            setTodaySessions(res.data);
            return res.data;
        } catch {
            return [];
        }
    };

    // On mount (covers page reload, tab-discard-then-reload, browser
    // crash recovery, etc.), check whether the user already has an
    // in-progress session on the backend and pick the timer back up
    // from the correct remaining time instead of starting fresh.
    const recoverActiveSession = async () => {
        if (hasRecoveredRef.current) return;
        hasRecoveredRef.current = true;

        try {
            const res = await getTodaySessions();
            const sessions = res.data;
            setTodaySessions(sessions);

            const runningSessions = sessions.filter((s) => s.status === "RUNNING");
            if (runningSessions.length === 0) return;

            // Keep only the most recently started RUNNING session; auto-cancel
            // any older orphaned ones so the list doesn't keep accumulating.
            const sorted = [...runningSessions].sort(
                (a, b) => new Date(b.startedAt) - new Date(a.startedAt)
            );
            const [active, ...orphans] = sorted;

            for (const orphan of orphans) {
                try {
                    await cancelFocusSession(orphan.id);
                } catch {
                    // ignore individual cleanup failures
                }
            }

            const startedAtMs = new Date(active.startedAt).getTime();
            const totalSeconds = active.duration * 60;
            const elapsedSeconds = Math.floor((Date.now() - startedAtMs) / 1000);
            const remainingSeconds = totalSeconds - elapsedSeconds;

            if (remainingSeconds <= 0) {
                // Time already ran out while we were away — mark it complete.
                await completeFocusSession(active.id);
                loadTodaySessions();
                return;
            }

            setSession(active);
            setSelectedTaskId(String(active.taskId));
            setDuration(active.duration);
            timer.recoverTo(remainingSeconds);

            if (orphans.length > 0) {
                loadTodaySessions();
            }
        } catch {
            // silent — recovery is best-effort, not a hard requirement to load the page
        }
    };

    const handleStart = async () => {
        if (!selectedTaskId) {
            setError("Please select a task first");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await startFocusSession(Number(selectedTaskId), duration);
            setSession(res.data);
            timer.reset();
            timer.start();
            requestNotificationPermission();
            loadTodaySessions();
        } catch (err) {
            setError(err.response?.data || "Failed to start session");
        } finally {
            setLoading(false);
        }
    };

    const handlePauseResume = () => {
        timer.isRunning ? timer.pause() : timer.start();
    };

    const handleCancel = async () => {
        if (!session) return;
        setLoading(true);
        try {
            await cancelFocusSession(session.id);
            setSession(null);
            timer.reset();
            loadTodaySessions();
        } catch {
            setError("Failed to cancel session");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (sessionId) => {
        try {
            await deleteFocusSession(sessionId);
            setTodaySessions((prev) => prev.filter((s) => s.id !== sessionId));
        } catch (err) {
            setError("Failed to delete session");
        }
    };

    // Load a session from the "Today's Sessions" list into the main timer.
    // Only makes sense for RUNNING sessions — completed/cancelled ones have
    // no remaining time to show.
    const handleSelectSession = (clickedSession) => {
        if (clickedSession.status !== "RUNNING") return;
        if (session && session.id === clickedSession.id) return; // already showing it

        const remaining = computeRemaining(clickedSession.startedAt, clickedSession.duration);

        if (remaining <= 0) {
            completeFocusSession(clickedSession.id).then(loadTodaySessions).catch(() => {});
            return;
        }

        setSession(clickedSession);
        setSelectedTaskId(String(clickedSession.taskId));
        setDuration(clickedSession.duration);
        timer.recoverTo(remaining);
    };

    const isSessionActive = session !== null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-neutral-100/60 to-neutral-50
                         dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950
                         flex flex-col items-center pt-16 pb-20 px-4">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-300 text-xs font-semibold tracking-wide mb-4">
                    <FontAwesomeIcon icon={faClock} className="h-3.5 w-3.5" />
                    Deep Work Mode
                </div>
                <h1 className=" text-4xl font-semibold text-neutral-900 dark:text-white mb-2">
                    Focus Timer
                </h1>
                <p className="text-neutral-500">Stay focused, one session at a time</p>
            </div>

            {error && (
                <div className="mb-6 px-4 py-2.5 bg-danger-500/10 border border-danger-500/20 text-danger-500 rounded-xl text-sm max-w-md text-center">
                    {error}
                </div>
            )}

            {/* Timer Card */}
            <div className="bg-white border border-neutral-200 rounded-3xl px-10 py-12 shadow-warm-lg
                             dark:bg-neutral-900/60 dark:border-neutral-800
                             flex flex-col items-center w-full max-w-lg">
                <TimerCircle
                    minutes={timer.minutes}
                    seconds={timer.seconds}
                    progress={timer.progress}
                    isRunning={timer.isRunning}
                />

                {isSessionActive && session.taskTitle && (
                    <p className="mt-5 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Focusing on{" "}
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                            {session.taskTitle}
                        </span>
                    </p>
                )}

                <div className="mt-10 flex flex-col items-center gap-5 w-full">
                    <div className="w-full max-w-xs">
                        <TaskSelector
                            tasks={tasks}
                            selectedTaskId={selectedTaskId}
                            onSelect={setSelectedTaskId}
                            disabled={isSessionActive}
                        />
                    </div>

                    {!isSessionActive && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {DURATION_OPTIONS.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDuration(d)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                        duration === d
                                            ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105"
                                            : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                                    }`}
                                >
                                    {d} min
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-3 mt-3">
                        {!isSessionActive ? (
                            <button
                                onClick={handleStart}
                                disabled={loading}
                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700
                                           hover:from-primary-500 hover:to-primary-600 text-white rounded-2xl font-semibold
                                           shadow-lg shadow-primary-600/30 disabled:opacity-50 transition-all duration-200
                                           hover:-translate-y-0.5"
                            >
                                <FontAwesomeIcon icon={faPlay} className="h-4 w-4" />
                                {loading ? "Starting..." : "Start Session"}
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handlePauseResume}
                                    className="flex items-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-neutral-200
                                               dark:bg-neutral-800 dark:hover:bg-neutral-700
                                               text-neutral-700 dark:text-neutral-100 rounded-2xl font-semibold transition-all duration-200
                                               hover:-translate-y-0.5"
                                >
                                    {timer.isRunning ? (
                                        <>
                                            <FontAwesomeIcon icon={faPause} className="h-4 w-4" /> Pause
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faPlay} className="h-4 w-4" /> Resume
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 bg-danger-500/10 hover:bg-danger-500/20
                                               text-danger-500 rounded-2xl font-semibold disabled:opacity-50
                                               transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Today's Sessions */}
            <div className="mt-12 w-full max-w-lg">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
                    Today's Sessions
                    <span className="text-xs font-normal text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                        {todaySessions.length}
                    </span>
                </h2>

                {todaySessions.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-10 text-neutral-500 text-sm bg-white dark:bg-neutral-900/40 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
                        <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-neutral-300 dark:text-neutral-700" />
                        No sessions yet today. Start one above.
                    </div>
                ) : (
                    <ul className="space-y-2.5">
                        {todaySessions.map((s) => (
                            <li
                                key={s.id}
                                onClick={() => handleSelectSession(s)}
                                className={`flex justify-between items-center px-5 py-3.5 bg-white
                                           border border-neutral-200 rounded-2xl hover:border-primary-300
                                           dark:bg-neutral-900/60 dark:border-neutral-800 dark:hover:border-neutral-700
                                           transition-colors group ${s.status === "RUNNING" ? "cursor-pointer" : ""}`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                        {s.taskTitle || "No task"}
                                    </span>
                                    <span className="text-xs text-neutral-500 mt-0.5">
                                        {s.status === "RUNNING" ? (
                                            session && session.id === s.id ? (
                                                <>
                                                    {s.duration} min ·{" "}
                                                    <span className={timer.isRunning ? "font-medium text-warning-600 dark:text-warning-400" : "font-medium text-neutral-500"}>
                                                        {timer.minutes}:{String(timer.seconds).padStart(2, "0")}{" "}
                                                        {timer.isRunning ? "left" : "(paused)"}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    {s.duration} min · <LiveRemaining startedAt={s.startedAt} duration={s.duration} />
                                                </>
                                            )
                                        ) : s.status === "CANCELLED" ? (
                                            <>
                                                {s.duration} min · cancelled after {formatElapsed(s.startedAt, s.cancelledAt)}
                                            </>
                                        ) : (
                                            <>
                                                {s.duration} minutes · {formatTime(s.startedAt)}
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <StatusBadge
                                        status={
                                            session && session.id === s.id && s.status === "RUNNING" && !timer.isRunning
                                                ? "PAUSED"
                                                : s.status
                                        }
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(s.id);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-danger-500
                                                   transition-all duration-200 p-1.5 rounded-lg hover:bg-danger-500/10"
                                        title="Delete session"
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} className="h-4 w-4" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const config = {
        RUNNING: {
            className: "bg-warning-500/10 text-warning-500",
            icon: faClock,
        },
        PAUSED: {
            className: "bg-neutral-200 text-neutral-600 dark:bg-neutral-700/60 dark:text-neutral-300",
            icon: faPause,
        },
        COMPLETED: {
            className: "bg-success-500/10 text-success-500",
            icon: faCircleCheck,
        },
        CANCELLED: {
            className: "bg-neutral-200 text-neutral-500 dark:bg-neutral-700/50 dark:text-neutral-400",
            icon: faCircleXmark,
        }
    };

    const { className, icon } = config[status] || config.CANCELLED;

    return (
        <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${className}`}>
            {status === "RUNNING" && (
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warning-500" />
                </span>
            )}
            <FontAwesomeIcon icon={icon} className="h-3 w-3" />
            {status}
        </span>
    );
}

function LiveRemaining({ startedAt, duration }) {
    const [remaining, setRemaining] = useState(() => computeRemaining(startedAt, duration));

    useEffect(() => {
        const id = setInterval(() => {
            setRemaining(computeRemaining(startedAt, duration));
        }, 1000);
        return () => clearInterval(id);
    }, [startedAt, duration]);

    if (remaining <= 0) return <span>time's up</span>;

    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return (
        <span className="font-medium text-warning-600 dark:text-warning-400">
            {mins}:{String(secs).padStart(2, "0")} left
        </span>
    );
}

function computeRemaining(startedAt, duration) {
    const startedAtMs = new Date(startedAt).getTime();
    const totalSeconds = duration * 60;
    const elapsed = Math.floor((Date.now() - startedAtMs) / 1000);
    return Math.max(0, totalSeconds - elapsed);
}

function formatElapsed(startedAt, endedAt) {
    if (!startedAt || !endedAt) return "";
    const startMs = new Date(startedAt).getTime();
    const endMs = new Date(endedAt).getTime();
    const totalSeconds = Math.max(0, Math.round((endMs - startMs) / 1000));
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
}

function formatTime(isoString) {
    if (!isoString) return "";
    try {
        return new Date(isoString).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch {
        return "";
    }
}

// ---- Helpers ----
function requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }
}

function showNotification(message) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(message);
    }
}

function playCompletionSound() {
    const audio = new Audio(
        "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ=="
    );
    audio.play().catch(() => {});
}