import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function ThemeToggle({ mode, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:bg-neutral-100 hover:text-primary-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-primary-400"
    >
      <FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} className="h-4 w-4" />
      {mode === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;