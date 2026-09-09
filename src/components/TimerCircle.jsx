export default function TimerCircle({ minutes, seconds, progress, isRunning }) {
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (
        <div className="relative flex items-center justify-center w-72 h-72">
            {/* Glow effect behind the ring */}
            <div
                className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-700 ${
                    isRunning ? "opacity-30 bg-primary-500" : "opacity-0"
                }`}
            />

            <svg className="transform -rotate-90 w-72 h-72 relative z-10">
                <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4A171" />
                        <stop offset="100%" stopColor="#7C4C2A" />
                    </linearGradient>
                </defs>

                {/* Background track */}
                <circle
                    cx="144"
                    cy="144"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    className="text-neutral-200 dark:text-neutral-800"
                />

                {/* Progress ring */}
                <circle
                    cx="144"
                    cy="144"
                    r={radius}
                    stroke="url(#ringGradient)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_rgba(156,97,54,0.5)]"
                />
            </svg>

            <div className="absolute flex flex-col items-center z-20">
                <span className=" text-6xl font-semibold text-neutral-900 dark:text-white tabular-nums tracking-tight">
                    {display}
                </span>
                <span
                    className={`mt-2 text-sm font-medium tracking-wide px-3 py-1 rounded-full ${
                        isRunning
                            ? "text-primary-600 bg-primary-500/10 dark:text-primary-300"
                            : "text-neutral-500 bg-neutral-200/60 dark:text-neutral-400 dark:bg-neutral-700/40"
                    }`}
                >
                    {isRunning ? "Focusing" : "Paused"}
                </span>
            </div>
        </div>
    );
}