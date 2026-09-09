export default function TaskSelector({ tasks, selectedTaskId, onSelect, disabled }) {
    return (
        <div className="w-full">
            <label className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                Select Task
            </label>
            <select
                value={selectedTaskId || ""}
                onChange={(e) => onSelect(e.target.value)}
                disabled={disabled}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2.5
                           bg-white text-neutral-800 text-sm
                           dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-100
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                           disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                <option value="" disabled>
                    -- Choose a task --
                </option>
                {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                        {task.title}
                    </option>
                ))}
            </select>
        </div>
    );
}