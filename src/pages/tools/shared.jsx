export function Field({ label, children }) {
    return (
        <div className="mb-4">
            <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">{label}</label>
            {children}
        </div>
    );
}

export const inputClass =
    "w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 " +
    "placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-colors " +
    "dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-white dark:placeholder:text-neutral-600 dark:focus:ring-0";

export const selectClass = inputClass + " appearance-none";
export const resultBox = "mt-5 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20";
export const btnClass = "px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-500 transition-colors";